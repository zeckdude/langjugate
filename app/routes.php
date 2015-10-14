<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/




//Creates Global Variable
View::share('tenses_list', Config::get('globals.tenses'));




Route::get('/', function()
{
	return View::make('home');
});

Route::resource('words', 'WordController');



Route::post('quiz/processQuizForm', function()
{
	Session::flush();

	$data = Input::all();
	//return $data;
	//return $data['present_tense_words'];
	//return $data['preterite_tense_words'];

	//var_dump($data['conjugation_words']);

	if(isset($data['step_1_completed'])) {
		foreach ($data['conjugation_words'] as $conjugation_word) {
			Session::push('conjugation_words', $conjugation_word);
		}

		return Redirect::to('quiz/step2');
		//return Session::get('conjugation_words');
	}

	if(isset($data['step_2_completed'])) {
		//return $tenses_master_array['tense_names'];

		foreach ($tenses_master_array['tense_names'] as $tense_choice['name']) {
			$tenses_master_array[$tense_choice['name'].'_words'] = $data[$tense_choice['name'].'_tense_words'];
		}

		return $tenses_master_array;

		return Redirect::to('quiz/step3');
		//return Session::get('conjugation_words');
	}
});

//Route::get('quiz/test', function()
//{
//    return View::make('quiz.test');
//});




Route::get('quiz/ajaxProcessForm', function()
{

});


Route::get('quiz/test', 'QuizController@test');
Route::resource('quiz', 'QuizController');








Route::get('term/edit/{spanish_word}', function($spanish_word)
{
	$spanish_word = SpanishWord::where('word', '=', $spanish_word)->firstOrFail();
	$related_english_words = EnglishWordSpanishWord::where('spanish_word_id', '=', $spanish_word->id)->get();

	return View::make('term.edit', ['spanish_word' => $spanish_word, 'related_english_words' => $related_english_words]);
});


Route::get('term/create', function()
{
	//$spanish_words  = SpanishWord::all();
	//return View::make('term.create')->with('spanish_words', $spanish_words);
	return View::make('term.create');
});

Route::post('term/create', function()
{
    //Process the POST data from the ajax request on the form
    //return Input::get('word');
	//return Input::all();

	//return Input::get('translation_panels_data');

//	foreach(Input::get('translation_panels_data') as $translation_iteration => $translation_data){
//		//echo $translation_data['english_word'];
//
//		//Convert comma separated string to array, after removing a trailing comma in case it is added
//		$english_words = explode(",",rtrim($translation_data['english_word'],','));
//		//var_dump($english_words);
//
//		foreach ($english_words as $english_word_value) {
//			echo $english_word_value;
//		}
//
//
//		//var_dump($translation_data);
//	}
//

	//return Input::get('form_inputs')['spanish_word'];

	//$tense_choice['name'] = 'present';
	//return Input::get('form_inputs')[$tense_choice['name'].'_tense_english_i'];

	//Input::get('translation_panels_data')['word_type']

	//return Input::get($tense_choice['name'] . '_tense_english_i');

	//return 'stop';

	//Begin the transaction
	DB::beginTransaction();

    $json_response = array();

    $spanish_word_input = Input::get('form_inputs')['spanish_word'];
    //$english_word_input = Input::get('english_word');
    //$word_type = Input::get('word_type');
	$operation = Input::get('operation');

	try {
		//Check to see if the Spanish word is already in the database
		$spanish_word_exists = SpanishWord::where('word', '=', $spanish_word_input)->first();
		if($spanish_word_exists) {
			//return 'The existing id is ' . $spanish_word_exists->id;
			$spanish_word_id = $spanish_word_exists->id;
		} else {
			//If the spanish word doesn't exist, create a new spanish word record
			$spanish_word = new SpanishWord();
			$spanish_word->word = $spanish_word_input;
			$spanish_word->save();
			$spanish_word_id = $spanish_word->id;
		}

		//Add each translation to the database. First add the word/term to the english_word table and then add the relation to the spanish word to the english_word_spanish_word table
		foreach(Input::get('translation_panels_data') as $translation_iteration => $translation_data) {
			//echo $translation_data['english_word']

			$word_type = $translation_data['word_type'];
			//Convert comma separated string to array, after removing a trailing comma in case it is added
			$english_words = explode(",",rtrim($translation_data['english_word'],','));

			//Loop through each word for the current word type
			foreach ($english_words as $english_word_input) {
				//echo $english_word_input;

				//Check to see if the English word is already in the database
				$english_word_exists = EnglishWord::where('word', '=', $english_word_input)->first();
				if($english_word_exists) {
					//return 'The existing id is ' . $english_word_exists->id;
					$english_word_id = $english_word_exists->id;
				} else {
					//If the spanish word doesn't exist, create a new spanish word record
					$english_word = new EnglishWord();
					$english_word->word = $english_word_input;
					$english_word->save();
					$english_word_id = $english_word->id;
				}


				//Check to see if the English/Spanish relation already exists in the database
				$english_spanish_word_combo_exists = EnglishWordSpanishWord::where('spanish_word_id', '=', $spanish_word_id)->where('english_word_id', '=', $english_word_id)->first();

				//If the english/spanish word combo already exists and it is not the edit page, then display an error
				if($english_spanish_word_combo_exists) {
					if($operation !== 'edit') {
						throw new \Exception('This Spanish/English word combination already exists in the database.');
					}
					//If the relationship already exists in the pivot table, then update it
					$words_relationship = $english_spanish_word_combo_exists;
				} else {
					//If the relationship doesn't exist, then add it
					$words_relationship = new EnglishWordSpanishWord();
				}

				$words_relationship->english_word_id = $english_word_id;
				$words_relationship->spanish_word_id = $spanish_word_id;
				$words_relationship->type = $word_type;
				$words_relationship->save();
			}

			//If the current english word in the loop is a verb, then add its tenses
			if($word_type === 'verb') {
				if (!empty(Config::get('globals.tenses'))) {
					//Inserts new conjugation tenses for the word
					foreach (Config::get('globals.tenses') as $tense_choice) {
						if (Input::get('form_inputs')[$tense_choice['name'].'_tense_english_i'] !== '') {
							$tense_exists = Tense::where('spanish_word_id', '=', $spanish_word_id)->where('type', '=', $tense_choice['name'])->first();

							if($tense_exists) {
								$tense = $tense_exists;
							} else {
								$tense = new Tense();
							}

							$tense->type = $tense_choice['name'];
							$tense->spanish_word_id = $spanish_word_id;

							//English Conjugations
							$tense->english_i = Input::get('form_inputs')[$tense_choice['name'].'_tense_english_i'];
							$tense->english_you_informal = Input::get('form_inputs')[$tense_choice['name'].'_tense_english_you'];
							$tense->english_he = Input::get('form_inputs')[$tense_choice['name'].'_tense_english_he'];
							$tense->english_she = Input::get('form_inputs')[$tense_choice['name'].'_tense_english_he'];
							$tense->english_you_formal = Input::get('form_inputs')[$tense_choice['name'].'_tense_english_you'];
							$tense->english_we = Input::get('form_inputs')[$tense_choice['name'].'_tense_english_we'];
							$tense->english_they_masc = Input::get('form_inputs')[$tense_choice['name'].'_tense_english_they'];
							$tense->english_they_fem = Input::get('form_inputs')[$tense_choice['name'].'_tense_english_they'];
							$tense->english_you_group = Input::get('form_inputs')[$tense_choice['name'].'_tense_english_they'];

							//Spanish Conjugations
							$tense->spanish_i = Input::get('form_inputs')[$tense_choice['name'].'_tense_spanish_i'];
							$tense->spanish_you_informal = Input::get('form_inputs')[$tense_choice['name'].'_tense_spanish_you_informal'];
							$tense->spanish_he = Input::get('form_inputs')[$tense_choice['name'].'_tense_spanish_he'];
							$tense->spanish_she = Input::get('form_inputs')[$tense_choice['name'].'_tense_spanish_he'];
							$tense->spanish_you_formal = Input::get('form_inputs')[$tense_choice['name'].'_tense_spanish_he'];
							$tense->spanish_we = Input::get('form_inputs')[$tense_choice['name'].'_tense_spanish_we'];
							$tense->spanish_they_masc = Input::get('form_inputs')[$tense_choice['name'].'_tense_spanish_they'];
							$tense->spanish_they_fem = Input::get('form_inputs')[$tense_choice['name'].'_tense_spanish_they'];
							$tense->spanish_you_group = Input::get('form_inputs')[$tense_choice['name'].'_tense_spanish_they'];

							$tense->save();
						}
					}
				}
			}
		}

		//If all inserts work, then commit the transaction and leave them in the database
		DB::commit();
		$json_response['ajaxStatus'] = 'success';
	}

	//If any exception was caught, then this will handle that
	catch(\Exception $exception) {
		//Roll back the transaction
		DB::rollback();

		//Log the error message and send an email to the admins. Also save the exception detail information to send back to the page via AJAX
		$exception_details = SiteHelpers::log_mail_error($exception);

		//Send back variables to use on the front end
		$json_response['ajaxStatus'] = 'failed';
		$json_response['debugState'] = Config::get('app.debug');
		$json_response['errorDetails'] = $exception_details;
		//throw $exception;
	}

	//Send back various information via AJAX
    return json_encode($json_response);
});

//Checks if a Spanish word already exists in the database
Route::post('ajax/spanish_word_check', function()
{
    $json_response = array();

    $spanish_word = Input::get('spanish_word');

	//Check the database if the spanish word that was entered already exists in the database
	$spanish_word_object = SpanishWord::where('word', '=', $spanish_word)->first();
	if($spanish_word_object) {
		$json_response['ajaxStatus'] = 'failed';
	} else {
		$json_response['ajaxStatus'] = 'success';
	}
	//echo $spanish_word_id;

	//Send back various information via AJAX
    return json_encode($json_response);
});




Route::post('ajax/spanish_english_word_check', function()
{
    $json_response = array();

    $spanish_word = Input::get('spanish_word');
	$spanish_word_object = SpanishWord::where('word', '=', $spanish_word)->first();
	if($spanish_word_object) {
		$spanish_word_id = $spanish_word_object->id;
	}
	//echo $spanish_word_id;

    $english_word = Input::get('english_word');
	$english_word_object = EnglishWord::where('word', '=', $english_word)->first();
	if($english_word_object) {
		$english_word_id = $english_word_object->id;
	}
	//echo $english_word_id;

	//Neither of the Spanish or English Word were found, which means there can't be relationship in the pivot table, then send it back as success
	if(!isset($spanish_word_id) || !isset($english_word_id)) {
		$json_response['ajaxStatus'] = 'success';
	} else { //Both were found
		$num_matches = DB::table('english_word_spanish_word')->where('english_word_id', $english_word_id)->where('spanish_word_id', $spanish_word_id)->count();
		//echo $num_matches;

		if($num_matches === 1) { //If the two ID's have a relationship in the pivot table, then send it back as failed
			$json_response['ajaxStatus'] = 'failed';
		}
	}

	//Send back various information via AJAX
    return json_encode($json_response);
});



//Creates an array of all English words that match the input entered on the front end
Route::get('ajax/autocomplete_tags_live', function()
{
	// TextboxList Autocomplete sample data for queryRemote: true (server is queried as user types)
	//http://www.devthought.com/wp-content/projects/jquery/textboxlist/Demo/

	// get names  (eg: database)
	// the format is:
	// id, searchable plain text, html (for the textboxlist item, if empty the plain is used), html (for the autocomplete dropdown)

	$response = array();
	$english_words  = EnglishWord::all()->toArray();

	// make sure they're sorted alphabetically, for binary search tests
	sort($english_words);

	$search = isset($_REQUEST['search']) ? $_REQUEST['search'] : '';

	foreach ($english_words as $i => $word)
	{
		if (!preg_match("/^$search/i", $word['word'])) continue;
		$response[] = array($i, $word['word'], null, $word['word']);
	}

	header('Content-type: application/json');
	echo json_encode($response);
});



//Checks if a Spanish word already exists in the database
Route::post('ajax/remove_translation', function()
{
	$json_response = array();

	$relation_id = Input::get('relation_id');

	//Get the entry in the EnglishWordSpanishWord table and delete it
	$english_spanish_relation = EnglishWordSpanishWord::find($relation_id);

	if($english_spanish_relation->delete()) {
		$json_response['ajaxStatus'] = 'success';
	} else {
		$json_response['ajaxStatus'] = 'failed';
	}

	//Send back various information via AJAX
	return json_encode($json_response);
});












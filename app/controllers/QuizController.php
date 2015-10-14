<?php

class QuizController extends \BaseController {

	/**
	 * Display a listing of quizzes
	 *
	 * @return Response
	 */
	public function index()
	{
		$spanish_words = SpanishWord::all();
		return View::make('quiz.index')->with('spanish_words', $spanish_words);
	}

	/**
	 * Show the form for creating a new quiz
	 *
	 * @return Response
	 */
	public function create()
	{
		return View::make('quizzes.create');
	}

    public function test() {
        return View::make('quiz.test');
    }




    /**
	 * Store a newly created quiz in storage.
	 *
	 * @return Response
	 */
	public function store()
	{

		$json_response = array();

		$words_master_array = [];

		foreach(Input::all()['conjugation_words'] as $word_id) {
			$word = Word::find($word_id);

			//Add the various tenses for each word
			foreach (Config::get('globals.tenses') as $tense) {
				$model = $tense['name'] . 'Tense';
				$word->{$tense['name'] . '_tense'} = $word->$model()->first();
			}

			$words_master_array[$word_id] = $word;
		}

		//return $words_master_array;

		$json_response['quizWords'] = $words_master_array;

		//Send back various information via AJAX
        return json_encode($json_response);






















//		$validator = Validator::make($data = Input::all(), Quiz::$rules);
//
//		if ($validator->fails())
//		{
//			return Redirect::back()->withErrors($validator)->withInput();
//		}
//
//		Quiz::create($data);
//
//		return Redirect::route('quizzes.index');


		//return $test;

		//return View::make('quiz.step_2');
		//return Redirect::route('quiz.step_2');

		//$data = Input::all();
		//return $data;
	}



	/**
	 * Display the specified quiz.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$quiz = Quiz::findOrFail($id);

		return View::make('quizzes.show', compact('quiz'));
	}

	/**
	 * Show the form for editing the specified quiz.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		$quiz = Quiz::find($id);

		return View::make('quizzes.edit', compact('quiz'));
	}

	/**
	 * Update the specified quiz in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$quiz = Quiz::findOrFail($id);

		$validator = Validator::make($data = Input::all(), Quiz::$rules);

		if ($validator->fails())
		{
			return Redirect::back()->withErrors($validator)->withInput();
		}

		$quiz->update($data);

		return Redirect::route('quizzes.index');
	}

	/**
	 * Remove the specified quiz from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		Quiz::destroy($id);

		return Redirect::route('quizzes.index');
	}

}

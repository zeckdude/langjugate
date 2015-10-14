<?php

class WordController extends \BaseController {

//	protected $word;
//
//	public function __construct(Word $word)
//	{
//		$this->word = $word;
//	}

	/**
	 * Display a listing of the resource.
	 * GET /product
	 *
	 * @return Response
	 */
	public function index()
	{
		$spanish_words  = SpanishWord::all();

//		$data = array(
//		    'spanish_words'  => SpanishWord::all()
//		);
//
	return View::make('words.index')->with('spanish_words', $spanish_words);
	}

	/**
	 * Display the specified resource.
	 * GET /product/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($spanish_word)
	{
		$spanish_word = SpanishWord::where('word', '=', $spanish_word)->firstOrFail();
		$related_english_words = EnglishWordSpanishWord::where('spanish_word_id', '=', $spanish_word->id)->get();

		return View::make('words.show', ['spanish_word' => $spanish_word, 'related_english_words' => $related_english_words]);
	}



	/**
	 * Show the form for editing the specified resource.
	 * GET /product/{id}/edit
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 * PUT /product/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 * DELETE /product/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}








}
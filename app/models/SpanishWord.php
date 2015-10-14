<?php

class SpanishWord extends Eloquent {



	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'spanish_word';

	public function tenses()
	{
		return $this->hasMany('Tense');
	}

	public function englishWords()
	{
		return $this->belongsToMany('EnglishWord');
	}

	public function englishWordSpanishWords()
	{
		return $this->hasMany('EnglishWordSpanishWord');
	}

}

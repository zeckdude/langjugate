<?php

class EnglishWord extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'english_word';

	public function spanishWords()
	{
		return $this->belongsToMany('SpanishWord');
	}

}

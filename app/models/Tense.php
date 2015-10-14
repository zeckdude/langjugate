<?php

class Tense extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'tense';

	public function spanishWord()
	{
		return $this->belongsTo('SpanishWord');
	}

}

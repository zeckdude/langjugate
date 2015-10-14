<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateEnglishWordSpanishWordTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('english_word_spanish_word', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('english_word_id')->unsigned()->index();
			$table->foreign('english_word_id')->references('id')->on('english_words')->onDelete('cascade');
			$table->integer('spanish_word_id')->unsigned()->index();
			$table->foreign('spanish_word_id')->references('id')->on('spanish_words')->onDelete('cascade');
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('english_word_spanish_word');
	}

}

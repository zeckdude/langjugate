@extends('layouts.main')

@section('title', 'Home')

@section('content')
	<h2>¡Hola! Welcome!</h2>

	<p>Langjugate is a study aid that has been created by web developer Chris Seckler due to the need for an easy system to create language retention quizzes.
		In his quest to learn Spanish, he eagerly scoured the web for a tool that would allow him to:</p>
	<ul>
	    <li>Create Personal Sets of Study Terms</li>
	    <li>Quiz himself on any portion of the study terms</li>
	    <li>Select specified conjugation tenses on those nasty verbs</li>
	    <li>Quickly look up references for various Spanish words</li>
		<li>Track his progress over time and display it visually</li>
	</ul>

	<p>After his strenuous exploration through many a Spanish learning sites, he discovered that no such tool exists and he realized what must be done. He decided to create the optimal system that he desired.
		And so Langjugate was born! He hopes you enjoy what he has labored tirelessly on and welcomes any suggestions sent to {{ HTML::mailto('langjugate@gmail.com', 'langjugate@gmail.com') }}</p>
		<p><small>Please be aware that Langjugate is a work in progress and errors may occur. Love it or leave it!</small></p>
@stop
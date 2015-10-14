@extends('...layouts.main')

@section('title', 'Quiz Yourself')

@section('content')
	<h2>Let the Quiz begin!</h2>

	<div id="quiz_question_area">
        <p id="instruction">Translate:</p>
        <p id="quiz_word">fsfsdfdsf</p>
	</div>

        {{ Form::open(['class' => 'quiz_test']) }}
            <div id="quiz_answer_area" class="form-group">
                {{ Form::text('quiz_answer', null, ['id' => 'quiz_answer', 'class' => 'form-control', 'data-parsley-required' => 'true']) }}
            </div>

            <div class="form-group">
                {{ Form::submit('Submit Answer', ['class' => 'btn btn-primary btn-lg']) }}
            </div>
        {{ Form::close() }}
@stop
@extends('layouts.main')
@section('content')
	<h2>Choose the tenses to be quizzed on</h2>
	@if (isset($conjugation_words) && !empty($conjugation_words))
        {{ Form::open( array('url' => 'quiz/processQuizForm') )}}
            @foreach ($conjugation_words as $conjugation_word)
                <?php
                    $word = Word::where('spanish_word', '=', $conjugation_word)->firstOrFail();
                    $present_tense = $word->presentTense()->first();
                    $preterite_tense = $word->preteriteTense()->first();
		        ?>

                <div class="form-group">
                    <h4>{{ link_to_route('words.show', $word->spanish_word . ' ('.$word->english_word.')', [$word->spanish_word], ['target'=>'blank']) }}</h4>
                    @if($present_tense)
                        <div>
                            {{ Form::checkbox('present_tense_words[]', $word->spanish_word) }} Present Tense
                        </div>
                    @endif
                    @if($preterite_tense)
                        <div>
                            {{ Form::checkbox('preterite_tense_words[]', $word->spanish_word) }} Preterite Tense
                        </div>
                    @endif
                </div>
            @endforeach

            {{ Form::hidden('step_2_completed', true) }}
            <div class="form-group">
                {{ Form::submit('Choose Tenses', ['class' => 'btn btn-primary btn-lg']) }}
            </div>
        {{ Form::close() }}
    @else
        <p>There are no conjugation words chosen at this time. Please go back.</p>
    @endif
@stop
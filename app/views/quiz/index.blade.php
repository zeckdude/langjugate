@extends('layouts.main')

@section('title', 'Quiz Yourself')

<script type="text/javascript">
    //var words_db = <?php //echo $words ?>;
    //console.log(words_db);
    //for (i = 0; i < words_db.length; i++) {
        //words_db[i]['test'] = 'whatever';
    //}
    //console.log(words_db);
</script>

@section('content')
	<h2>Choose the words to be quizzed on</h2>
	@if (isset($spanish_words) && !$spanish_words->isEmpty())
        {{ Form::open(['class' => 'quiz']) }}
            <div id="choose_words">
                @foreach ($spanish_words as $spanish_word)
                    <?php $english_words_list = ''; ?>
                    @foreach($spanish_word->englishWords as $english_word)
                        <?php
                            $english_words_list .= $english_word->word . ', ';
                        ?>
                    @endforeach
                    <?php $english_words_list = rtrim($english_words_list, ', '); ?>

                    <div class="form-group">
                        {{ Form::checkbox('conjugation_words[]', $spanish_word->id) }}
                        <h4>{{ link_to_route('words.show', $spanish_word->word . ' ('.$english_words_list.')', [$spanish_word->word], ['target'=>'blank']) }}</h4>
                    </div>
                @endforeach

            </div>

            <div id="choose_tenses" style="display: none;">

            </div>

            <div class="form-group">
                {{ Form::submit('Choose Words', ['class' => 'btn btn-primary btn-lg quiz-step-1']) }}
            </div>
        {{ Form::close() }}
    @else
        <p>There are no words in the database at this time.</p>
    @endif
@stop
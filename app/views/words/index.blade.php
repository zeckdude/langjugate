@extends('layouts.main')

@section('title', 'View All Words')

@section('content')
	<h2>All of the Words in the Library</h2>
	@if (!$spanish_words->isEmpty())
        @foreach ($spanish_words as $spanish_word)
            <?php $english_words_list = ''; ?>
            @foreach($spanish_word->englishWords as $english_word)
                <?php
                    $english_words_list .= $english_word->word . ', ';
                ?>
            @endforeach
            <?php $english_words_list = rtrim($english_words_list, ', '); ?>

            <h4>{{ link_to_route('words.show', $spanish_word->word . ' ('.$english_words_list.')', [$spanish_word->word]) }}</h4>
        @endforeach
    @else
        <p>There are no words in the database at this time.</p>
    @endif
@stop





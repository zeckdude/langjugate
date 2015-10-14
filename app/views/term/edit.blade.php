@extends('layouts.main')

@section('title', 'Edit a Word - ' . $spanish_word['word'])

@section('content')

<?php //var_dump($tenses);
 //var_dump($words);
 ?>



@foreach($tenses_list as $tense)
    {{-- $tense['name'] --}}
@endforeach

    <h1>Edit the Word details</h1>

    {{ Form::open(['url' => 'term/create', 'class' => 'word-create validate-form word-edit', 'novalidate' => 'novalidate', 'data-parsley-excluded' => 'input.skip_validation']) }}

        {{--<h2>TextboxList.Autocomplete (values seeded on demand)</h2>--}}
        {{--<p>Select friends to email</p>--}}
        {{--<div class="form_friends">--}}
            {{--<input type="text" name="test4" value="" id="form_tags_input_1" />--}}
        {{--</div>--}}
        {{--<small>Type the tag (one or more words) and press enter. Use left/right arrows, backspace, delete to navigate/remove boxes, and up/down/enter to navigate/add suggestions.</small>--}}


    	<!--  Form Input -->
    	<div id="word_choice_area">
            <div class="form-group">
                {{ Form::label('spanish_word', 'Spanish Word:') }}
                {{ Form::text('spanish_word', $spanish_word['word'], ['class' => 'form-control', 'placeholder' => 'Please enter Spanish word', 'tabindex' => '1']) }}
                {{--<p>{{ $spanish_word['word'] }}</p>--}}
            </div>

            <!--  Form Input -->
        </div>

        {{--{{ $spanish_word->englishWords }}--}}

        {{--@foreach($spanish_word->englishWords as $english_word)--}}
                    {{--{{{ $english_word->type }}}--}}
                {{--@endforeach--}}


        <div id="translation_area">
            <div class="form-group">
                {{ Form::button('<span class="icon icon-plus"></span> Add Translation', array('id' => 'add_translation', 'class' => 'btn btn-default btn-md')) }}
            </div>

            <div class="panel-group secundary">

                <?php
                    $type_shown = array();
                    $loop_iterator = 1;
                ?>

                {{-- Loop through each of the entries in the pivot table, so each of the different definitions for a given Spanish word --}}
                @foreach($related_english_words as $related_english_word)
                    <?php


                    //Get the type of the current word (ie verb, noun, adjective)
                    $currentWordType = $related_english_word->type;

                    //echo $currentWordType;

                    //If there are multiple definitions of a specific type, then only show it once and instead display all those translations for that type together
                    if(!in_array($currentWordType, $type_shown)) {
                    ?>

                    <?php
                        //Collect all the various definitions for the current word type and then display those
                        $english_words = EnglishWordSpanishWord::where('spanish_word_id', '=', $spanish_word->id)->where('type','=',$currentWordType)->get();
                    ?>


                        <div class="panel panel-default translation-panel" data-relation-id="{{ $related_english_word->id }}">
                            <div class="panel-heading">
                                <h4 class="panel-title">
                                    <a class="accordion-toggle" data-toggle="collapse" href="#collapse{{ $loop_iterator }}">
                                        <i class="icon icon-globe"></i>
                                        <span class="translation_title">
                                            <span class="title_word_type">{{{ ucfirst($currentWordType) }}}: </span>
                                            <span class="title_word">
                                                <?php $english_word_iterator = 1; ?>
                                                @foreach($english_words as $english_word)
                                                    <?php
                                                        $english_word_id = $english_word->english_word_id;
                                                        $english_word_name = EnglishWord::find($english_word_id)->word;

                                                        //echo $english_word_name;

                                                        //Remove any whitespace surrounding a word/phrase and then replace any space inside the string with an underscore
                                                        $word_class = trim(str_replace(' ', '_', $english_word_name));
                                                    ?>

                                                    @if($english_word_iterator === 1)
                                                        <span class="{{{ $word_class }}} initial-word">{{{ $english_word_name }}}</span>
                                                    @else
                                                        <span class="separator"> | </span>
                                                        <span class="{{{ $word_class }}}">{{{ $english_word_name }}}</span>
                                                    @endif

                                                    <?php $english_word_iterator++; ?>
                                                @endforeach

                                                {{--<span class="fhfh initial-word">fhfh</span>--}}
                                                {{--<span class="separator"> | </span>--}}
                                                {{--<span class="bnvbn">bnvbn</span>--}}
                                                {{--<span class="separator"> | </span>--}}
                                                {{--<span class="trytry">trytry</span>--}}
                                                {{--<span class="separator"> | </span>--}}
                                                {{--<span class="sdfdsf">sdfdsf</span>--}}
                                            </span>
                                        </span>
                                        <i class="icon icon-times-circle pull-right panel-close"></i>
                                    </a>
                                </h4>
                            </div>
                            <div id="collapse{{ $loop_iterator }}" class="accordion-body collapse in" style="height: auto;">
                                <div class="panel-body">
                                      <div class="form-group">
                                          {{ Form::label('english_word', 'English Word(s):') }}
                                          {{ Form::text('english_word', null, ['id' => 'form_tags_input_'.$loop_iterator, 'class' => 'form-control english_word', 'placeholder' => 'Enter one or multiple translations of the same type separated by commas', 'data-parsley-required' => 'true', 'data-parsley-pattern' => '^([a-zA-Z]+\s)*[a-zA-Z]+$', 'data-parsley-error-message' => 'Please enter an English Word. (letters only)', 'tabindex' => '2']) }}
                                          <small>Type the translation (one or more words) and press enter. Use left/right arrows, backspace, delete to navigate/remove translations, and up/down/enter to navigate/add suggestions.</small>
                                      </div>

                                      <div class="form-group">
                                          <label>Word Type:</label>
                                          <div class="word_type_area">
                                            <?php
                                                $word_types = ['noun','verb','adjective','adverb','pronoun','preposition','conjunction','interjection'];
                                            ?>
                                                @foreach($word_types as $word_type)
                                                    <button type="button" class="btn btn-default btn-md @if($word_type === $currentWordType) {{ 'btn-primary chosen-word-type' }}@endif" data-word-type="{{{ $word_type }}}">{{{ ucfirst($word_type) }}}</button>
                                                @endforeach
                                          </div>
                                      </div>
                                </div>
                            </div>
                        </div>






                    <?php
                        // Add the current word type to the $type_shown array so it doesn't show it again
                        array_push($type_shown, $currentWordType);


                    ?>
                        <script type="text/javascript">
                            $( document ).ready(function() {
                                textboxlist{{ $loop_iterator }} = new $.TextboxList('#form_tags_input_{{ $loop_iterator }}', {
                                    plugins: {
                                        autocomplete: {
                                            minLength: 2,
                                            queryRemote: true,
                                            remote: {url: '/ajax/autocomplete_tags_live'}
                                        }
                                    },
                                    unique: true
                                });

                                //Load the textboxlist with the current words in the DB on page load
                                @foreach($english_words as $english_word)
                                    <?php
                                        $english_word_id = $english_word->english_word_id;
                                        $english_word_name = EnglishWord::find($english_word_id)->word;
                                    ?>

                                    textboxlist{{ $loop_iterator }}.add('{{{ $english_word_name }}}')
                                @endforeach

                                //Add the last added word to the current translation panel header
                                textboxlist{{ $loop_iterator }}.addEvent('bitBoxAdd', function (bit) {
                                    var wordEntered = bit.value[1];
                                    var bitContainer = textboxlist{{ $loop_iterator }}.getContainer();

                                    //Remove any boxes that are added with only spaces or if the word entered already exists on the page
                                    if (wordEntered.trim() === '' || _.indexOf(bitWordsAdded,wordEntered.trim()) !== -1) {
                                        if(wordEntered.trim() === '') {
                                            displayFlash('warning', 'The translation entered cannot be blank', 'show intro', 'hide close', 'hide headline');
                                        }

                                        if(_.indexOf(bitWordsAdded,wordEntered.trim()) !== -1) {
                                            displayFlash('warning', 'The translation entered is already being used for this Spanish word', 'show intro', 'hide close', 'hide headline');
                                        }

                                        bitContainer.find('.textboxlist-bit.textboxlist-bit-box-deletable:last').remove();
                                    } else { //Otherwise, add the new word to the panel title header
                                        var currentPanelTitleContainer = bitContainer.closest('div.translation-panel').find('span.title_word');
                                        //console.log(bitContainer.closest('div.accordion-body').text());
                                        //console.log(bitContainer);


                                        //Remove any whitespace surrounding a word/phrase and then replace any space inside the string with an underscore
                                        var wordClass = wordEntered.trim().split(' ').join('_');

                                        //If the initial word in the panel header doesn't exist uet, then add it with that class
                                        if (!currentPanelTitleContainer.find('.initial-word').length) {
                                            currentPanelTitleContainer.html('<span class="' + wordClass + ' initial-word">' + wordEntered + '</span>');
                                        } else { //Otherwise, add a separator and omit that class
                                            currentPanelTitleContainer.append('<span class="separator"> | </span><span class="' + wordClass + '">' + wordEntered + '</span>');
                                        }
                                    }
                                });

                                //Remove the selected word from the current translation panel header
                                textboxlist{{ $loop_iterator }}.addEvent('bitBoxRemove', function (bit) {
                                    var wordRemoved = bit.value[1];
                                    var bitContainer = textboxlist{{ $loop_iterator }}.getContainer();
                                    var currentTranslationPanel = bitContainer.closest('div.translation-panel');
                                    var currentPanelTitleContainer = currentTranslationPanel.find('span.title_word');

                                    //Remove any whitespace surrounding a word/phrase and then replace any space inside the string with an underscore
                                    var wordClass = wordRemoved.trim().split(' ').join('_');

                                    var currentWordToRemove = currentPanelTitleContainer.find('span.' + wordClass);

                                    //If the first word is being removed, then add the 'initial-word' class to the next word
                                    if (currentWordToRemove.hasClass('initial-word')) {
                                        currentWordToRemove.next().next().addClass('initial-word');
                                    }

                                    //Remove the following separator and the word
                                    currentWordToRemove.next('span.separator').remove();
                                    currentWordToRemove.remove();

                                    //Remove the word from the bitWordsAdded array so it can be entered again if necessary
                                    bitWordsAdded = _.without(bitWordsAdded, wordRemoved);
                                    console.log(bitWordsAdded);

                                    //If all the words have been removed, show the default message again (e.g. Translation #1)
                                    if (currentPanelTitleContainer.is(':empty')) {
                                        var currentTranslationPanelNum = currentTranslationPanel.index() + 1;
                                        currentPanelTitleContainer.html('Translation #' + currentTranslationPanelNum);
                                    }
                                });
                            });
                        </script>

                    <?php
                        $loop_iterator++;

                    }

                    ?>
                @endforeach

                <?php
                    //var_dump($type_shown);
                ?>

                <script type="text/javascript">
                    wordsChosenOnPage = {{ json_encode($type_shown) }};
                    spanish_word_on_load = "{{ $spanish_word['word'] }}";
                </script>

            </div>
            {{--@foreach($spanish_word->tenses as $tense)--}}
                        {{--{{ $tense }}--}}
                    {{--@endforeach--}}

                     {{--$spanish_word->tenses--}}




        </div>




        @if(!empty($tenses_list))
            <?php $tab_index_num = 6; ?>
            <div id="tenses_area" data-plugin-toggle="">
                <label>Verb Tenses:</label>
                @foreach($tenses_list as $tense)
                    <?php
                        $tense_data = $spanish_word->tenses()->where('type', '=', $tense['name'])->first();
                        //echo $tense_data['spanish_he'];
                    ?>
                    <section class="toggle" data-tense="{{ $tense['name'] }}">
                        <label><i class="fa fa-plus"></i><i class="fa fa-minus"></i>{{ ucfirst($tense['name']) }} Tense</label>
                        <div class="toggle-content" style="display: none;">
                            <table class="table table-bordered">
                                <tr>
                                    <th colspan="4" style="text-align: center">English</th>
                                </tr>
                                <tbody>
                                    <tr>
                                        <td>I</td>
                                        <td><div class="form-group">{{ Form::text($tense['name'].'_tense_english_i', $tense_data['english_i'], ['class' => 'form-control tense_input', 'tabindex' => $tab_index_num]) }}</div></td>

                                        <td>We</td>
                                        <td><div class="form-group">{{ Form::text($tense['name'].'_tense_english_we', $tense_data['english_we'], ['class' => 'form-control tense_input', 'tabindex' => $tab_index_num + 3]) }}</div></td>
                                    </tr>

                                    <tr>
                                        <td>You</td>
                                        <td><div class="form-group">{{ Form::text($tense['name'].'_tense_english_you', $tense_data['english_you_informal'], ['class' => 'form-control tense_input', 'tabindex' => $tab_index_num + 1]) }}</div></td>

                                        <td style="background-color: #e1e1e1"></td>
                                        <td style="background-color: #e1e1e1"></td>
                                    </tr>

                                    <tr>
                                        <td>He/She</td>
                                        <td><div class="form-group">{{ Form::text($tense['name'].'_tense_english_he', $tense_data['english_he'], ['class' => 'form-control tense_input', 'tabindex' => $tab_index_num + 2]) }}</div></td>

                                        <td>They</td>
                                        <td><div class="form-group">{{ Form::text($tense['name'].'_tense_english_they', $tense_data['english_they_masc'], ['class' => 'form-control tense_input', 'tabindex' => $tab_index_num + 4]) }}</div></td>
                                    </tr>
                                </tbody>
                            </table>

                            <table class="table table-bordered">
                                <tr>
                                    <th colspan="4" style="text-align: center">Spanish</th>
                                </tr>
                                <tbody>
                                    <tr>
                                        <td>yo</td>
                                        <td><div class="form-group">{{ Form::text($tense['name'].'_tense_spanish_i', $tense_data['spanish_i'], ['class' => 'form-control tense_input', 'tabindex' => $tab_index_num + 5]) }}</div></td>

                                        <td>nosotros</td>
                                        <td><div class="form-group">{{ Form::text($tense['name'].'_tense_spanish_we', $tense_data['spanish_we'], ['class' => 'form-control tense_input', 'tabindex' => $tab_index_num + 8]) }}</div></td>
                                    </tr>

                                    <tr>
                                        <td>tú</td>
                                        <td><div class="form-group">{{ Form::text($tense['name'].'_tense_spanish_you_informal', $tense_data['spanish_you_informal'], ['class' => 'form-control tense_input', 'tabindex' => $tab_index_num + 6]) }}</div></td>

                                        <td style="background-color: #e1e1e1"></td>
                                        <td style="background-color: #e1e1e1"></td>
                                    </tr>

                                    <tr>
                                        <td>él/ella/Ud.</td>
                                        <td><div class="form-group">{{ Form::text($tense['name'].'_tense_spanish_he', $tense_data['spanish_he'], ['class' => 'form-control tense_input', 'tabindex' => $tab_index_num + 7]) }}</div></td>

                                        <td>ellos/ellas/Uds.</td>
                                        <td><div class="form-group">{{ Form::text($tense['name'].'_tense_spanish_they', $tense_data['spanish_they_masc'], ['class' => 'form-control tense_input', 'tabindex' => $tab_index_num + 9]) }}</div></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <?php $tab_index_num = $tab_index_num + 10; ?>
                @endforeach
            </div>
        @else
            <p>There are currently no tenses chosen in the system settings. Please check that and retry.</p>
        @endif





        <div class="form-group">
            {{ Form::submit('Edit Word', ['id' => 'create_word_btn', 'class' => 'edit_word_btn btn btn-primary btn-lg']) }}
        </div>
    {{ Form::close() }}
@stop
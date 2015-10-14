@extends('layouts.main')

@section('title', 'Create a New Word')

@section('content')

<?php //var_dump($tenses);
 //var_dump($words);


 ?>

  {{--@foreach ($spanish_words as $spanish_word)--}}
    {{-- $spanish_word->word --}}
 {{--@endforeach--}}

@foreach($tenses_list as $tense)
    {{-- $tense['name'] --}}
@endforeach

    <h1>Enter the Word details</h1>

    {{ Form::open(['class' => 'word-create validate-form', 'novalidate' => 'novalidate', 'data-parsley-excluded' => 'input.skip_validation']) }}

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
                {{ Form::text('spanish_word', null, ['class' => 'form-control', 'placeholder' => 'Please enter Spanish word', 'tabindex' => '1']) }}
            </div>

            <!--  Form Input -->
        </div>


        <div id="translation_area">
            <div class="form-group">
                {{ Form::button('<span class="icon icon-plus"></span> Add Translation', array('id' => 'add_translation', 'class' => 'btn btn-default btn-md')) }}
            </div>

            <div class="panel-group secundary">
                {{--<div class="panel panel-default translation-panel">--}}
                    {{--<div class="panel-heading">--}}
                        {{--<h4 class="panel-title">--}}
                            {{--<a class="accordion-toggle" data-toggle="collapse" href="#collapse20">--}}
                                {{--<i class="icon icon-globe"></i> <span class="translation_title"><span class="title_word_type"></span><span class="title_word">Translation #1</span></span>--}}
                                {{--<i class="icon icon-times-circle pull-right panel-close"></i>--}}

                            {{--</a>--}}

                        {{--</h4>--}}
                    {{--</div>--}}
                    {{--<div id="collapse20" class="accordion-body collapse in" style="height: auto;">--}}
                        {{--<div class="panel-body">--}}
                              {{--<div class="form-group">--}}
                                  {{--{{ Form::label('english_word', 'English Word(s):') }}--}}
                                  {{--{{ Form::text('english_word', null, ['id' => 'form_tags_input_1', 'class' => 'form-control english_word', 'placeholder' => 'Enter one or multiple translations of the same type separated by commas', 'data-parsley-required' => 'true', 'data-parsley-pattern' => '^([a-zA-Z]+\s)*[a-zA-Z]+$', 'data-parsley-error-message' => 'Please enter an English Word. (letters only)', 'tabindex' => '2']) }}--}}
                                  {{--<small>Type the translation (one or more words) and press enter. Use left/right arrows, backspace, delete to navigate/remove translations, and up/down/enter to navigate/add suggestions.</small>--}}
                              {{--</div>--}}

                              {{--<div class="form-group">--}}
                                  {{--<label>Word Type:</label>--}}
                                  {{--<div class="word_type_area">--}}
                                        {{--<button type="button" class="btn btn-default btn-md" data-word-type="noun">Noun</button>--}}
                                        {{--<button type="button" class="btn btn-default btn-md" data-word-type="verb">Verb</button>--}}
                                        {{--<button type="button" class="btn btn-default btn-md" data-word-type="adjective">Adjective</button>--}}
                                        {{--<button type="button" class="btn btn-default btn-md" data-word-type="adverb">Adverb</button>--}}
                                        {{--<button type="button" class="btn btn-default btn-md" data-word-type="pronoun">Pronoun</button>--}}
                                        {{--<button type="button" class="btn btn-default btn-md" data-word-type="preposition">Preposition</button>--}}
                                        {{--<button type="button" class="btn btn-default btn-md" data-word-type="conjunction">Conjunction</button>--}}
                                        {{--<button type="button" class="btn btn-default btn-md" data-word-type="interjection">Interjection</button>--}}
                                  {{--</div>--}}
                              {{--</div>--}}
                        {{--</div>--}}
                    {{--</div>--}}
                {{--</div>--}}
            </div>
        </div>




        @if(!empty($tenses_list))
            <?php $tab_index_num = 6; ?>
            <div id="tenses_area" data-plugin-toggle="">
                <label>Verb Tenses:</label>
                @foreach($tenses_list as $tense)
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
                                        <td><div class="form-group">{{ Form::text($tense['name'].'_tense_english_i', null, ['class' => 'form-control tense_input', 'tabindex' => $tab_index_num]) }}</div></td>

                                        <td>We</td>
                                        <td><div class="form-group">{{ Form::text($tense['name'].'_tense_english_we', null, ['class' => 'form-control tense_input', 'tabindex' => $tab_index_num + 3]) }}</div></td>
                                    </tr>

                                    <tr>
                                        <td>You</td>
                                        <td><div class="form-group">{{ Form::text($tense['name'].'_tense_english_you', null, ['class' => 'form-control tense_input', 'tabindex' => $tab_index_num + 1]) }}</div></td>

                                        <td style="background-color: #e1e1e1"></td>
                                        <td style="background-color: #e1e1e1"></td>
                                    </tr>

                                    <tr>
                                        <td>He/She</td>
                                        <td><div class="form-group">{{ Form::text($tense['name'].'_tense_english_he', null, ['class' => 'form-control tense_input', 'tabindex' => $tab_index_num + 2]) }}</div></td>

                                        <td>They</td>
                                        <td><div class="form-group">{{ Form::text($tense['name'].'_tense_english_they', null, ['class' => 'form-control tense_input', 'tabindex' => $tab_index_num + 4]) }}</div></td>
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
                                        <td><div class="form-group">{{ Form::text($tense['name'].'_tense_spanish_i', null, ['class' => 'form-control tense_input', 'tabindex' => $tab_index_num + 5]) }}</div></td>

                                        <td>nosotros</td>
                                        <td><div class="form-group">{{ Form::text($tense['name'].'_tense_spanish_we', null, ['class' => 'form-control tense_input', 'tabindex' => $tab_index_num + 8]) }}</div></td>
                                    </tr>

                                    <tr>
                                        <td>tú</td>
                                        <td><div class="form-group">{{ Form::text($tense['name'].'_tense_spanish_you_informal', null, ['class' => 'form-control tense_input', 'tabindex' => $tab_index_num + 6]) }}</div></td>

                                        <td style="background-color: #e1e1e1"></td>
                                        <td style="background-color: #e1e1e1"></td>
                                    </tr>

                                    <tr>
                                        <td>él/ella/Ud.</td>
                                        <td><div class="form-group">{{ Form::text($tense['name'].'_tense_spanish_he', null, ['class' => 'form-control tense_input', 'tabindex' => $tab_index_num + 7]) }}</div></td>

                                        <td>ellos/ellas/Uds.</td>
                                        <td><div class="form-group">{{ Form::text($tense['name'].'_tense_spanish_they', null, ['class' => 'form-control tense_input', 'tabindex' => $tab_index_num + 9]) }}</div></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <?php $tab_index_num = $tab_index_num + 10; ?>
                @endforeach
            </div>
        @else
            <p>There are currently no terms chosen in the system settings. Please check that and retry.</p>
        @endif





        <div class="form-group">
            {{ Form::submit('Create New Word', ['id' => 'create_word_btn', 'class' => 'btn btn-primary btn-lg']) }}
        </div>
    {{ Form::close() }}
@stop
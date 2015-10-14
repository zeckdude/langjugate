@extends('layouts.main')

@section('title', 'Word Details - '.$spanish_word->word)

@section('content')
    <div id="show_word">

        <?php
            $type_shown = array();

        ?>

        {{-- Loop through each of the entries in the pivot table, so each of the different definitions for a given Spanish word --}}
        @foreach($related_english_words as $related_english_word)

            <?php
            //Get the type of the current word (ie verb, noun, adjective)
            $currentWordType = $related_english_word->type;

            //If there are multiple definitions of a specific type, then only show it once and instead display all those translations for that type together
            if(!in_array($currentWordType, $type_shown)) {
            ?>

            <?php
                //Collect all the various definitions for the current word type and then display those
                $english_words = EnglishWordSpanishWord::where('spanish_word_id', '=', $spanish_word->id)->where('type','=',$currentWordType)->get();
                $english_words_list = '';
                //var_dump($english_words);
            ?>
                @foreach($english_words as $english_word)
                    <?php
                        $english_word_id = $english_word->english_word_id;
                        $english_word_name = EnglishWord::find($english_word_id)->word;
                        $english_words_list .= $english_word_name . ', ';
                    ?>
                @endforeach
                <?php $english_words_list = rtrim($english_words_list, ', ');

            ?>

            <h2>{{ $spanish_word->word . ' ('.$english_words_list.')' }}</h2>
            <h5>{{ $currentWordType }}</h5>

            <p>More Info: {{ link_to('http://www.spanishdict.com/translate/'.$spanish_word->word, 'http://www.spanishdict.com/translate/'.$spanish_word->word, array('target' => '_blank')) }}</p>

            {{-- If the current word type is a verb, then get all the tenses for that word and display them in their respective table --}}
            @if($currentWordType === 'verb')
                <?php
                    $tenses = $spanish_word->tenses()->get();

                    //var_dump($tenses);
                    foreach($tenses as $tense) {
                        //var_dump($tense);


                ?>

                    <table class="table table-bordered">
                        <tr>
                            <th colspan="4" style="text-align: center"><?php echo ucfirst($tense->type); ?> Tense</th>
                        </tr>
                        <tbody>
                            <tr>
                                <td>yo</td>
                                <td>{{ $tense->spanish_i }}</td>

                                <td>nosotros</td>
                                <td>{{ $tense->spanish_we }}</td>
                            </tr>

                            <tr>
                                <td>tú</td>
                                <td>{{ $tense->spanish_you_informal }}</td>

                                <td style="background-color: #e1e1e1"></td>
                                <td style="background-color: #e1e1e1"></td>
                            </tr>

                            <tr>
                                <td>él/ella/Ud.</td>
                                <td>{{ $tense->spanish_he }}</td>

                                <td>ellos/ellas/Uds.</td>
                                <td>{{ $tense->spanish_you_group }}</td>
                            </tr>
                        </tbody>
                    </table>


                <?php
                } ?>
            @endif

            <?php
                // Add the current word type to the $type_shown array so it doesn't show it again
                if(!in_array($currentWordType, $type_shown)) {
                    array_push($type_shown, $currentWordType);
                }
            }
            ?>
        @endforeach
    </div>
@stop
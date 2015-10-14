// Name: langjugate.js


//$( ".quiz-step-1" ).click(function( event ) {
//    //Creating an object that will hold all the word objects along with their individual properties
//    var conjugation_words = {};
//    $.each($("input[name='conjugation_words[]']:checked"), function() {
//        conjugation_words[$(this).val()] = { ID:1, "Name":"whatever" }; //Adding a new object to the master object that has the name of the word and has its own individual properties
//    });
//
//    console.log(conjugation_words);
//
//    $.ajax ({
//        type: "POST",
//        url: "includes/inactivate_account.php",
//        dataType: "json",
//        data: {
//            "listerType" : listerType,
//            "listerId" : listerId
//        },
//        success: function(data) {
//
//        }, //end ajax success
//        error: function(data){ //If the listing doesn't update, display an error message
//            alert('Data Response Text: ' + data.responseText); //This will output the text of the PHP error
//        } //end ajax error
//    }); //end ajax call
//
//
//
//    event.preventDefault();
//});

//Global Functions
//Capitalizes the first letter of a string
function capitalize(s)
{
    return s && s[0].toUpperCase() + s.slice(1);
}

//Checks if a variable is an object
var isObject = function(item) {
    return (typeof item === "object" && !Array.isArray(item) && item !== null);
};

//Set global variables for modal window
var modalBox = $('#modal');
var modalTitle = modalBox.find('.modal-title');
var modalBody = modalBox.find('.modal-body');
var modalCancelBtn = modalBox.find('.cancel-btn');
var modalConfirmBtn = modalBox.find('.confirm-btn');

//Collects all form inputs and put them into an object as their properties
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

//Variable that is used to check if the word-create or word-edit ajax is currently running and if not, then remove the disabled property on the submit button when the modal window is finished hiding. If the ajax is still running when the window is finished hiding, then the ajax function will remove the disabled property when it has completed.
wordProcessRunning = false;

bitWordsAdded = [];


//Adds an error message for validation
function createInlineError(message) {
    return '<span class="custom-error-mzg help-block filled"><h5 class="parsley-custom-error-message">'+message+'</h5></span>';
}


// Shuffle Array
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffleArray(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};


//Shuffles the contents of a javascript object
//function shuffle(sourceArray) {
//    for (var n = 0; n < sourceArray.length - 1; n++) {
//        var k = n + Math.floor(Math.random() * (sourceArray.length - n));
//
//        var temp = sourceArray[k];
//        sourceArray[k] = sourceArray[n];
//        sourceArray[n] = temp;
//    }
//}
//
//
//function randomize(a, b) {
//    return Math.random() - 0.5;
//}


// Function to shuffle object properties (http://blog.corrlabs.com/2011/02/shuffling-object-properties-in.html)
function shuffleObject(object) {
    Array.prototype.shuffle = function () {
        for (var i = 0; i < this.length; i++) {
            var a = this[i];
            var b = Math.floor(Math.random() * this.length);
            this[i] = this[b];
            this[b] = a;
        }
    }

    object = shuffleProperties(object); // run shuffle

    function shuffleProperties(object) {
        var new_obj = {};
        var keys = getKeys(object);
        keys.shuffle();
        for (var key in keys) {
            if (key == "shuffle") continue; // skip our prototype method
            new_obj[keys[key]] = object[keys[key]];
        }
        return new_obj;
    }

    function getKeys(object) {
        var arr = new Array();
        for (var key in object)
            arr.push(key);
        return arr;
    }

    return object;
}





//var displayFlash = {
//    type: 'info',
//    message : 'Default Message',
//    introWord : 'Default Intro Word',
//    closeBtn: false,
//    Headline: 'Default Headline',
//    drinks : {
//        'coke': 'Coke',
//        'pepsi': 'Pepsi',
//        'lemonade': 'Lemonade',
//        'default': 'Default item'
//    },
//    introWord : function() {
//        switch (this.) {
//            case "success":
//                introWord = "Success!";
//                break;
//            case "info":
//                introWord = "Heads up!";
//                break;
//            case "warning":
//                introWord = "Warning!";
//                break;
//            case "danger":
//                introWord = "Error!";
//                break;
//            default:
//                introWord = "Oh boy!";
//        }
//    },
//    fullName : function() {
//        return this.firstName + " " + this.lastName;
//    }
//};

function displayFlash(type, message, introWord, closeBtn, headline) {

    var flashContainer = $('.flash');
    var button = '<button type="button" class="close" data-dismiss="alert">×</button>';
    var randomNumber = Math.floor((Math.random() * 10000) + 1); //Random number between 1 and 10000

    if(introWord === 'show intro') {
        switch (type) {
            case "success":
                introWord = "Success!";
                break;
            case "info":
                introWord = "Heads up!";
                break;
            case "warning":
                introWord = "Warning!";
                break;
            case "danger":
                introWord = "Error!";
                break;
            default:
                introWord = "Oh boy!";
        }
    }



    var flashMessage = '<div role="alert" class="alert flash rand_'+randomNumber+' fade in ';
    flashMessage += 'alert-' + type;
    flashMessage += '">';

    if(closeBtn !== 'hide close') {
        flashMessage += button;
    }

    if(headline !== 'hide headline') { flashMessage += '<h4 class="alert-heading">' + headline + '</h4>'; }

    if(introWord !== 'hide intro') { flashMessage += '<strong>'+introWord+'</strong> '; }

    flashMessage += '<p>' + message + '</p>';
    flashMessage += '</div>';


    if(!flashContainer.length) {
        fadeInFlash();
    } else {
        $('.flash').stop().remove();
        fadeInFlash();
    }


    function fadeInFlash() {
        $('body').prepend(flashMessage);
        if (closeBtn !== 'show close') {
            setTimeout(function () {
                //alert('yo');
                //alert('The random number is ' + randomNumber);
                $('.flash.rand_'+randomNumber).fadeOut(250, function(){
                    $(this).remove();
                });
            }, 2500);
        }
    }
}

//displayFlash('danger', 'Message Copy Here', 'show intro', 'hide close', 'hide headline');

function displaySpinner(domElement) {
    //$(domElement).append('<div id="ajax_spinner"><img src="images/ajax_spinner.gif"></div>');
    $("#ajax_spinner").appendTo(domElement).fadeIn(500);
    $('html, body').animate({
        scrollTop: $("#ajax_spinner").offset().top
    }, 700);
}

function removeSpinner(callback) {
    $("#ajax_spinner").fadeOut(500, function(){
        $(this).prependTo('body');

        if(callback) { callback(); }
    });
}


$(document).ready(function () {
    //$('.validate-form').parsley({
    //    successClass: 'has-success has-feedback',
    //    errorClass: 'has-error has-feedback',
    //    classHandler : function( _el ){
    //        var formGroup = _el.$element.closest('.form-group');
    //        //formGroup.children('.form-control').after( '<span class="glyphicon glyphicon-ok form-control-feedback"></span>' );
    //
    //        return formGroup;
    //    },
    //    //errorsContainer: function ( _el ) {},
    //    errorsWrapper: '<span class=\"help-block\"></span>',
    //    errorTemplate: '<h5></h5>'
    //});

    //Enables validation on the word add form only when the section is toggled open
    //$('section.toggle').click(function() {
    //    $(this).find('input.form-control').toggleClass('skip_validation');
    //});


    var quiz = {
        words: {
            "_45": {
                id: 45,
                spanish_word: "estar",
                english_word: "to be",
                type: "verb",
                tenses: {
                    present: {
                        spanish_i: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_informal: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_he: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_she: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_formal: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_we: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_they_masc: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_they_fem: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_group: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        }
                    },
                    preterite: {
                        spanish_i: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_informal: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_he: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_she: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_formal: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_we: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_they_masc: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_they_fem: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_group: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        }
                    }
                }
            },
            "_25": {
                id: 25,
                spanish_word: "comer",
                english_word: "to eat",
                type: "verb",
                tenses: {
                    present: {
                        spanish_i: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_informal: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_he: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_she: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_formal: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_we: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_they_masc: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_they_fem: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_group: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        }
                    },
                    preterite: {
                        spanish_i: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_informal: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_he: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_she: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_formal: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_we: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_they_masc: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_they_fem: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_group: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        }
                    }
                }
            },
            "_76": {
                id: 76,
                spanish_word: "beber",
                english_word: "to drink",
                type: "verb",
                tenses: {
                    present: {
                        spanish_i: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_informal: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_he: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_she: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_formal: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_we: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_they_masc: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_they_fem: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_group: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        }
                    },
                    preterite: {
                        spanish_i: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_informal: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_he: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_she: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_formal: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_we: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_they_masc: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_they_fem: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_group: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        }
                    }
                }
            },
            "_11": {
                id: 11,
                spanish_word: "leer",
                english_word: "to read",
                type: "verb",
                tenses: {
                    present: {
                        spanish_i: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_informal: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_he: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_she: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_formal: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_we: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_they_masc: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_they_fem: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_group: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        }
                    },
                    preterite: {
                        spanish_i: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_informal: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_he: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_she: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_formal: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_we: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_they_masc: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_they_fem: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_group: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        }
                    }
                }
            },
            "_99": {
                id: 99,
                spanish_word: "condujir",
                english_word: "to drive",
                type: "verb",
                tenses: {
                    present: {
                        spanish_i: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_informal: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_he: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_she: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_formal: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_we: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_they_masc: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_they_fem: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_group: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        }
                    },
                    preterite: {
                        spanish_i: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_informal: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_he: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_she: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_formal: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_we: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_they_masc: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_they_fem: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        },
                        spanish_you_group: {
                            spanish_correct_on_num_try: 0,
                            english_correct_on_num_try: 0
                        }
                    }
                }
            }
        }//,
        //lastName:"Doe",
        //age:50,
        //eyeColor:"blue"
    };



    //console.log(quiz.words);

    //Randomize the order of the words
    //shuffle(quiz.words);
    //quiz.words.sort(randomize);


    //console.log(quiz.words);




    var colors = {
        "red":"RED",
        "blue":"BLUE",
        "green":"GREEN",
        "yellow":"YELLOW",
        "purple":"PURPLE"
    };

    //var quiz_short_array = [
    //    'words' = [
    //        '45' = [
    //            'id': '45',
    //            'spanish_word': 'estar',
    //
    //        ],
    //    ],
    //];

    var quiz_short = {
        words : {
            "_45": {
                id: 45,
                spanish_word: "estar",
                english_answer_solved_num: 0,
                english_answer_solved: false,
                english_words: {
                    "_1": {
                        id: 1,
                        english_word: "to be",
                        type: "verb",
                        spanish_answer_solved_num: 0,
                        spanish_answer_solved: false
                    },
                    "_6": {
                        id: 6,
                        english_word: "to exist",
                        type: "verb",
                        spanish_answer_solved_num: 0,
                        spanish_answer_solved: false
                    },
                    "_8": {
                        id: 8,
                        english_word: "testnoun",
                        type: "noun",
                        spanish_answer_solved_num: 0,
                        spanish_answer_solved: false
                    }
                },
                tenses: {
                    present: {
                        i: {
                            spanish: "estoy",
                            english: "am",
                            spanish_answer_solved_num: 0,
                            spanish_answer_solved: false,
                            english_answer_solved_num: 0,
                            english_answer_solved: false
                        },
                        you_informal: {
                            spanish: "estás",
                            english: "are",
                            spanish_answer_solved_num: 0,
                            spanish_answer_solved: false,
                            english_answer_solved_num: 0,
                            english_answer_solved: false
                        },
                        he: {
                            spanish: "está",
                            english: "is",
                            spanish_answer_solved_num: 0,
                            spanish_answer_solved: false,
                            english_answer_solved_num: 0,
                            english_answer_solved: false
                        }
                    },
                    preterite: {
                        i: {
                            spanish: "estuve",
                            english: "was",
                            spanish_answer_solved_num: 0,
                            spanish_answer_solved: false,
                            english_answer_solved_num: 0,
                            english_answer_solved: false
                        },
                        you_informal: {
                            spanish: "estuviste",
                            english: "were",
                            spanish_answer_solved_num: 0,
                            spanish_answer_solved: false,
                            english_answer_solved_num: 0,
                            english_answer_solved: false
                        },
                        he: {
                            spanish: "estuvo",
                            english: "was",
                            spanish_answer_solved_num: 0,
                            spanish_answer_solved: false,
                            english_answer_solved_num: 0,
                            english_answer_solved: false
                        }
                    }
                }
            },
            "_25": {
                id: 25,
                spanish_word: "comer",
                english_answer_solved_num: 0,
                english_answer_solved: false,
                english_words: {
                    "_9": {
                        id: 9,
                        english_word: "to eat",
                        type: "verb",
                        spanish_answer_solved_num: 0,
                        spanish_answer_solved: false
                    },
                    "_10": {
                        id: 10,
                        english_word: "to gorge",
                        type: "verb",
                        spanish_answer_solved_num: 0,
                        spanish_answer_solved: false
                    }
                },
                tenses: {
                    present: {
                        i: {
                            spanish: "como",
                            english: "eat",
                            spanish_answer_solved_num: 0,
                            spanish_answer_solved: false,
                            english_answer_solved_num: 0,
                            english_answer_solved: false
                        },
                        you_informal: {
                            spanish: "comes",
                            english: "eat",
                            spanish_answer_solved_num: 0,
                            spanish_answer_solved: false,
                            english_answer_solved_num: 0,
                            english_answer_solved: false
                        },
                        he: {
                            spanish: "come",
                            english: "eats",
                            spanish_answer_solved_num: 0,
                            spanish_answer_solved: false,
                            english_answer_solved_num: 0,
                            english_answer_solved: false
                        }
                    },
                    preterite: {
                        i: {
                            spanish: "comí",
                            english: "ate",
                            spanish_answer_solved_num: 0,
                            spanish_answer_solved: false,
                            english_answer_solved_num: 0,
                            english_answer_solved: false
                        },
                        you_informal: {
                            spanish: "comiste",
                            english: "ate",
                            spanish_answer_solved_num: 0,
                            spanish_answer_solved: false,
                            english_answer_solved_num: 0,
                            english_answer_solved: false
                        },
                        he: {
                            spanish: "comió",
                            english: "ate",
                            spanish_answer_solved_num: 0,
                            spanish_answer_solved: false,
                            english_answer_solved_num: 0,
                            english_answer_solved: false
                        }
                    }
                }
            },
            "_76": {
                id: 76,
                spanish_word: "beber",
                english_answer_solved_num: 0,
                english_answer_solved: false,
                english_words: {
                    "_17": {
                        id: 17,
                        english_word: "to drink",
                        type: "verb",
                        spanish_answer_solved_num: 0,
                        spanish_answer_solved: false
                    }
                },
                tenses: {
                    present: {
                        i: {
                            spanish: "bebo",
                            english: "drink",
                            spanish_answer_solved_num: 0,
                            spanish_answer_solved: false,
                            english_answer_solved_num: 0,
                            english_answer_solved: false
                        },
                        you_informal: {
                            spanish: "bebes",
                            english: "drink",
                            spanish_answer_solved_num: 0,
                            spanish_answer_solved: false,
                            english_answer_solved_num: 0,
                            english_answer_solved: false
                        },
                        he: {
                            spanish: "bebe",
                            english: "drinks",
                            spanish_answer_solved_num: 0,
                            spanish_answer_solved: false,
                            english_answer_solved_num: 0,
                            english_answer_solved: false
                        }
                    },
                    preterite: {
                        i: {
                            spanish: "bebí",
                            english: "drank",
                            spanish_answer_solved_num: 0,
                            spanish_answer_solved: false,
                            english_answer_solved_num: 0,
                            english_answer_solved: false
                        },
                        you_informal: {
                            spanish: "bebiste",
                            english: "drank",
                            spanish_answer_solved_num: 0,
                            spanish_answer_solved: false,
                            english_answer_solved_num: 0,
                            english_answer_solved: false
                        },
                        he: {
                            spanish: "bebió",
                            english: "drank",
                            spanish_answer_solved_num: 0,
                            spanish_answer_solved: false,
                            english_answer_solved_num: 0,
                            english_answer_solved: false
                        }
                    }
                }
            }
        }
    };




    //console.log(colors);
    //console.log(shuffleObject(colors));

    // 1) Shuffle the order of the words
    quiz_short.words = shuffleObject(quiz_short.words);
    console.log(quiz_short.words);


    //console.log(JSON.stringify(quiz_short.words, true, 2));

    console.log('-----------------------------------------------------');

    // 2) Loop through the words
    //for (word in quiz_short.words) {
    //    console.log(quiz_short.words[word]);
    //
    //    // 3) Check if the word is a verb
    //    //console.log(quiz_short.words[word].type);
    //    if(quiz_short.words[word].type === 'verb') {
    //        //console.log('Hooray! Im a verb!');
    //
    //        // 4) Shuffle the contents of the tenses property for the word
    //        quiz_short.words[word].tenses = shuffleObject(quiz_short.words[word].tenses);
    //        console.log(quiz_short.words[word].tenses);
    //
    //        // 5) Loop through the tenses
    //        for (conjugation in quiz_short.words[word].tenses) {
    //            // 6) Shuffle the contents of the conjugation property for the tense
    //            quiz_short.words[word].tenses[conjugation] = shuffleObject(quiz_short.words[word].tenses[conjugation]);
    //            console.log(quiz_short.words[word].tenses[conjugation]);
    //        }
    //    }
    //
    //    console.log('-----------------------------------------------------');
    //}
    //
    //console.log(quiz_short.words);















    function runQuiz() {
        // A) Randomly choose to quiz either an English or Spanish word
        var languages = ['english', 'spanish'];
        var random_language = languages[Math.floor(Math.random() * languages.length)];
        var cats_to_check = ['spanish_word', 'english_words', 'tenses'];
        var rand_category_to_check = cats_to_check[Math.floor(Math.random() * cats_to_check.length)];
        var person_identifier;

        console.log(random_language);
        console.log(rand_category_to_check);


        // 2) Loop through the words
        for (word in quiz_short.words) {
            //console.log(word);
            //console.log(quiz_short.words[word].spanish_word);

            if(rand_category_to_check === 'spanish_word') {
                if(quiz_short.words[word].english_answer_solved === false) {
                    quiz_question = quiz_short.words[word].spanish_word;
                    break;
                }
            }


            // 3) Check if the word is a verb
            //console.log(quiz_short.words[word].type);
            //if (quiz_short.words[word].type === 'verb') {
            if(rand_category_to_check === 'tenses') {
                if (typeof quiz_short.words[word].tenses != "undefined") {

                    // 4) Shuffle the contents of the tenses property for the word
                    quiz_short.words[word].tenses = shuffleObject(quiz_short.words[word].tenses);

                    // 5) Loop through the tenses
                    for (tense in quiz_short.words[word].tenses) {
                        // 6) Shuffle the contents of the conjugation property for the tense
                        quiz_short.words[word].tenses[tense] = shuffleObject(quiz_short.words[word].tenses[tense]);
                        //console.log(quiz_short.words[word].tenses[tense]);

                        // 7) Loop through the conjugations for the tense
                        for (conjugation in quiz_short.words[word].tenses[tense]) {
                            //console.log(quiz_short.words[word].tenses[tense][conjugation_word].spanish);

                            if (random_language === 'english') {
                                //console.log(conjugation);

                                switch (conjugation) {
                                    case "i":
                                        person_identifier = 'I';
                                        break;
                                    case "you_informal":
                                        person_identifier = 'You';
                                        break;
                                    case "he":
                                        person_identifier = 'He';
                                        break;
                                    case "she":
                                        person_identifier = 'She';
                                        break;
                                    case "you_formal":
                                        person_identifier = 'You';
                                        break;
                                    case "we":
                                        person_identifier = 'We';
                                        break;
                                    case "they_masc":
                                        person_identifier = 'They';
                                        break;
                                    case "they_fem":
                                        person_identifier = 'They';
                                        break;
                                    case "you_group":
                                        person_identifier = 'You all';
                                        break;
                                    default:
                                        person_identifier = 'XXXXX';
                                }

                                quiz_question = person_identifier + ' ' + quiz_short.words[word].tenses[tense][conjugation].english;
                            } else if (random_language === 'spanish') {
                                //console.log(conjugation);

                                switch (conjugation) {
                                    case "i":
                                        person_identifier = 'Yo';
                                        break;
                                    case "you_informal":
                                        person_identifier = 'Tú';
                                        break;
                                    case "he":
                                        person_identifier = 'Él';
                                        break;
                                    case "she":
                                        person_identifier = 'Ella';
                                        break;
                                    case "you_formal":
                                        person_identifier = 'Usted';
                                        break;
                                    case "we":
                                        person_identifier = 'Nosotros';
                                        break;
                                    case "they_masc":
                                        person_identifier = 'Ellos';
                                        break;
                                    case "they_fem":
                                        person_identifier = 'Ellas';
                                        break;
                                    case "you_group":
                                        person_identifier = 'Ustedes';
                                        break;
                                    default:
                                        person_identifier = 'XXXXX';
                                }

                                quiz_question = person_identifier + ' ' + quiz_short.words[word].tenses[tense][conjugation].spanish;
                            }

                            //shown_word_id = quiz_short.words[word].id;
                            //shown_language = random_language;
                            //shown_tense = tense;
                            //shown_conjugation = conjugation;
                        } //end conjugation loop
                        //console.log(quiz_short.words[word].tenses[conjugation]);
                    } //end tense loop
                } //end if verb clause
            }




        } //end word loop

        $('#quiz_word').html(quiz_question);

    } //end function runQuiz()

    runQuiz();

    //console.log(shown_word_id);
    //console.log(shown_language);
    //console.log(shown_tense);
    //console.log(shown_conjugation);
});







//*** TESTING UNDERSCORE.JS FUNCTIONALITY ***
var testArray = [1, 2, 1, 0, 3, 1, 4];
var numToTest = 1;

if(_.indexOf(testArray,numToTest) !== -1) {
    //console.log('The number '+numToTest+' does exist in the array');
}
//testArray = _.without(testArray, 0, 1);
//console.log(testArray);
//*** TESTING UNDERSCORE.JS FUNCTIONALITY ***









(function() {

    //WORD CREATION FORM PAGE (SOME FUNCTIONALITY IS BEING SHARED WITH THE EDIT PAGE)

    //TODO Displays a warning message if the user leaves the page
    //window.onbeforeunload = function() {
    //    return "If you reload the page, you will lose all entered data!";
    //}


    var wordCreateForm = $('form.word-create');
    var submit_btn = wordCreateForm.find('input[type="submit"]');
    //var spanishWordInput = $("#spanish_word");

    //Run the check_spanish_word function if there is already a translation panel present and the user blurs away from the spanish_word field
    $("#spanish_word").blur(function() {
        if($('.translation-panel').length) {
            check_spanish_word();
        }
    });

    //Run the check_spanish_word function on Enter press after filling out the spanish word and add a translation panel if it hasn't already been added
    $("#spanish_word").keydown(function(event){
        if(event.keyCode == 13) {
            //Only run the check_spanish_word function if there is already a translation panel present
            check_spanish_word('add_translation_panel');

            event.preventDefault();
            return false;
        }
    });
    
    //Checks if the spanish word that has been entered in the spanish_word field is not already being used
    function check_spanish_word(event) {
        var spanish_word = $("#spanish_word").val();

        //This variable is set only on the edit page, and lets the JS know what the previously saved value is so it doesn't think it's already being used since it is the same value
        if (typeof spanish_word_on_load === 'undefined') {
            spanish_word_on_load = '';
        }

        if(spanish_word != '') {
            if(spanish_word != spanish_word_on_load) {
                displaySpinner('form.word-create');

                var submit_btn = $('#create_word_btn');
                if (submit_btn.is(':visible')) {
                    //Temporarily disable the submit button
                    submit_btn.prop('disabled', 'disabled');
                }

                $.ajax({
                    type: 'POST',
                    url: '/ajax/spanish_word_check',
                    data: {
                        spanish_word: spanish_word
                    },
                    dataType: "json",
                    success: function (responseData) {
                        if (responseData.ajaxStatus === 'success') {
                            removeSpinner(function () {
                                displayFlash('success', 'That word isn\'t taken yet!', 'show intro', 'hide close', 'hide headline');
                                //Remove the disabled state on the submit button
                                submit_btn.removeAttr('disabled');

                                if (event == 'add_translation_panel') {
                                    if (!$('.translation-panel').length) {
                                        addNewTranslationPanel();
                                        submit_btn.fadeIn(1000);
                                    }
                                }
                            });

                        } else if (responseData.ajaxStatus === 'failed') {
                            removeSpinner(function () {
                                displayFlash('danger', 'That word already exists', 'hide intro', 'show close', 'Attention');
                            });
                        }
                    }
                });
            }
        } else {
            displayFlash('danger', 'You must enter a Spanish Word', 'show intro', 'hide close', 'hide headline');
        }
    }

    
    
    
    
    
    
    
    
    

    // This array holds all the word types chosen on the page, so the user can't pick the same one in a different translation panel
    // If the wordChosenOnPage aren't already set(on the edit word page), then start with an empty array
    if (typeof wordsTypesChosenOnPage === 'undefined') {
        wordsTypesChosenOnPage = [];
    } else {
        console.log(wordsTypesChosenOnPage);
    }


    //Change the color of the Word Type Button that is selected and apply a class to be able to tell which one is chosen. Also change the word type in the panel header bar. And show the verbs area if verb is chosen.
    wordCreateForm.on('click', '.word_type_area .btn', function() {
        console.log('clicked button');

        if(!$(this).hasClass('chosen-word-type')) {
            var wordTypeChosen = $(this).data('word-type');
            var lastwordTypeChosen = $(this).siblings('.chosen-word-type').data('word-type');

            //If the current word type chosen is already selected, show flash message
            if ($.inArray(wordTypeChosen, wordsTypesChosenOnPage) !== -1) {
                //Show modal warning that you can't pick two of the same word type
                displayFlash('warning', 'The ' + wordTypeChosen + ' word type is already selected', 'show intro', 'hide close', 'hide headline');
            } else {
                //Remove the current chosen word type from the wordsTypesChosenOnPage array and add the new one
                if (lastwordTypeChosen) {
                    //console.log(lastwordTypeChosen);
                    wordsTypesChosenOnPage = _.without(wordsTypesChosenOnPage, lastwordTypeChosen);
                    //console.log(wordsTypesChosenOnPage);
                }

                //Add the current word type chosen to the wordTypeChosenOnPage array
                wordsTypesChosenOnPage.push(wordTypeChosen);
                //console.log(wordsTypesChosenOnPage);


                var currentTranslationPanel = $(this).closest('div.translation-panel');
                var currentTranslationPanelBody = currentTranslationPanel.find('.accordion-body .panel-body');
                var tensesArea = $("#tenses_area");

                //Remove the chosen-word-type class from all buttons and apply it to the currently selected one so it is clearly visible which one is being selected
                $(this).siblings().removeClass('btn-primary').removeClass('chosen-word-type');
                $(this).addClass('btn-primary').addClass('chosen-word-type');

                //Add the currently selected word type to the header bar
                currentTranslationPanel.find('span.title_word_type').html(capitalize(wordTypeChosen) + ': ');

                //Open and Close the tenses area depending on whether 'Verb' is chosen
                if (wordTypeChosen === 'verb') {
                    //Move the tenses area to the end of the current translation panel if it is not already there
                    if (!currentTranslationPanel.find('#tenses_area').length) {
                        tensesArea.appendTo(currentTranslationPanelBody);
                    }

                    //Slide Down to reveal the tenses area
                    tensesArea.slideDown();
                } else {
                    //Only slide up the panel if the button that was pressed was a word type other than verb and it is in the same panel-group as the #tenses_area currently is in
                    if (currentTranslationPanel.find('#tenses_area').length) {
                        tensesArea.slideUp();
                    }
                }
            }
        }
    });


    //Add a new translation group, each time the add translation button is clicked
    wordCreateForm.find('button#add_translation').on('click', function() {
        //If there is no translation panel present, then run the check_spanish_word function and add the new translation panel if it passes
        if(!$('.translation-panel').length) {
            check_spanish_word('add_translation_panel');
        } else { //Else if there is already a translation panel present, then just add a new translation panel
            addNewTranslationPanel();
        }
    });

    //Adds a new translation group
    function addNewTranslationPanel() {
        var numPresentTranslationPanels = $('.translation-panel').length;

        //Restrict the number of translation panels to 8, since there are only 8 word types
        if (numPresentTranslationPanels !== 8) {
            var numCurrentTranslationPanel = numPresentTranslationPanels + 1;

            var translationGroup = '' +
                '<div class="panel panel-default translation-panel">' +
                '<div class="panel-heading">' +
                '<h4 class="panel-title">' +
                '<a class="accordion-toggle" data-toggle="collapse" href="#collapse' + numCurrentTranslationPanel + '">' +
                '<i class="icon icon-globe"></i> <span class="translation_title"><span class="title_word_type"></span><span class="title_word">Translation #' + numCurrentTranslationPanel + '</span></span>' +
                '<i class="icon icon-times-circle pull-right panel-close"></i>' +
                '</a>' +
                '</h4>' +
                '</div>' +
                '<div id="collapse' + numCurrentTranslationPanel + '" class="accordion-body collapse in" style="height: auto;">' +
                '<div class="panel-body">' +
                '<div class="form-group">' +
                '<label for="english_word">English Word(s):</label>' +
                '<input id="form_tags_input_' + numCurrentTranslationPanel + '" class="form-control english_word" placeholder="Enter one or multiple translations of the same type separated by commas" tabindex="2" name="english_word_' + numCurrentTranslationPanel + '" type="text" id="english_word_' + numCurrentTranslationPanel + '">' +
                '<small>Type the translation (one or more words) and press enter. Use left/right arrows, backspace, delete to navigate/remove translations, and up/down/enter to navigate/add suggestions.</small>' +
                '</div>' +

                '<div class="form-group">' +
                '<label>Word Type:</label>' +
                '<div class="word_type_area">' +
                '<button type="button" class="btn btn-default btn-md" data-word-type="noun">Noun</button>' +
                '<button type="button" class="btn btn-default btn-md" data-word-type="verb">Verb</button>' +
                '<button type="button" class="btn btn-default btn-md" data-word-type="adjective">Adjective</button>' +
                '<button type="button" class="btn btn-default btn-md" data-word-type="adverb">Adverb</button>' +
                '<button type="button" class="btn btn-default btn-md" data-word-type="pronoun">Pronoun</button>' +
                '<button type="button" class="btn btn-default btn-md" data-word-type="preposition">Preposition</button>' +
                '<button type="button" class="btn btn-default btn-md" data-word-type="conjunction">Conjunction</button>' +
                '<button type="button" class="btn btn-default btn-md" data-word-type="interjection">Interjection</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';

            //Add the new translation panel to the end of the panels
            var panelGroup = $('.panel-group');
            panelGroup.append(translationGroup);

            //Quickly hide the added panel so it can be faded in
            var lastAddedTranslationPanel = $('.translation-panel:last');
            lastAddedTranslationPanel.hide().fadeIn(1000);
            $('html, body').animate({
                scrollTop: $(lastAddedTranslationPanel).offset().top
            }, 700);

            //Initialize the textboxlist jquery plugin for the current translation panel english_word input field (At this time, 10/22/2014, it needs to be initialized via a unique id, so I had to run this in each loop instead of applying it to a class one time)
            // http://www.devthought.com/projects/jquery/textboxlist/
            // http://www.devthought.com/wp-content/projects/jquery/textboxlist/Demo/
            window[numCurrentTranslationPanel] = new $.TextboxList('#form_tags_input_' + numCurrentTranslationPanel, {
                plugins: {
                    autocomplete: {
                        minLength: 2,
                        queryRemote: true,
                        remote: {url: '/ajax/autocomplete_tags_live'} //Runs the autocomplete functionality for the textboxlists
                    }
                },
                unique: true
            });

            //Add the last added word to the current translation panel header
            window[numCurrentTranslationPanel].addEvent('bitBoxAdd', function (bit) {
                var wordEntered = bit.value[1]; //Get the value of the last entered word
                var bitContainer = window[numCurrentTranslationPanel].getContainer();

                //Remove any boxes that are added with only spaces or if the word entered already exists on the page and display the appropriate flash message
                if (wordEntered.trim() === '' || _.indexOf(bitWordsAdded,wordEntered.trim()) !== -1) {
                    if(wordEntered.trim() === '') {
                        displayFlash('warning', 'The translation entered cannot be blank', 'show intro', 'hide close', 'hide headline');
                    }

                    if(_.indexOf(bitWordsAdded,wordEntered.trim()) !== -1) {
                        displayFlash('warning', 'The translation entered is already being used for this Spanish word', 'show intro', 'hide close', 'hide headline');
                    }

                    bitContainer.find('.textboxlist-bit.textboxlist-bit-box-deletable:last').remove();
                } else { //Otherwise, add the new word to the panel title header
                    //Add the word to an array keeping track of words entered so there are no duplicates
                    bitWordsAdded.push(wordEntered);
                    //console.log(bitWordsAdded);

                    var currentPanelTitleContainer = bitContainer.closest('div.translation-panel').find('span.title_word');
                    //console.log(bitContainer.closest('div.accordion-body').text());
                    //console.log(bitContainer);

                    //Remove any whitespace surrounding a word/phrase and then replace any space inside the string with an underscore
                    var wordClass = wordEntered.trim().split(' ').join('_');

                    //If the initial word in the panel header doesn't exist yet, then add it with that class
                    if (!currentPanelTitleContainer.find('.initial-word').length) {
                        currentPanelTitleContainer.html('<span class="' + wordClass + ' initial-word">' + wordEntered + '</span>');
                    } else { //Otherwise, add a separator and omit that class
                        currentPanelTitleContainer.append('<span class="separator"> | </span><span class="' + wordClass + '">' + wordEntered + '</span>');
                    }
                }
            });

            //Remove the selected word from the current translation panel header
            window[numCurrentTranslationPanel].addEvent('bitBoxRemove', function (bit) {
                var wordRemoved = bit.value[1];
                var bitContainer = window[numCurrentTranslationPanel].getContainer();
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
        } else {
            displayFlash('warning', 'The maximum number of translation types is 8.', 'show intro', 'hide close', 'hide headline');
        }
    }


    //Prompts the user via a modal window if they want to delete the translation panel
    wordCreateForm.on('click', '.panel-close', function() {
        currentTranslationPanel = $(this).closest('div.translation-panel');
        currentPanelChosenWordType = currentTranslationPanel.find('.btn.chosen-word-type');
        tensesArea = $("#tenses_area");

        //Grab the EnglishSpanishWord relation id, so you can delete it from the database if its the edit page
        if($(this).closest("div.translation-panel[data-relation-id]").length) {
            relationId = $(this).closest("div.translation-panel").data('relationId');
        } else {
            relationId = null;
        }

        modalTitle.text('Attention!');
        modalBody.html('<p>Are you sure you want to remove this translation? The action cannot be undone.</p>');
        modalCancelBtn.text('Wait! I changed my mind!');
        modalConfirmBtn.text('Be gone with it!').addClass('remove-translation');
        modalBox.modal('show');

        //return false;
    });

    //Remove the translation panel if confirmed in the modal window
    $('body.term-create, body.term-edit').on('click', 'button.confirm-btn.remove-translation', function() {
        modalConfirmBtn.removeClass('remove-translation');
        modalBox.modal('hide');

        currentTranslationPanel.fadeTo("slow", 0.00, function(){ //fade
            $(this).slideUp("slow", function() { //slide up
                if (currentTranslationPanel.find('#tenses_area').length) {
                    tensesArea.appendTo($('#translation_area')).hide();
                }

                //Remove Chosen word from array when panel is closed
                if (currentPanelChosenWordType.length) {
                    //alert('There is a selected button in this panel');
                    var currentPanelChosenWordTypeVal = currentPanelChosenWordType.data('word-type');
                    wordsTypesChosenOnPage = _.without(wordsTypesChosenOnPage, currentPanelChosenWordTypeVal);
                    //console.log(wordsTypesChosenOnPage);
                }

                currentTranslationPanel.remove(); //then remove from the DOM

                //If this is not a newly added translation panel, then remove it from the database
                if(relationId !== 0) {
                    $.ajax({
                        type: 'POST',
                        url: '/ajax/remove_translation',
                        data: {
                            relation_id: relationId
                        },
                        dataType: "json",
                        success: function (responseData) {
                            if (responseData.ajaxStatus === 'success') {
                                removeSpinner(function () {
                                    displayFlash('success', 'The translation has been removed', 'show intro', 'hide close', 'hide headline');
                                });
                            } else if (responseData.ajaxStatus === 'failed') {
                                removeSpinner(function () {
                                    displayFlash('danger', 'There was a problem removing the translation', 'show intro', 'hide close', 'hide headline');
                                });
                            }
                        }
                    });
                }
            });
        });

        //If this is the last translation panel on the page that is being removed, then hide the submit button
        if($('div.translation-panel').length == 1) {
            $('#create_word_btn').fadeOut(1000);
        }

    });





    //On word Creation Page Submit
    wordCreateForm.on('submit', function(e) {
        e.preventDefault();
        $('.custom-error-mzg').remove();
        var customError = false;

        //Collect Form Variables
        form = $(this);
        method = form.find('input[name="_method"]').val() || 'POST';
        url = form.prop('action');
        submit_btn = form.find('input[type="submit"]');
        var numCheck = /^[a-zA-Zñáéíóúü,\s]*$/; //Regular Expression only allowing letters, commas and spaces, and specific special characters(ñáéíóúü)

        var spanishWordField = $('#spanish_word');
        spanishWord = spanishWordField.val();

        //Validation for Spanish Field
        if(spanishWord === '') {
            spanishWordField.after(createInlineError('Please enter a Spanish Word (letters only).'));
            customError = true;
        } else if (!numCheck.test(spanishWord)) {
            spanishWordField.after(createInlineError('There are no numbers allowed for the Spanish word.'));
            customError = true;
        }

        //Validation for tenses
        $('body.term-create, body.term-edit').find("section.toggle.active").find('input.form-control').each(function(index) {
            //console.log($(this).val());
            var tenseField = $(this);
            var tenseFieldValue = tenseField.val();

            if(tenseFieldValue === '') {
                tenseField.after(createInlineError('Please enter this conjugation.'));
                customError = true;
            } else if (!numCheck.test(tenseFieldValue)) {
                tenseField.after(createInlineError('There are no numbers allowed for the conjugation.'));
                customError = true;
            }
        });


        //Run Validation on each translation
        translationPanelsData = [];
        $(".translation-panel").each(function(index) {
            var currentTranslationPanel = $(this);
            var englishWords = currentTranslationPanel.find('.english_word').val();
            var textboxlistArea = currentTranslationPanel.find('.textboxlist').next('small');
            var wordType = currentTranslationPanel.find('button.chosen-word-type').data('wordType');
            var wordTypeArea = currentTranslationPanel.find('.word_type_area');

            if(englishWords === '') {
                textboxlistArea.after(createInlineError('Please enter an English translation(s) (letters only).'));
                customError = true;
            } else if (!numCheck.test(englishWords)) {
                textboxlistArea.after(createInlineError('There are no numbers allowed for English translations.'));
                customError = true;
            }

            if(wordType === null) {
                wordTypeArea.append(createInlineError('Please choose a word type'));
                customError = true;
            } else if(wordType === 'verb') { //If Verb is selected, check if any of the tense areas are open so validation can run on them
                numVisibleTenseToggleContents = $(".toggle-content:visible").size();

                if(numVisibleTenseToggleContents === 0) {
                    $('#tenses_area').append(createInlineError('You must add at least one verb tense'));
                    customError = true;
                }
            }

            //If there are no errors, then in each loop of the translation panels, add the english_word field value and the word type as an object within the translationPanelsData array
            if(customError === false) {
                translationPanelsData.push({
                    english_word: englishWords,
                    word_type: wordType
                });
            }
        });



        //Collect all of the form information to display in a modal window for the user to confirm
        if ( form.parsley().isValid() && customError === false ) {

            //Temporarily disable the submit button
            submit_btn.prop('disabled', 'disabled');

            //Create the body content of the modal window to show the user
            var modalBodyContent = '<h2 class="modal_spanish_word"><span>Spanish Word/Term:</span> '+spanishWord+'</h2>';
            $.each(translationPanelsData, function( index, obj ) {
                modalBodyContent += '<div class="modal_translation_group">';
                modalBodyContent += '<p class="modal_translation_title">Translation #' + (index+1) + '</p>';
                modalBodyContent += '<div class="inner_content">';

                if(isObject(obj)) {
                    $.each(obj, function( key, value ) {
                        switch (key) {
                            case 'english_word':
                                var field_name = "English Translation(s)";
                                var icon = 'icon-font';
                                break;
                            case 'word_type':
                                var field_name = "Word Type";
                                var icon = 'icon-tags';
                                break;
                            default:
                                var field_name = key;
                        }
                        modalBodyContent += '' +
                        '<div class="feature-box">' +
                            '<div class="feature-box-icon">' +
                                '<i class="icon ' + icon + '"></i>' +
                            '</div>' +
                            '<div class="feature-box-info">' +
                                '<h4 class="shorter">' + field_name + '</h4>' +
                                '<p class="tall">' + capitalize(value) + '</p>' +
                            '</div>' +
                        '</div>';
                    });
                }

                //If the translation panel, of the which the data is currently being added to the modal window, has the word type verb, then show the conjugation tenses
                if(obj['word_type'] === 'verb') {
                    var activeTensePanel = $('#tenses_area').find('section.toggle.active');
                    var enteredTenses = activeTensePanel.find('.tense_input').serializeObject();
                    //console.log(enteredTenses);

                    //Cycle through each of the open tense panels to collect their entries and create a new table to show the information
                    $.each(activeTensePanel, function(index, value) {
                        var currentActiveTense = $(this).data('tense');

                        modalBodyContent += '' +
                        '<div class="feature-box">' +
                            '<div class="feature-box-icon">' +
                            '<i class="icon icon-table"></i>' +
                            '</div>' +
                            '<div class="feature-box-info">' +
                                '<h4 class="shorter">Verb Conjugation</h4>' +
                                '<p class="tall">' + capitalize(currentActiveTense) + ' Tense</p>' +

                                '<table class="table table-bordered">' +
                                    '<tbody>' +
                                        '<tr>' +
                                            '<th colspan="4" style="text-align: center">Spanish</th>' +
                                        '</tr>' +
                                    '</tbody>' +
                                    '<tbody>' +
                                        '<tr>' +
                                            '<td>yo</td>' +
                                            '<td>' + enteredTenses[currentActiveTense + '_tense_spanish_i'] + '</td>' +
                                            '<td>nosotros</td>' +
                                            '<td>' + enteredTenses[currentActiveTense + '_tense_spanish_we'] + '</td>' +
                                        '</tr>' +

                                        '<tr>' +
                                            '<td>tú</td>' +
                                            '<td>' + enteredTenses[currentActiveTense + '_tense_spanish_you_informal'] + '</td>' +
                                            '<td style="background-color: #e1e1e1"></td>' +
                                            '<td style="background-color: #e1e1e1"></td>' +
                                        '</tr>' +

                                        '<tr>' +
                                            '<td>él/ella/Ud.</td>' +
                                            '<td>' + enteredTenses[currentActiveTense + '_tense_spanish_he'] + '</td>' +
                                            '<td>ellos/ellas/Uds.</td>' +
                                            '<td>' + enteredTenses[currentActiveTense + '_tense_spanish_they'] + '</td>' +
                                        '</tr>' +
                                    '</tbody>' +
                                '</table>' +

                                '<table class="table table-bordered">' +
                                    '<tbody>' +
                                        '<tr>' +
                                            '<th colspan="4" style="text-align: center">English</th>' +
                                        '</tr>' +
                                    '</tbody>' +
                                    '<tbody>' +
                                        '<tr>' +
                                            '<td>I</td>' +
                                            '<td>' + enteredTenses[currentActiveTense + '_tense_english_i'] + '</td>' +
                                            '<td>We</td>' +
                                            '<td>' + enteredTenses[currentActiveTense + '_tense_english_we'] + '</td>' +
                                        '</tr>' +

                                        '<tr>' +
                                            '<td>You</td>' +
                                            '<td>' + enteredTenses[currentActiveTense + '_tense_english_you'] + '</td>' +
                                            '<td style="background-color: #e1e1e1"></td>' +
                                            '<td style="background-color: #e1e1e1"></td>' +
                                        '</tr>' +

                                        '<tr>' +
                                            '<td>He/She</td>' +
                                            '<td>' + enteredTenses[currentActiveTense + '_tense_english_he'] + '</td>' +
                                            '<td>They</td>' +
                                            '<td>' + enteredTenses[currentActiveTense + '_tense_english_they'] + '</td>' +
                                        '</tr>' +
                                    '</tbody>' +
                                '</table>' +
                            '</div>' +
                        '</div>';
                    });
                }

                modalBodyContent += '</div></div>';
            });

            //Change the modal window title, body, cancel button text and confirm button text(different depending on if it is currently the create or edit page)
            modalTitle.text('Please verify your Entry');
            modalBody.html(modalBodyContent);
            modalCancelBtn.text('Hold On! That\'s wrong!');

            if($('body').hasClass('term-edit')) {
                modalConfirmBtn.text('Looks good! Save my Changes!');
            } else {
                modalConfirmBtn.text('Looks good! Add the new Word!');
            }

            //Add a class to the submit button so we can create a click event that only looks for that class
            modalConfirmBtn.addClass('submit-form');

            //Show the modal window
            modalBox.modal('show');
        }
    });

    //When the modal window is finished hiding, enable the submit again
    $('.term-create, .term-edit').find('#modal').on('hidden.bs.modal', function (e) {
        //Check if the word-create or word-edit ajax is currently running and if not, then remove the disabled property on the submit button. If it is still running when the window is finished hiding, then the ajax function will remove the disabled property when it has completed.
        if(wordProcessRunning === false) {
            //Remove the disabled state on the submit button if the modal window is closed
            submit_btn.removeAttr('disabled');
        }
    });

    //If the confirmation for the submit form in the modal is clicked, then send the form data via ajax to the DB
    $('body.term-create, body.term-edit').on('click', 'button.confirm-btn.submit-form', function() {

        //Remove the .submit-form class so the click event won't interfere with other uses in the modal window
        modalConfirmBtn.removeClass('submit-form');

        //Hide the modal window
        modalBox.modal('hide');

        //Set the wordProcessRunning variable to true so that the modal hiding function knows whether or not to remove the disabled property on the submit button or if that should wait until the ajax has finished
        wordProcessRunning = true;

        //If this is the edit page, then set the operation variable so the PHP on the other side knows that
        if($('body.term-edit').length) {
            var operation = 'edit';
        } else {
            var operation = 'new';
        }

        displaySpinner('form.word-create');

        $.ajax({
            type: method,
            url: url,
            data: {
                form_inputs: form.serializeObject(), //TODO make it not serialize the whole form but figure out what fields need to be sent besides the translation panels, so that it isn't needing to collect everything
                translation_panels_data: translationPanelsData,
                operation: operation
            },
            dataType: "json",
            success: function (responseData) {
                if (responseData.ajaxStatus === 'success') {
                    removeSpinner(function() {
                        //Scroll to the top of the page
                        $('html, body').animate({ scrollTop: 0 }, 0);

                        //Display Success Message
                        var successMessage = 'The word ' + $('input[name="spanish_word"]').val() + ' was ';
                        if(operation === 'new') { successMessage += 'added!'; }
                        if(operation === 'edit') { successMessage += 'edited!'; }

                        displayFlash('success', successMessage, 'show intro', 'hide close', 'hide headline');

                        if(operation === 'new') {
                            //Clear the form fields
                            form.trigger("reset");

                            //Remove all translation panels
                            $('.translation-panel').fadeOut(1000, function () {
                                $(this).remove();
                            });

                            //Close all open Tense Accordians
                            $(".toggle-content:visible").prev().trigger("click");

                            //Hide the submit button
                            submit_btn.fadeOut(1000);
                        }

                        wordProcessRunning = false;
                        //Remove the disabled state on the submit button if the modal window is closed
                        submit_btn.removeAttr('disabled');
                    });
                } else if (responseData.ajaxStatus === 'failed') {
                    removeSpinner(function() {
                        //Scroll to the top of the page
                        $('html, body').animate({ scrollTop: 0 }, 0);

                        //Default Failed message everyone sees
                        var failedMessage = 'There was an error ';
                        if(operation === 'new') { failedMessage += 'adding'; }
                        if(operation === 'edit') { failedMessage += 'editing'; }
                        failedMessage += ' the word ' + $('input[name="spanish_word"]').val() + '. The error has been forwarded to the admins.';
                        var errorDetails = responseData.errorDetails;

                        //Finishes building the html to show the exception details in the html on screen if the global debug variable is set to true
                        if((responseData.debugState)) {
                            failedMessage += '<h4>Error Details:</h4>';
                            failedMessage += '<pre>';

                            //Concatenating all error details into a string to display
                            for (i = 0; i < errorDetails.length; ++i) {
                                failedMessage += '<b>' + errorDetails[i]['header'] + '</b> <small>' + errorDetails[i]['copy'] + '</small><br />';
                            }

                            failedMessage += '</pre>';
                        }

                        //Display Failed Message
                        displayFlash('danger', failedMessage, 'show intro', 'show close', 'hide headline');

                        wordProcessRunning = false;
                        //Remove the disabled state on the submit button if the modal window is closed
                        submit_btn.removeAttr('disabled');
                    });
                }
            }
        });
    });



    //WORD EDITING FORM

    //Move the tenses area into the panel that has verb as the chosen word type on page load
    verbButton = $('button.chosen-word-type[data-word-type="verb"]');
    if(verbButton.length) {
        var currentTranslationPanel = verbButton.closest('div.translation-panel');
        var currentTranslationPanelBody = currentTranslationPanel.find('.accordion-body .panel-body');
        var tensesArea = $("#tenses_area");

        //Move the tenses are to the end of the current translation panel
        if (!currentTranslationPanel.find('#tenses_area').length) {
            //alert('the tenses area is not inside this translation panel');
            tensesArea.appendTo(currentTranslationPanelBody).show();

            //If the verb tense is chosen, open the appropriate panels
            $('.toggle-content').each(function(index, obj){
                var TensePanelFirstInput = $(this).find('.tense_input').first();

                if(TensePanelFirstInput.val() !== '') {
                    $(this).prev().trigger( "click" );
                }
            });
        }
    }






    //WORD CREATION FORM
    //$('form.quiz').on('submit', function(e) {
    //    e.preventDefault();
    //
    //    //Collect Form Variables
    //    var form = $(this).closest('form');
    //    var method = form.find('input[name="_method"]').val() || 'POST';
    //    var url = form.prop('action');
    //    var submit_btn = form.find('input[type="submit"]');
    //
    //    var chooseWordsDiv = $('#choose_words');
    //    var chooseTensesDiv = $('#choose_tenses');
    //
    //    if(submit_btn.hasClass('quiz-step-1')) {
    //        //alert('Step 1 Clicked');
    //
    //        $.ajax({
    //            type: method,
    //            url: url,
    //            data: form.serialize(),
    //            dataType: "json",
    //            success: function (responseData) {
    //                chosen_words = responseData.quizWords;
    //                console.log(chosen_words);
    //
    //                for (var key in chosen_words) {
    //                    var word = chosen_words[key];
    //                    var tenseGroup = '<div class="word_group">';
    //
    //                    tenseGroup += '<h4><a href="/words/' + word['spanish_word'] + '" target="_blank">' + word['spanish_word'] + ' (' + word['english_word'] + ')</a></h4>';
    //                    tenseGroup += '<div class="tense_group">';
    //
    //                    //if(word.hasOwnProperty('present_tense')){
    //                    //        console.log('present tense available');
    //                    //      }
    //
    //                    for (i = 0; i < globalTenses.length; i++) {
    //                        var tense_name = (globalTenses[i]);
    //                        var tense_object = word[tense_name + '_tense'];
    //
    //                        if (!jQuery.isEmptyObject(tense_object)) {
    //                            var tense_statement = 'Word (' + word['spanish_word'] + '): ' + tense_name + ' is available and the ' + tense_name + ' tense value is ' + tense_object;
    //                            //console.log(tense_statement);
    //
    //                            tenseGroup += '<div class="word_tense" style="margin-right: 30px;"><input type="checkbox" name="' + word['spanish_word'] + '_conjugation_tenses" value="'+tense_name+'"> ' + tense_name + ' tense </div>';
    //                        }
    //                    }
    //
    //                    //for (var prop in obj) {
    //                    //   // important check that this is objects own property
    //                    //   // not from prototype prop inherited
    //                    //   if(obj.hasOwnProperty(prop)){
    //                    //     console.log(prop + " = " + obj[prop]);
    //                    //   }
    //                    //}
    //                    tenseGroup += '</div>';
    //                    tenseGroup += '</div>';
    //
    //                    chooseTensesDiv.append(tenseGroup);
    //                }
    //
    //                chooseWordsDiv.fadeOut(250, function () {
    //                    form.prev('h2').html('Choose the tenses to be quizzed on');
    //                    $('.quiz-step-1').off("click");
    //                    submit_btn.val('Choose Tenses').removeClass('quiz-step-1').addClass('quiz-step-2');
    //                    chooseTensesDiv.fadeIn(100);
    //                });
    //            }
    //        });
    //    }
    //
    //    if(submit_btn.hasClass('quiz-step-2')) {
    //        //alert('Step 2 Clicked');
    //
    //        console.log(chosen_words);
    //        //console.log(form.find('#choose_tenses').serializeArray());
    //        chooseTensesDiv.find('input:checked').map(function() {
    //            console.log($( this ).val());
    //        });
    //    }
    //
    //    //console.log(form.serialize());
    //    //alert('submitted');
    //});







})();
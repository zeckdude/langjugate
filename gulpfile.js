// Global Variables
var app_dir = 'app/';

var styl_dir = 'src/styl/';
var js_dir = 'src/js/';
var vendor_dir = 'src/vendor/';
var images_src_dir = 'src/images/';

var css_output_dir = 'public/css/';
var js_output_dir = 'public/js/';
var images_output_dir = 'public/images/';


// Gulp Dependencies
var gulp  = require('gulp'), // Enable Gulp
    stylus = require('gulp-stylus'), // Compile stylus files into CSS
    autoprefixer = require('gulp-autoprefixer'), // Add browser-specific prefixes to CSS3 rules
    minifycss = require('gulp-minify-css'), // Minify CSS
    rename = require('gulp-rename'), // Rename the outputted file
    notify = require('gulp-notify'), // Output a growl notification to the computer window when the task is complete
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    gutil = require('gulp-util'),
    livereload = require('gulp-livereload'),
    changed = require('gulp-changed'),
    phpunit = require('gulp-phpunit'),
    phplint = require('phplint'),
    streamqueue = require('streamqueue'),
    order = require('gulp-order'),
    del = require('del'); // Delete the contents of the build folders before running the tasks


//Clean out the build folders before running any tasks
gulp.task('clean', function(cb) {
    del([
        css_output_dir + 'app.css', // Delete everything inside the compiled `css` folder
        js_output_dir + 'app.js'   // Delete everything inside the compiled `js` folder
    ], cb);
});


//gulp.task('styles', function() {
//    var stream = streamqueue({ objectMode: true });
//
//    // file to add at the beginning of the generated css file
//    //stream.queue(
//    //    gulp.src(styl_dir + 'vendor/normalize.css')
//    //);
//
//    // adding the remaining css files
//    stream.queue(
//        gulp.src(styl_dir + 'vendor/**/*.css')
//    );
//
//    // compile the stylus files
//    stream.queue(
//        gulp.src(styl_dir + 'global/global.styl')
//            .pipe(stylus({linenos: true}).on('error', gutil.log))
//    );
//
//    //concatenate everything into one css file
//    return stream.done()
//        .pipe(concat("app.css"))
//        //.pipe(autoprefixer())
//        //.pipe(changed(css_output_dir))
//        .pipe(gulp.dest(css_output_dir))
//        //.pipe(minifycss())
//        //.pipe(rename({suffix: '.min'}))
//        //.pipe(changed(css_output_dir))
//        //.pipe(gulp.dest(css_output_dir))
//        .pipe(notify({ title: 'Compiled CSS file created', message: 'app.css created using Gulp!' }));
//});


gulp.task('styles', function() {
    var stream = streamqueue({ objectMode: true });

    // 1)First add the bootstrap.css file
    stream.queue(
        gulp.src(vendor_dir + '**/bootstrap.css')
    );

    // 2)Add all of the other css files inside the 'src/vendor/' sub-directories in no particular order, while omitting the theme css files so they can go last
    stream.queue(
        gulp.src([vendor_dir + '**/*.css', '!' + vendor_dir + '**/{theme*,bootstrap}.css', '!' + vendor_dir + 'skins/*.css'])
    );

    // 3)Add the theme.css file
    stream.queue(
        gulp.src(vendor_dir + 'theme/css/theme.css')
    );

    // 4)Add the remaining theme css files, but not theme-responsive.css just yet
    stream.queue(
        gulp.src([vendor_dir + 'theme/**/*.css', '!' + vendor_dir + 'theme/**/{theme,theme-responsive}.css'])
    );

    // 5)Add the theme-responsive.css file
    stream.queue(
        gulp.src(vendor_dir + 'theme/css/theme-responsive.css')
    );

    // 5)Add the default.css file
    stream.queue(
        gulp.src(vendor_dir + 'theme/css/skins/default.css')
    );

    // 6)Compile the stylus files
    stream.queue(
        gulp.src(styl_dir + 'global/global.styl')
            .pipe(stylus({linenos: true}).on('error', gutil.log))
    );

    //concatenate everything into one css file
    return stream.done()
        .pipe(concat("app.css"))
        //.pipe(changed(css_output_dir))
        .pipe(gulp.dest(css_output_dir))
        .pipe(notify({ title: 'Compiled CSS file created', message: 'app.css created using Gulp!' }));
});



gulp.task('scripts', function() {
    var stream = streamqueue({ objectMode: true });

    // 1)First add the jquery.js file
    stream.queue(
        gulp.src([vendor_dir + '**/jquery.js'])
    );

    stream.queue(
        gulp.src([vendor_dir + '**/{jquery.appear,jquery.easing,jquery.cookie}.js'])
    );

    stream.queue(
        gulp.src([vendor_dir + '**/bootstrap.js'])
    );

    stream.queue(
        gulp.src([vendor_dir + '**/{jquery.validate,jquery.stellar,jquery.knob,jquery.gmap,twitter,jquery.isotope,owl.carousel,jflickrfeed,mediaelement-and-player,parsley,underscore,GrowingInput,TextboxList,TextboxList.Autocomplete}.js'])
    );

    //stream.queue(
    //    gulp.src(vendor_dir + '**/{}.js')
    //);

    // 2)Add all of the other js files inside the 'src/vendor/' sub-directories in no particular order
    //stream.queue(
    //    gulp.src([vendor_dir + '**/*.js', '!' + vendor_dir + '**/{jquery,jquery.appear,jquery.easing,jquery.cookie,bootstrap,jquery.validate,jquery.stellar,jquery.knob,jquery.gmap}.js'])
    //);

    // 3)Add the theme.plugins.js file
    stream.queue(
        gulp.src(vendor_dir + 'theme/**/theme.plugins.js')
    );

    // 4)Add the theme.js file
    stream.queue(
        gulp.src(vendor_dir + 'theme/**/theme.js')
    );

    // 5)Add any custom js files
    stream.queue(
        gulp.src(js_dir + '*.js')
    );

    //concatenate everything into one css file
    return stream.done()
        .pipe(concat('app.js'))
        //.pipe(changed(js_output_dir))
        .pipe(gulp.dest(js_output_dir))
        .pipe(notify({ title: 'Compiled JS file created', message: 'app.js created using Gulp!' }));
});




//gulp.task('scripts', function() {
//    var stream = streamqueue({ objectMode: true });
//
//    // file to add at the beginning of the generated css file
//    stream.queue(
//        gulp.src(vendor_dir + 'jquery.js')
//    );
//
//    // adding the remaining js files
//    stream.queue(
//        gulp.src([vendor_dir + '**/*.js'], '!functions.js')
//    );
//
//    //add the functions.js file at the end
//    stream.queue(
//        gulp.src(vendor_dir + 'functions.js')
//    );
//
//    return stream.done()
//        //.pipe(jshint('.jshintrc'))
//        //.pipe(jshint.reporter('default'))
//        .pipe(concat('app.js'))
//        .pipe(changed(js_output_dir))
//        .pipe(gulp.dest(js_output_dir))
//        //.pipe(rename({suffix: '.min'}))
//        //.pipe(uglify())
//        //.pipe(changed(js_output_dir))
//        //.pipe(gulp.dest(js_output_dir))
//        .pipe(notify({ title: 'Compiled JS file created', message: 'app.js created using Gulp!' }));
//});

//gulp.task('images', function() {
//    return gulp.src(images_src_dir + '**/*')
//        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
//        .pipe(gulp.dest(images_public_dir))
//
//        .pipe(notify({ message: 'Images task complete' }));
//});

gulp.task('watch', function() {
    gulp.watch(vendor_dir + '**/*.css', ['styles']); // Watch Stylus and CSS files for changes
    gulp.watch(styl_dir + '**/*.styl', ['styles']); // Watch Stylus and CSS files for changes
    gulp.watch(vendor_dir + '**/*.js', ['scripts']); // Watch JS Files for changes
    gulp.watch(js_dir + '*.js', ['scripts']);
    //gulp.watch(images_src_dir + '**/*', ['images']); // Watch image Files for changes
    //gulp.watch(app_dir + '**/*.php', ['phpunit', 'phplint']); // Watch php Files for changes
});

//gulp.task('phpunit', function() {
//    var options = {debug: false, notify: true};
//    gulp.src(app_dir + '**/*.php')
//        .pipe(phpunit('', options))
//        .on('error', notify.onError({
//            title: "Failed Tests!",
//            message: "Error(s) occurred during phpunit testing..."
//        }));
//});

//gulp.task('phplint', function () {
//    return phplint(app_dir + '**/*.php', {
//        stdout: true
//    });
//});


gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'watch');
});
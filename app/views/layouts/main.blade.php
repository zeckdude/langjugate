<!DOCTYPE html>
<!--[if IE 8]>			<html class="ie ie8"> <![endif]-->
<!--[if IE 9]>			<html class="ie ie9"> <![endif]-->
<!--[if gt IE 9]><!-->	<html> <!--<![endif]-->
	<head>

		<!-- Basic -->
		<meta charset="utf-8">
		<title>@yield('title', 'Page Title') | Langjugate 1.0</title>
		<meta name="keywords" content="HTML5 Template" />
		<meta name="description" content="Porto - Responsive HTML5 Template">
		<meta name="author" content="okler.net">
		<link rel="shortcut icon" href="{{ asset('images/favicon.ico') }}">

		<!-- Mobile Metas -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- Web Fonts  -->
        <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800%7CShadows+Into+Light" rel="stylesheet" type="text/css">
        <link href="http://fonts.googleapis.com/css?family=Oleo+Script" rel="stylesheet" type="text/css">

		<!-- Libs & Theme & Stylus Concatenated CSS -->
        {{ HTML::style('css/app.css') }}

        <!-- Head Libs -->
        {{--{{ HTML::script('js/modernizr.js') }}--}}
        {{ HTML::script('js/jqShim.min.js') }}

        <!--[if IE]>
            {{ HTML::style('css/ie.css') }}
        <![endif]-->

        <!--[if lte IE 8]>
            {{ HTML::script('js/respond.js') }}
        <![endif]-->

        <!-- Libs CSS -->
        {{--<link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.css">--}}
        {{--<link rel="stylesheet" href="vendor/font-awesome/css/font-awesome.css">--}}
        {{--<link rel="stylesheet" href="vendor/owl-carousel/owl.carousel.css" media="screen">--}}
        {{--<link rel="stylesheet" href="vendor/owl-carousel/owl.theme.css" media="screen">--}}
        {{--<link rel="stylesheet" href="vendor/magnific-popup/magnific-popup.css" media="screen">--}}
        {{--<link rel="stylesheet" href="vendor/isotope/jquery.isotope.css" media="screen">--}}
        {{--<link rel="stylesheet" href="vendor/mediaelement/mediaelementplayer.css" media="screen">--}}

        {{--<!-- Theme CSS -->--}}
        {{--<link rel="stylesheet" href="css/theme.css">--}}
        {{--<link rel="stylesheet" href="css/theme-elements.css">--}}
        {{--<link rel="stylesheet" href="css/theme-blog.css">--}}
        {{--<link rel="stylesheet" href="css/theme-shop.css">--}}
        {{--<link rel="stylesheet" href="css/theme-animate.css">--}}

        {{--<!-- Responsive CSS -->--}}
        {{--<link rel="stylesheet" href="css/theme-responsive.css" />--}}

        {{--<!-- Skin CSS -->--}}
        {{--<link rel="stylesheet" href="css/skins/default.css">--}}

        {{--<!-- Custom CSS -->--}}
        {{--<link rel="stylesheet" href="css/custom.css">--}}

        {{--<!-- Head Libs -->--}}
        {{--<script src="vendor/modernizr.js"></script>--}}

        {{--<!--[if IE]>--}}
            {{--<link rel="stylesheet" href="css/ie.css">--}}
        {{--<![endif]-->--}}

        {{--<!--[if lte IE 8]>--}}
            {{--<script src="vendor/respond.js"></script>--}}
        {{--<![endif]-->--}}

        <style>
            .flash {
                display: block;
                position: fixed;
                top: 15px;
                right: 15px;
                z-index: 100;
                /*display: none;*/
                max-width:100%;
                margin-left: 15px;
            }
        </style>

        <script type="text/javascript">
            var globalTenses = [];
            <?php
                foreach (Config::get('globals.tenses') as $tense) { ?>
                      globalTenses.push('<?php echo $tense['name']; ?>');
        <?php   }
            ?>

            //console.log(globalTenses);
        </script>

    </head>
    <body class="{{ SiteHelpers::bodyClass() }}">
        @include('spinner')
        @include('modal')

        <div class="body">
            <header id="header" class="clean-top center">
                <div class="container">
                    <h1 class="logo">
                        <a href="/">
                            <!-- <img alt="Porto" width="111" height="54" data-sticky-width="82" data-sticky-height="40" src="images/logo.png"> -->
                            <strong>Langjugate</strong>
                        </a>
                    </h1>
                    <button class="btn btn-responsive-nav btn-inverse" data-toggle="collapse" data-target=".nav-main-collapse">
                        <i class="icon icon-bars"></i>
                    </button>
                </div>
                <div class="navbar-collapse nav-main-collapse collapse">
                    <div class="container">
                        <nav class="nav-main mega-menu">
                            <ul class="nav nav-pills nav-main" id="mainMenu">
                                <li>
                                    <a href="#">Button</a>
                                </li>
                                <li>
                                    <a href="#">Button</a>
                                </li>
                                <li>
                                    <a href="#">Button</a>
                                </li>
                                <li>
                                    <a href="#">Button</a>
                                </li>
                                <li>
                                    <a href="#">Button</a>
                                </li>
                                <li>
                                    <a href="#">Button</a>
                                </li>
                                <li class="dropdown mega-menu-item mega-menu-signin signin" id="headerAccount">
                                    <a class="dropdown-toggle" href="page-login.html">
                                        <i class="icon icon-user"></i> Sign In
                                        <i class="icon icon-angle-down"></i>
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li>
                                            <div class="mega-menu-content">
                                                <div class="row">
                                                    <div class="col-md-12">

                                                        <div class="signin-form">

                                                            <span class="mega-menu-sub-title">Sign In</span>

                                                            <form action="" id="" type="post">
                                                                <div class="row">
                                                                    <div class="form-group">
                                                                        <div class="col-md-12">
                                                                            <label>Username or E-mail Address</label>
                                                                            <input type="text" value="" class="form-control input-lg">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="form-group">
                                                                        <div class="col-md-12">
                                                                            <a class="pull-right" id="headerRecover" href="#">(Lost Password?)</a>
                                                                            <label>Password</label>
                                                                            <input type="password" value="" class="form-control input-lg">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-md-6">
                                                                        <span class="remember-box checkbox">
                                                                            <label for="rememberme">
                                                                                <input type="checkbox" id="rememberme" name="rememberme">Remember Me
                                                                            </label>
                                                                        </span>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="submit" value="Login" class="btn btn-primary pull-right push-bottom" data-loading-text="Loading...">
                                                                    </div>
                                                                </div>
                                                            </form>

                                                            <p class="sign-up-info">Don't have an account yet? <a href="#" id="headerSignUp">Sign Up!</a></p>

                                                        </div>

                                                        <div class="signup-form">
                                                            <span class="mega-menu-sub-title">Create Account</span>

                                                            <form action="" id="" type="post">
                                                                <div class="row">
                                                                    <div class="form-group">
                                                                        <div class="col-md-12">
                                                                            <label>E-mail Address</label>
                                                                            <input type="text" value="" class="form-control input-lg">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="form-group">
                                                                        <div class="col-md-6">
                                                                            <label>Password</label>
                                                                            <input type="password" value="" class="form-control input-lg">
                                                                        </div>
                                                                        <div class="col-md-6">
                                                                            <label>Re-enter Password</label>
                                                                            <input type="password" value="" class="form-control input-lg">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <input type="submit" value="Create Account" class="btn btn-primary pull-right push-bottom" data-loading-text="Loading...">
                                                                    </div>
                                                                </div>
                                                            </form>

                                                            <p class="log-in-info">Already have an account? <a href="#" id="headerSignIn">Log In!</a></p>
                                                        </div>

                                                        <div class="recover-form">
                                                            <span class="mega-menu-sub-title">Reset My Password</span>
                                                            <p>Complete the form below to receive an email with the authorization code needed to reset your password.</p>

                                                            <form action="" id="" type="post">
                                                                <div class="row">
                                                                    <div class="form-group">
                                                                        <div class="col-md-12">
                                                                            <label>E-mail Address</label>
                                                                            <input type="text" value="" class="form-control input-lg">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <input type="submit" value="Submit" class="btn btn-primary pull-right push-bottom" data-loading-text="Loading...">
                                                                    </div>
                                                                </div>
                                                            </form>

                                                            <p class="log-in-info">Already have an account? <a href="#" id="headerRecoverCancel">Log In!</a></p>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

            <div role="main" class="main">

                <section class="page-top">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <ul class="breadcrumb">
                                    <li><a href="#">Home</a></li>
                                    <li class="active">Pages</li>
                                </ul>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <h2>@yield('title', 'Page Title')</h2>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="container">

                    <div class="row">
                        <div class="col-md-3">
                            <aside class="sidebar">

                                <h4>Choose an Action</h4>
                                <ul class="nav nav-list primary push-bottom">
                                    <li>{{ HTML::linkRoute('quiz.index', 'Quiz Yourself') }}</li>
                                    <li>{{ link_to('term/create', 'Create a New Word') }}</li>
                                    <li>{{ HTML::linkRoute('words.index', 'View All Words') }}</li>
                                </ul>

                                <!-- <div class="tabs">
                                    <ul class="nav nav-tabs">
                                        <li class="active"><a href="#popularPosts" data-toggle="tab"><i class="icon icon-star"></i> Popular</a></li>
                                        <li><a href="#recentPosts" data-toggle="tab">Recent</a></li>
                                    </ul>
                                    <div class="tab-content">
                                        <div class="tab-pane active" id="popularPosts">
                                            <ul class="simple-post-list">
                                                <li>
                                                    <div class="post-image">
                                                        <div class="img-thumbnail">
                                                            <a href="blog-single.html">
                                                                <img src="images/blog/blog-thumb-1.jpg" alt="">
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="post-info">
                                                        <a href="blog-single.html">Nullam Vitae Nibh Un Odiosters</a>
                                                        <div class="post-meta">
                                                             Jan 10, 2013
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="post-image">
                                                        <div class="img-thumbnail">
                                                            <a href="blog-single.html">
                                                                <img src="images/blog/blog-thumb-2.jpg" alt="">
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="post-info">
                                                        <a href="blog-single.html">Vitae Nibh Un Odiosters</a>
                                                        <div class="post-meta">
                                                             Jan 10, 2013
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="post-image">
                                                        <div class="img-thumbnail">
                                                            <a href="blog-single.html">
                                                                <img src="images/blog/blog-thumb-3.jpg" alt="">
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="post-info">
                                                        <a href="blog-single.html">Odiosters Nullam Vitae</a>
                                                        <div class="post-meta">
                                                             Jan 10, 2013
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="tab-pane" id="recentPosts">
                                            <ul class="simple-post-list">
                                                <li>
                                                    <div class="post-image">
                                                        <div class="img-thumbnail">
                                                            <a href="blog-single.html">
                                                                <img src="images/blog/blog-thumb-2.jpg" alt="">
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="post-info">
                                                        <a href="blog-single.html">Vitae Nibh Un Odiosters</a>
                                                        <div class="post-meta">
                                                             Jan 10, 2013
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="post-image">
                                                        <div class="img-thumbnail">
                                                            <a href="blog-single.html">
                                                                <img src="images/blog/blog-thumb-3.jpg" alt="">
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="post-info">
                                                        <a href="blog-single.html">Odiosters Nullam Vitae</a>
                                                        <div class="post-meta">
                                                             Jan 10, 2013
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="post-image">
                                                        <div class="img-thumbnail">
                                                            <a href="blog-single.html">
                                                                <img src="images/blog/blog-thumb-1.jpg" alt="">
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="post-info">
                                                        <a href="blog-single.html">Nullam Vitae Nibh Un Odiosters</a>
                                                        <div class="post-meta">
                                                             Jan 10, 2013
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div> -->

                                {{--<hr />--}}

                                {{--<h4>About Us</h4>--}}
                                {{--<p>Nulla nunc dui, tristique in semper vel, congue sed ligula. Nam dolor ligula, faucibus id sodales in, auctor fringilla libero. Nulla nunc dui, tristique in semper vel. Nam dolor ligula, faucibus id sodales in, auctor fringilla libero. </p>--}}

                            </aside>
                        </div>
                        <div class="col-md-9">
                            @yield('content')
                        </div>

                    </div>

                </div>

            </div>

            <footer class="short" id="footer">
                <div class="container">
                    <div class="row">
                        <div class="footer-ribbon">
                            <span>See you mañana!</span>
                        </div>
                        <div class="col-md-8">
                            <h4>About Langjugate</h4>
                            <p>Langjugate is a quick and easy tool developed by Chris Seckler, mainly as a study aid to help him learn Spanish faster and to be able to quiz himself in an efficient and tracked manner. If you find it useful or have any suggestions, please send him a line at {{ HTML::mailto('langjugate@gmail.com', 'langjugate@gmail.com') }}.</p>
                            <hr class="light">
                        </div>
                        {{--<div class="col-md-3 col-md-offset-1">--}}
                            {{--<h5 class="short">Contact Us</h5>--}}
                            {{--<span class="phone">(800) 123-4567</span>--}}
                            {{--<p class="short">International: (333) 456-6670</p>--}}
                            {{--<p class="short">Fax: (222) 531-8999</p>--}}
                            {{--<ul class="list icons list-unstyled">--}}
                                {{--<li><i class="icon icon-envelope"></i> <a href="mailto:okler@okler.net">okler@okler.net</a></li>--}}
                            {{--</ul>--}}
                            {{--<div class="social-icons">--}}
                                {{--<ul class="social-icons">--}}
                                    {{--<li class="facebook"><a href="http://www.facebook.com/" target="_blank" data-placement="bottom" rel="tooltip" title="Facebook">Facebook</a></li>--}}
                                    {{--<li class="twitter"><a href="http://www.twitter.com/" target="_blank" data-placement="bottom" rel="tooltip" title="Twitter">Twitter</a></li>--}}
                                    {{--<li class="linkedin"><a href="http://www.linkedin.com/" target="_blank" data-placement="bottom" rel="tooltip" title="Linkedin">Linkedin</a></li>--}}
                                {{--</ul>--}}
                            {{--</div>--}}
                        {{--</div>--}}
                    </div>
                </div>
                <div class="footer-copyright">
                    <div class="container">
                        <div class="row">
                            {{--<div class="col-md-1">--}}
                                {{--<a href="index.html" class="logo">--}}
                                    {{--<img alt="Porto Website Template" class="img-responsive" src="images/logo-footer.png">--}}
                                {{--</a>--}}
                            {{--</div>--}}
                            <div class="col-md-11">
                                <p>© Copyright 2014. All Rights Reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>


        <!--    This is a way to link to a javascript or css file(HTML::style) and its absolute location-->
        {{ HTML::script('js/app.js') }}

        <!-- Libs -->
        {{--<script src="vendor/jquery.js"></script>--}}
        {{--<script src="vendor/jquery.appear.js"></script>--}}
        {{--<script src="vendor/jquery.easing.js"></script>--}}
        {{--<script src="vendor/jquery.cookie.js"></script>--}}
        {{--<script src="vendor/bootstrap/js/bootstrap.js"></script>--}}
        {{--<script src="vendor/jquery.validate.js"></script>--}}
        {{--<script src="vendor/jquery.stellar.js"></script>--}}
        {{--<script src="vendor/jquery.knob.js"></script>--}}
        {{--<script src="vendor/jquery.gmap.js"></script>--}}
        {{--<script src="vendor/twitterjs/twitter.js"></script>--}}
        {{--<script src="vendor/isotope/jquery.isotope.js"></script>--}}
        {{--<script src="vendor/owl-carousel/owl.carousel.js"></script>--}}
        {{--<script src="vendor/jflickrfeed/jflickrfeed.js"></script>--}}
        {{--<script src="vendor/magnific-popup/magnific-popup.js"></script>--}}
        {{--<script src="vendor/mediaelement/mediaelement-and-player.js"></script>--}}

        <!-- Theme Initializer -->
        {{--<script src="js/theme.plugins.js"></script>--}}
        {{--<script src="js/theme.js"></script>--}}
        {{----}}
        {{--<!-- Custom JS -->--}}
        {{--<script src="js/custom.js"></script>--}}

        <!-- Google Analytics: Change UA-XXXXX-X to be your site's ID. Go to http://www.google.com/analytics/ for more information.
        <script type="text/javascript">

            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', 'UA-12345678-1']);
            _gaq.push(['_trackPageview']);

            (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
            })();

        </script>
         -->

    </body>
</html>
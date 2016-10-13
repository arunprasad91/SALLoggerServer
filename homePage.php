<!DOCTYPE html>
<html lang="en-us">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Logger</title>

        <!-- Load fonts -->
        <link href='http://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>
        <link href='http://fonts.googleapis.com/css?family=Lora' rel='stylesheet' type='text/css'>

        <!-- Load css styles -->
        <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
        <link rel="stylesheet" type="text/css" href="css/font-awesome.css" />
        <link rel="stylesheet" type="text/css" href="css/style.css" />
        <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/prettify/r224/prettify.min.css">
        <link rel="stylesheet" href="css/morris.css">

        <link rel="stylesheet" href="css/styleHomePage.css">

    </head>
    <body>
<!--        <div class="jumbotron home home-fullscreen" id="home">
            <div class="mask"></div>
            <a href="" class="menu-toggle" id="nav-expander"><i class="fa fa-bars"></i></a>
             Offsite navigation 
            <nav class="menu">
                <a href="#" class="close"><i class="fa fa-close"></i></a>
                <h3>Menu</h3>
                <ul class="nav">
                    <li><a data-scroll href="#home">Home</a></li>				
                </ul>			
            </nav>
            <div class="container">
                <div class="header-info">
                    <h1>Logger</h1>
                    <p id="hello" class="hidden">Annyang!</p>
                    <p>
                        Simple Ambient Logger
                    </p>
                    <a href="#" class="btn btn-primary">Say 'Hello'</a>
                </div>
            </div>
        </div>-->
        <!-- Services section start -->
        <section id="services">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="service-item">
<!--                            <a href="#" class="btn btn-primary">Say 'Log.. task name' OR 'Log.. task number'</a>
                            <div class="icon"><i class="fa fa-diamond"></i></div>-->
                            <h3 id="message">Logger</h3>
                            <h3 id="message2"></h3>
                        </div>
                    </div>				
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div id="loading">
                            <img src="img/loading.gif" alt=""/>
                        </div>
                        <div id="countdownTimer">
                            <h3 id="countdownHeader">Countdown Clock</h3>
                            <div id="clockdiv">
                                <div>
                                    <span class="minutes"></span>
                                    <div class="smalltext">Minutes</div>
                                </div>
                                <div>
                                    <span class="seconds"></span>
                                    <div class="smalltext">Seconds</div>
                                </div>
                            </div>
                        </div>
                        <div id="visualization"></div>
                    </div>				
                </div>
            </div>
        </section>
        <!-- Services section end -->
        <!-- Footer start -->
        <!--        <footer>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-8">
        
                            </div>
                            <div class="col-md-4">
        
                            </div>
                        </div>
                    </div>
                </footer>-->

        <div id="overlay">
            <img src="img/loading.gif" alt=""/>      
        </div>
        <!-- Footer end  -->

        <script src="//cdnjs.cloudflare.com/ajax/libs/annyang/2.4.0/annyang.min.js"></script>

        <!-- Load jQuery -->
        <!--<script type="text/javascript" src="js/jquery-1.11.2.min.js"></script>-->
        <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>

        <!-- Load Booststrap -->
        <script type="text/javascript" src="js/bootstrap.js"></script>

        <script type="text/javascript" src="js/smooth-scroll.js"></script>

        <!-- Load custom js for theme -->
        <script type="text/javascript" src="js/app.js"></script>    

        <!-- Annyang Config -->
        <script type="text/javascript" src="js/annyangConfig.js"></script>

        <script src='https://code.responsivevoice.org/responsivevoice.js'></script>

        <script src="http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.2/raphael-min.js"></script>

        <script src="http://cdnjs.cloudflare.com/ajax/libs/prettify/r224/prettify.min.js"></script>

        <!--Morris Graphs-->
        <script src="js/morris.js"></script>

        <!--Graphs Initialization-->
        <script type="text/javascript" src="js/homePage.js"></script>


    </body>
</html>
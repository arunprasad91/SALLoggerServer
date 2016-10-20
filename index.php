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

        <link rel="stylesheet" href="css/styleHomePage.css">
        <link rel="stylesheet" href="css/index.css">

    </head>
    <body>
        <section id="services">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="service-item">
                            <h3 id="message">Logger</h3>
                            <h3 id="message2"></h3>
                            <div id="content" style="display: none;">
                                <div class="row">
                                    <label>Logger User ID</label><input type="text" id="loggerUserID" class="textInput" required>
                                </div>
                                <div class="row" style="display: none;">
                                    <label>Logger ID</label><input type="text" id="loggerID" class="textInput" value="loggerinfo2" required>
                                </div>
                                <div class="row">
                                    <label>Logger Name</label><input type="text" id="loggerName" class="textInput" required> 
                                </div>
                                <div class="row">
                                    <input type="button" id="submit" class="button" value="Submit">
                                </div>
                            </div>
                        </div>
                    </div>				
                </div>
            </div>
        </section>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>

        <script src="js/index.js"></script>

    </body>
</html>
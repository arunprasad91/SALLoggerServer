$(document).ready(function () {

    var qsParm = new Array();

    function qs() {
        var query = window.location.search.substring(1);
        var parms = query.split('&');
        for (var i = 0; i < parms.length; i++) {
            var pos = parms[i].indexOf('=');
            if (pos > 0) {
                var key = parms[i].substring(0, pos);
                var val = parms[i].substring(pos + 1);
                qsParm[key] = val;
            }
        }
    }

    qs();

    var store = [];
    var oldf = console.log;
    console.log = function () {
//        store.push(arguments);
        var utter = arguments[0].toString();

        var toCheck = "Speech recognized:";
        var separator = ": %c";

        if (utter.indexOf(toCheck) !== -1) {
            var word = utter.substring(utter.indexOf(separator) + 4);
//            alert(word);
            $("#message").html("<p>You said.. " + word + "</p>");
        }
        oldf.apply(console, arguments);
    }


    var parsedGoalId = qsParm['id'];
    var parsedTask = qsParm['task'];
    var parsedTarget = qsParm['target'];
    parsedTask = parsedTask.replace(/%20/g, " ");

//    var historyarr = {
//        function: 'getHistory',
//        userId: '1',
//        goalId: parsedGoalId
//    };

    responsiveVoice.setDefaultVoice("US English Female")

    var color1 = ['#f44336', '#3F51B5', '#4CAF50'];
    var color2 = ['#ffcdd2', '#C5CAE9', '#C8E6C9'];


    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    if (getCookie('SALLogger') == 'TRUE') {
        var loggeruserid = getCookie('loggeruserid');
        var loggerid = getCookie('loggerid');
        var loggername = getCookie('loggername');
    }

//    var loggeruserid = "u20";
//    var loggerid = "loggerinfo2";
//    var loggername = "mylogger1";

    $.ajax({
        url: 'http://belos.it.usyd.edu.au:1234/code/' + loggeruserid + '/show/history/' + loggername + '/' + parsedTask,
        type: 'GET',
//        data: JSON.stringify(historyarr),
        dataType: 'json',
        beforeSend: function () {
            $('#loading').css('display', 'inline-block');
        },
        error: function (jqXHR, textStatus) {
            if (textStatus === 'timeout')
            {
                $('#visualization').append('<div>Connection timed out!</div>')
            } else {
                $('#visualization').html('<p>Connection Error!</p>')
            }
        },
        success: function (msg) {
            $('#loading').css('display', 'none');
//            $.each(msg, function (index, element) {
            var history = msg.HISTORY;
            var total = history.length;
//                alert("Goal ID: " + element.goalId + "\nGoal Title: " + element.goalTitle + "\nExpected Count: " + element.expectedCount);
            var sample = '0';

            $("#visualization").empty();
            $("#visualization").append("<div class='graphVisualizationHistory' id='task-" + parsedGoalId + "'></div>");
            var set = "Morris.Area({"
                    + "element: 'task-" + parsedGoalId + "',"
//                        + "colors: ['" + color1[index] + "', '" + color2[index] + "'],"
                    + "data: [";

            var title = "";

            var statementArray = [];

            $.each(history, function (index, element) {
                var total = history.length;
                var presentIndex = index + 1;

                var date = element.DATE;
//                var newdate = new Date(date);
                var newdate = date.split("/").join("-");

                title = parsedTask;
                if (index == total - 1) {
                    set = set + "{ y: '" + newdate + "', a: " + element.COUNT + "}";
                } else {
                    set = set + "{ y: '" + newdate + "', a: " + element.COUNT + "},";
                }
            });

            set = set + "],"
                    + "xkey: 'y',"
                    + "ykeys: ['a'],"
                    + "lineColors: ['#2E7D32'],"
//                    + "eventLineColors: ['ffffff'],"
                    + "goals: [" + parsedTarget + "],"
                    + "goalLineColors: ['#4CAF50'],"
                    + "goalStrokeWidth: 5,"
                    + "labels: ['Count for Task " + title + "'],"
                    + "xLabelFormat: function(x) {"
                    + "var IndexToMonth = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];"
                    + "var month = IndexToMonth[ x.getMonth() ];"
                    + "var year = x.getFullYear();"
                    + "var day = x.getDate() + 1;"
                    + "if(day >= 31)"
                    + "day = 31;"
                    + "return day + ' ' + month;"
                    + "}"
                    + "});";

            $('#task-' + parsedGoalId).empty();
            eval(set);
            prettyPrint();

            $('#message').html('<p>History for "' + title + '"</p>');

            var speech = "history for task, " + title;

//            });

            var speak = function () {
                responsiveVoice.speak(speech);
            }

            annyang.pause();
            setTimeout(speak, 1000);
            annyang.resume();

            $('path').css('stroke', 'ffffff');
        }
    });

    if (annyang) {
        var goback = function () {
            window.location = 'homePage.php';
        }

        var commands = {
            'back': goback,
            'go back': goback,
        };

        annyang.debug([newState = true]);
        annyang.addCommands(commands);

        annyang.setLanguage('en-IN');

        annyang.start({continuous: false});
    } else {
        $('#home').fadeIn('fast');
    }

});


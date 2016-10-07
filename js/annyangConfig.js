$(document).ready(function () {

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

    var arr = {
        function: 'getGoalsForUser',
        userId: '1'
    };

    var goals = [];
    var commandStatement = [];
    responsiveVoice.setDefaultVoice("US English Female");

    var color1 = ['#f44336', '#FFC107', '#4CAF50'];
//    var color2 = ['#ef9a9a', '#FFE082', '#A5D6A7'];
    var color2 = ['#212121', '#212121', '#212121'];

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    var loggeruserid = "u20";
    var loggerid = "loggerinfo2";
    var loggername = "mylogger1";
    
    var cancelTimer = false;


    $.ajax({
//        url: 'http://belos.it.usyd.edu.au:1234/code/u20/show/loggerinfo2/testlogger',
        url: 'http://belos.it.usyd.edu.au:1234/code/' + loggeruserid + '/show/' + loggerid + '/' + loggername,
        type: 'GET',
//        data: JSON.stringify(arr),
        dataType: 'json',
        success: function (msg) {
            var goals = msg.GOALS;
            if (annyang) {

                var hello = function () {
                    scrollTo("#services");
                };

                var logActivity = function (number) {
                    //                alert("Goal ID: " + element.goalId + "\nGoal Title: " + element.goalTitle + "\nExpected Count: " + element.expectedCount + "\nActual Count: " + element.actualCount );
                    $.each(goals, function (index, element) {

                        var presentIndex = index + 1;

                        if (parseInt(number) == presentIndex) {

                            var todo = 0;

                            if (element.TYPE == 'countdowntimer') {

                                var timeMessage = element.TIMER;
                                var time = timeMessage.split(':');

                                $('#countdownTimer').css('display', 'inline-block');
                                annyang.pause();
                                function getTimeRemaining(endtime) {
                                    var t = Date.parse(endtime) - Date.parse(new Date());
                                    var seconds = Math.floor((t / 1000) % 60);
                                    var minutes = Math.floor((t / 1000 / 60) % 60);
                                    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);

                                    return {
                                        'total': t,
                                        'minutes': minutes,
                                        'seconds': seconds
                                    };
                                }


                                function initializeClock(id, endtime) {
                                    var clock = document.getElementById(id);
                                    var minutesSpan = clock.querySelector('.minutes');
                                    var secondsSpan = clock.querySelector('.seconds');

                                    var setTimerCommand = false;
                                    var exitFunction = false;


                                    function updateClock() {

                                        if (cancelTimer == true) {
                                            $('#countdownTimer').css('display', 'none');
                                            clearInterval(timeinterval);
                                            cancelTimer = false;
                                            var toSpeak = "task " + element.ID + ", cancelled";
                                            responsiveVoice.speak(toSpeak);
                                        }

                                        var t = getTimeRemaining(endtime);

                                        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
                                        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

                                        if (t.total <= 0) {
                                            clearInterval(timeinterval);
                                            annyang.resume();
                                            $('#countdownTimer').css('display', 'none');

                                            $.ajax({
                                                url: 'http://belos.it.usyd.edu.au:1234/code/' + loggeruserid + '/' + loggername + '/log/' + element.TITLE + '=done',
                                                type: 'GET',
                                                dataType: 'text',
                                                success: function (msgStatus) {
                                                    if (msgStatus == 'ok') {

                                                        $.ajax({
//                                                            url: 'http://belos.it.usyd.edu.au:1234/code/u20/show/loggerinfo2/testlogger',
                                                            url: 'http://belos.it.usyd.edu.au:1234/code/' + loggeruserid + '/show/' + loggerid + '/' + loggername,
                                                            type: 'GET',
                                                            dataType: 'json',
                                                            beforeSend: function () {
                                                                $('#overlay').css('display', 'block');
                                                            },
                                                            success: function (msg) {
                                                                $('#overlay').css('display', 'none');
                                                                var newGoals = msg.GOALS;

                                                                $.each(newGoals, function (index, element) {

                                                                    var newPresentIndex = index + 1;
                                                                    if (parseInt(number) == newPresentIndex) {

                                                                        var total = newGoals.length;

//                                            $.each(msg, function (index, element) {

                                                                        var percentage = parseFloat(parseInt(element.TODAYCOUNT, 10) * 100) / parseInt(element.TARGET, 10);
                                                                        var set = "Morris.Donut({"
                                                                                + "element: 'task-" + presentIndex + "',";
                                                                        if (percentage < 30)
                                                                            set = set + "colors: ['" + color1[0] + "', '" + color2[0] + "'],";
                                                                        else if (percentage > 30 && percentage < 70)
                                                                            set = set + "colors: ['" + color1[1] + "', '" + color2[1] + "'],";
                                                                        else if (percentage > 70)
                                                                            set = set + "colors: ['" + color1[2] + "', '" + color2[3] + "'],";
                                                                        set = set + "data: [";

                                                                        set = set + "{value: " + element.TODAYCOUNT + ",label: 'Task " + presentIndex + "\\n" + element.TITLE + "', labelColor: '#ffffff', formatted: '\\n" + element.TODAYCOUNT + "/" + element.TARGET + "'" + "},";

                                                                        var rest = 0;
                                                                        if (parseInt(element.TODAYCOUNT) < parseInt(element.TARGET))
                                                                            rest = parseInt(element.TARGET) - parseInt(element.TODAYCOUNT);

                                                                        set = set + "{value: " + rest + ",label: 'Task " + presentIndex + "\\n" + element.TITLE + "', labelColor: '#ffffff', formatted: '\\n" + element.TODAYCOUNT + "/" + element.TARGET + "'" + "}";
                                                                        set = set + "],"
                                                                                + "formatter: function (x, data) { return data.formatted; }"
                                                                                + "});";

                                                                        $('#task-' + presentIndex).empty();
                                                                        eval(set);
                                                                        prettyPrint();

                                                                        annyang.pause();
                                                                        var toSpeak = "task " + element.ID + ", successfully logged";
                                                                        responsiveVoice.speak(toSpeak);
                                                                        annyang.resume();
//                                            });
                                                                    }
                                                                });

                                                            }
                                                        });

                                                    }
                                                }
                                            });
                                        }
                                    }

                                    updateClock();
                                    var timeinterval = setInterval(updateClock, 1000);
                                }

//                                var deadline = new Date(Date.parse(new Date()) + 01 * 10 * 1000);
                                var deadline = new Date(Date.parse(new Date()) + (time[0] + 1) * time[1] * 1000);
                                initializeClock('clockdiv', deadline);
                            } else if (element.TYPE == 'tap') {
                                $.ajax({
                                    url: 'http://belos.it.usyd.edu.au:1234/code/' + loggeruserid + '/' + loggername + '/log/' + element.TITLE + '=done',
                                    type: 'GET',
                                    dataType: 'text',
                                    success: function (msgStatus) {
                                        if (msgStatus == 'ok') {

                                            $.ajax({
//                                                url: 'http://belos.it.usyd.edu.au:1234/code/u20/show/loggerinfo2/testlogger',
                                                url: 'http://belos.it.usyd.edu.au:1234/code/' + loggeruserid + '/show/' + loggerid + '/' + loggername,
                                                type: 'GET',
                                                dataType: 'json',
                                                beforeSend: function () {
                                                    $('#overlay').css('display', 'block');
                                                },
                                                success: function (msg) {
                                                    $('#overlay').css('display', 'none');
                                                    var newGoals = msg.GOALS;

                                                    $.each(newGoals, function (index, element) {

                                                        var newPresentIndex = index + 1;
                                                        if (parseInt(number) == newPresentIndex) {

                                                            var total = newGoals.length;

//                                            $.each(msg, function (index, element) {

                                                            var percentage = parseFloat(parseInt(element.TODAYCOUNT, 10) * 100) / parseInt(element.TARGET, 10);
                                                            var set = "Morris.Donut({"
                                                                    + "element: 'task-" + presentIndex + "',";
                                                            if (percentage < 30)
                                                                set = set + "colors: ['" + color1[0] + "', '" + color2[0] + "'],";
                                                            else if (percentage > 30 && percentage < 70)
                                                                set = set + "colors: ['" + color1[1] + "', '" + color2[1] + "'],";
                                                            else if (percentage > 70)
                                                                set = set + "colors: ['" + color1[2] + "', '" + color2[3] + "'],";
                                                            set = set + "data: [";

                                                            set = set + "{value: " + element.TODAYCOUNT + ",label: 'Task " + presentIndex + "\\n" + element.TITLE + "', labelColor: '#ffffff', formatted: '\\n" + element.TODAYCOUNT + "/" + element.TARGET + "'" + "},";

                                                            var rest = 0;
                                                            if (parseInt(element.TODAYCOUNT) < parseInt(element.TARGET))
                                                                rest = parseInt(element.TARGET) - parseInt(element.TODAYCOUNT);

                                                            set = set + "{value: " + rest + ",label: 'Task " + presentIndex + "\\n" + element.TITLE + "', labelColor: '#ffffff', formatted: '\\n" + element.TODAYCOUNT + "/" + element.TARGET + "'" + "}";
                                                            set = set + "],"
                                                                    + "formatter: function (x, data) { return data.formatted; }"
                                                                    + "});";

                                                            $('#task-' + presentIndex).empty();
                                                            eval(set);
                                                            prettyPrint();

                                                            annyang.pause();
                                                            var toSpeak = "task " + element.ID + ", successfully logged";
                                                            responsiveVoice.speak(toSpeak);
                                                            annyang.resume();
//                                            });
                                                        }
                                                    });

                                                }
                                            });

                                        }
                                    }
                                });
                            }
                        }
                    });
                }

                var logActivity2 = function (task) {
                    //                alert("Goal ID: " + element.goalId + "\nGoal Title: " + element.goalTitle + "\nExpected Count: " + element.expectedCount + "\nActual Count: " + element.actualCount );
                    $.each(goals, function (index, element) {

                        var presentIndex = index + 1;

                        if ((task).toLowerCase() == (element.TITLE).toLowerCase()) {

                            if (element.TYPE == 'countdowntimer') {
                                annyang.pause();


                                var timeMessage = element.TIMER;
                                var time = timeMessage.split(':');

                                $('#countdownTimer').css('display', 'inline-block');
                                function getTimeRemaining(endtime) {
                                    var t = Date.parse(endtime) - Date.parse(new Date());
                                    var seconds = Math.floor((t / 1000) % 60);
                                    var minutes = Math.floor((t / 1000 / 60) % 60);
                                    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
                                    return {
                                        'total': t,
                                        'minutes': minutes,
                                        'seconds': seconds
                                    };
                                }



                                function initializeClock(id, endtime) {
                                    var clock = document.getElementById(id);
                                    var minutesSpan = clock.querySelector('.minutes');
                                    var secondsSpan = clock.querySelector('.seconds');

                                    var setTimerCommand = false;
                                    var exitFunction = false;

                                    function updateClock() {

                                        if (cancelTimer == true) {
                                            $('#countdownTimer').css('display', 'none');
                                            clearInterval(timeinterval);
                                            var toSpeak = "task " + element.ID + ", cancelled";
                                            responsiveVoice.speak(toSpeak);
                                        }

                                        var t = getTimeRemaining(endtime);

                                        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
                                        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

                                        if (t.total <= 0) {
                                            clearInterval(timeinterval);
                                            $('#countdownTimer').css('display', 'none');
                                            annyang.resume();

                                            $.ajax({
                                                url: 'http://belos.it.usyd.edu.au:1234/code/' + loggeruserid + '/' + loggername + '/log/' + element.TITLE + '=done',
                                                type: 'GET',
                                                dataType: 'text',
                                                success: function (msgStatus) {

                                                    if (msgStatus == 'ok') {

                                                        $.ajax({
//                                                            url: 'http://belos.it.usyd.edu.au:1234/code/u20/show/loggerinfo2/testlogger',
                                                            url: 'http://belos.it.usyd.edu.au:1234/code/' + loggeruserid + '/show/' + loggerid + '/' + loggername,
                                                            type: 'GET',
                                                            dataType: 'json',
                                                            beforeSend: function () {
                                                                $('#overlay').css('display', 'block');
                                                            },
                                                            success: function (msg) {
                                                                $('#overlay').css('display', 'none');
                                                                var newGoals = msg.GOALS;

                                                                $.each(newGoals, function (index, element) {
                                                                    var total = newGoals.length;
                                                                    if ((task).toLowerCase() == (element.TITLE).toLowerCase()) {
//                                            $.each(msg, function (index, element) {

                                                                        var percentage = parseFloat(parseInt(element.TODAYCOUNT, 10) * 100) / parseInt(element.TARGET, 10);
                                                                        var set = "Morris.Donut({"
                                                                                + "element: 'task-" + presentIndex + "',";
                                                                        if (percentage < 30)
                                                                            set = set + "colors: ['" + color1[0] + "', '" + color2[0] + "'],";
                                                                        else if (percentage > 30 && percentage < 70)
                                                                            set = set + "colors: ['" + color1[1] + "', '" + color2[1] + "'],";
                                                                        else if (percentage > 70)
                                                                            set = set + "colors: ['" + color1[2] + "', '" + color2[3] + "'],";
                                                                        set = set + "data: [";

                                                                        set = set + "{value: " + element.TODAYCOUNT + ",label: 'Task " + presentIndex + "\\n" + element.TITLE + "', labelColor: '#ffffff', formatted: '\\n" + element.TODAYCOUNT + "/" + element.TARGET + "'" + "},";

                                                                        var rest = 0;
                                                                        if (parseInt(element.TODAYCOUNT) < parseInt(element.TARGET))
                                                                            rest = parseInt(element.TARGET) - parseInt(element.TODAYCOUNT);

                                                                        set = set + "{value: " + rest + ",label: 'Task " + presentIndex + "\\n" + element.TITLE + "', labelColor: '#ffffff', formatted: '\\n" + element.TODAYCOUNT + "/" + element.TARGET + "'" + "}";
                                                                        set = set + "],"
                                                                                + "formatter: function (x, data) { return data.formatted; }"
                                                                                + "});";

                                                                        $('#task-' + presentIndex).empty();
                                                                        eval(set);
                                                                        prettyPrint();

                                                                        annyang.pause();
                                                                        var toSpeak = "task " + element.TITLE + ", successfully logged";
                                                                        responsiveVoice.speak(toSpeak);
                                                                        annyang.resume();
//                                            });
                                                                    }
                                                                });

                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                        }
                                    }

                                    updateClock();
                                    var timeinterval = setInterval(updateClock, 1000);
                                }

                                var deadline = new Date(Date.parse(new Date()) + (time[0] + 1) * time[1] * 1000);
                                initializeClock('clockdiv', deadline);
                            } else if (element.TYPE == 'tap') {
                                $.ajax({
                                    url: 'http://belos.it.usyd.edu.au:1234/code/' + loggeruserid + '/' + loggername + '/log/' + element.TITLE + '=done',
                                    type: 'GET',
                                    dataType: 'text',
                                    success: function (msgStatus) {

                                        if (msgStatus == 'ok') {

                                            $.ajax({
//                                                url: 'http://belos.it.usyd.edu.au:1234/code/u20/show/loggerinfo2/testlogger',
                                                url: 'http://belos.it.usyd.edu.au:1234/code/' + loggeruserid + '/show/' + loggerid + '/' + loggername,
                                                type: 'GET',
                                                dataType: 'json',
                                                beforeSend: function () {
                                                    $('#overlay').css('display', 'block');
                                                },
                                                success: function (msg) {
                                                    $('#overlay').css('display', 'none');
                                                    var newGoals = msg.GOALS;

                                                    $.each(newGoals, function (index, element) {
                                                        var total = newGoals.length;
                                                        if ((task).toLowerCase() == (element.TITLE).toLowerCase()) {
//                                            $.each(msg, function (index, element) {

                                                            var percentage = parseFloat(parseInt(element.TODAYCOUNT, 10) * 100) / parseInt(element.TARGET, 10);
                                                            var set = "Morris.Donut({"
                                                                    + "element: 'task-" + presentIndex + "',";
                                                            if (percentage < 30)
                                                                set = set + "colors: ['" + color1[0] + "', '" + color2[0] + "'],";
                                                            else if (percentage > 30 && percentage < 70)
                                                                set = set + "colors: ['" + color1[1] + "', '" + color2[1] + "'],";
                                                            else if (percentage > 70)
                                                                set = set + "colors: ['" + color1[2] + "', '" + color2[3] + "'],";
                                                            set = set + "data: [";

                                                            set = set + "{value: " + element.TODAYCOUNT + ",label: 'Task " + presentIndex + "\\n" + element.TITLE + "', labelColor: '#ffffff', formatted: '\\n" + element.TODAYCOUNT + "/" + element.TARGET + "'" + "},";

                                                            var rest = 0;
                                                            if (parseInt(element.TODAYCOUNT) < parseInt(element.TARGET))
                                                                rest = parseInt(element.TARGET) - parseInt(element.TODAYCOUNT);

                                                            set = set + "{value: " + rest + ",label: 'Task " + presentIndex + "\\n" + element.TITLE + "', labelColor: '#ffffff', formatted: '\\n" + element.TODAYCOUNT + "/" + element.TARGET + "'" + "}";
                                                            set = set + "],"
                                                                    + "formatter: function (x, data) { return data.formatted; }"
                                                                    + "});";

                                                            $('#task-' + presentIndex).empty();
                                                            eval(set);
                                                            prettyPrint();

                                                            annyang.pause();
                                                            var toSpeak = "task " + element.TITLE + ", successfully logged";
                                                            responsiveVoice.speak(toSpeak);
                                                            annyang.resume();
//                                            });
                                                        }
                                                    });

                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    });
                }

                var undoActivity1 = function (number) {
                    //                alert("Goal ID: " + element.goalId + "\nGoal Title: " + element.goalTitle + "\nExpected Count: " + element.expectedCount + "\nActual Count: " + element.actualCount );
                    $.each(goals, function (index, element) {

                        var presentIndex = index + 1;

                        if (parseInt(number) == presentIndex) {
//                            alert(element.goalId);
//                            var undoArray = {
//                                function: 'undoTask',
//                                goalId: element.goalId
//                            };

                            $.ajax({
                                url: 'http://belos.it.usyd.edu.au:1234/code/' + loggeruserid + '/' + loggername + '/log/' + element.TITLE + '=undo',
                                type: 'GET',
                                dataType: 'text',
                                success: function (msgStatus) {

                                    if (msgStatus == 'ok') {

                                        $.ajax({
//                                            url: 'http://belos.it.usyd.edu.au:1234/code/u20/show/loggerinfo2/testlogger',
                                            url: 'http://belos.it.usyd.edu.au:1234/code/' + loggeruserid + '/show/' + loggerid + '/' + loggername,
                                            type: 'GET',
                                            dataType: 'json',
                                            beforeSend: function () {
                                                $('#overlay').css('display', 'block');
                                            },
                                            success: function (msg) {
                                                $('#overlay').css('display', 'none');
                                                var newGoals = msg.GOALS;

                                                $.each(newGoals, function (index, element) {

                                                    var newPresentIndex = index + 1;
                                                    if (parseInt(number) == newPresentIndex) {
                                                        var total = newGoals.length;

//                                            $.each(msg, function (index, element) {

                                                        var percentage = parseFloat(parseInt(element.TODAYCOUNT, 10) * 100) / parseInt(element.TARGET, 10);
                                                        var set = "Morris.Donut({"
                                                                + "element: 'task-" + presentIndex + "',";
                                                        if (percentage < 30)
                                                            set = set + "colors: ['" + color1[0] + "', '" + color2[0] + "'],";
                                                        else if (percentage > 30 && percentage < 70)
                                                            set = set + "colors: ['" + color1[1] + "', '" + color2[1] + "'],";
                                                        else if (percentage > 70)
                                                            set = set + "colors: ['" + color1[2] + "', '" + color2[3] + "'],";
                                                        set = set + "data: [";

                                                        set = set + "{value: " + element.TODAYCOUNT + ",label: 'Task " + presentIndex + "\\n" + element.TITLE + "', labelColor: '#ffffff', formatted: '\\n" + element.TODAYCOUNT + "/" + element.TARGET + "'" + "},";

                                                        var rest = 0;
                                                        if (parseInt(element.TODAYCOUNT) < parseInt(element.TARGET))
                                                            rest = parseInt(element.TARGET) - parseInt(element.TODAYCOUNT);

                                                        set = set + "{value: " + rest + ",label: 'Task " + presentIndex + "\\n" + element.TITLE + "', labelColor: '#ffffff', formatted: '\\n" + element.TODAYCOUNT + "/" + element.TARGET + "'" + "}";
                                                        set = set + "],"
                                                                + "formatter: function (x, data) { return data.formatted; }"
                                                                + "});";

                                                        $('#task-' + presentIndex).empty();
                                                        eval(set);
                                                        prettyPrint();

                                                        annyang.pause();
                                                        var toSpeak = "task " + element.ID + ", undone";
                                                        responsiveVoice.speak(toSpeak);
                                                        annyang.resume();
//                                            });
                                                    }
                                                });

                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                }


                var undoActivity2 = function (task) {
                    //                alert("Goal ID: " + element.goalId + "\nGoal Title: " + element.goalTitle + "\nExpected Count: " + element.expectedCount + "\nActual Count: " + element.actualCount );
                    $.each(goals, function (index, element) {

                        var presentIndex = index + 1;

                        if ((task).toLowerCase() == (element.TITLE).toLowerCase()) {
//                            alert(element.goalId);
//                            var undoArray = {
//                                function: 'undoTask',
//                                goalId: element.goalId
//                            };

                            $.ajax({
                                url: 'http://belos.it.usyd.edu.au:1234/code/' + loggeruserid + '/' + loggername + '/log/' + element.TITLE + '=undo',
                                type: 'GET',
                                dataType: 'text',
                                success: function (msgStatus) {

                                    if (msgStatus == 'ok') {
                                        $.ajax({
//                                            url: 'http://belos.it.usyd.edu.au:1234/code/u20/show/loggerinfo2/testlogger',
                                            url: 'http://belos.it.usyd.edu.au:1234/code/' + loggeruserid + '/show/' + loggerid + '/' + loggername,
                                            type: 'GET',
                                            dataType: 'json',
                                            beforeSend: function () {
                                                $('#overlay').css('display', 'block');
                                            },
                                            success: function (msg) {
                                                $('#overlay').css('display', 'none');
                                                var newGoals = msg.GOALS;

                                                $.each(newGoals, function (index, element) {
                                                    var total = newGoals.length;
                                                    if ((task).toLowerCase() == (element.TITLE).toLowerCase()) {

//                                            $.each(msg, function (index, element) {

                                                        var percentage = parseFloat(parseInt(element.TODAYCOUNT, 10) * 100) / parseInt(element.TARGET, 10);
                                                        var set = "Morris.Donut({"
                                                                + "element: 'task-" + presentIndex + "',";
                                                        if (percentage < 30)
                                                            set = set + "colors: ['" + color1[0] + "', '" + color2[0] + "'],";
                                                        else if (percentage > 30 && percentage < 70)
                                                            set = set + "colors: ['" + color1[1] + "', '" + color2[1] + "'],";
                                                        else if (percentage > 70)
                                                            set = set + "colors: ['" + color1[2] + "', '" + color2[3] + "'],";
                                                        set = set + "data: [";

                                                        set = set + "{value: " + element.TODAYCOUNT + ",label: 'Task " + presentIndex + "\\n" + element.TITLE + "', labelColor: '#ffffff', formatted: '\\n" + element.TODAYCOUNT + "/" + element.TARGET + "'" + "},";

                                                        var rest = 0;
                                                        if (parseInt(element.TODAYCOUNT) < parseInt(element.TARGET))
                                                            rest = parseInt(element.TARGET) - parseInt(element.TODAYCOUNT);

                                                        set = set + "{value: " + rest + ",label: 'Task " + presentIndex + "\\n" + element.TITLE + "', labelColor: '#ffffff', formatted: '\\n" + element.TODAYCOUNT + "/" + element.TARGET + "'" + "}";
                                                        set = set + "],"
                                                                + "formatter: function (x, data) { return data.formatted; }"
                                                                + "});";

                                                        $('#task-' + presentIndex).empty();
                                                        eval(set);
                                                        prettyPrint();

                                                        annyang.pause();
                                                        var toSpeak = "task " + element.TITLE + ", undone";
                                                        responsiveVoice.speak(toSpeak);
                                                        annyang.resume();
//                                            });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                }



                var taskHistory = function (number) {

                    if (isNumber(number)) {

                        var goals = msg.GOALS;

                        $.each(goals, function (index, element) {

                            var presentIndex = index + 1;
                            
                            if (parseInt(number) == presentIndex) {
                                window.location = 'history.php?id=' + presentIndex + '&task=' + element.TITLE + "&target=" + element.TARGET;
                            }
                        });
                    }
                }

                var taskHistory2 = function (task) {

                    var goals = msg.GOALS;

                    $.each(goals, function (index, element) {

                        var presentIndex = index + 1;

                        if (task == (element.TITLE).toLowerCase()) {
                            window.location = 'history.php?id=' + presentIndex + '&task=' + element.TITLE + "&target=" + element.TARGET;
                        }
                    });
                }

                var goback = function () {
                    cancelTimer = true;
                }

                var temporaryCommands = {
                    'go back': goback,
                    'back': goback,
                    'cancel': goback
                };
                
                var commands = {
//                    'hello': hello,
//                    '*speech': showText,
                    'add task :number': logActivity,
                    'log task :number': logActivity,
                    'add *task': logActivity2,
                    'log *task': logActivity2,
                    'undo task :number': undoActivity1,
                    'undo *task': undoActivity2,
                    'task :number history': taskHistory,
                    'history for task :number': taskHistory,
                    'history for *task': taskHistory2
                };

                annyang.debug([newState = true]);
                annyang.addCommands(commands);
                annyang.addCommands(temporaryCommands);

                annyang.setLanguage('en-IN');

                annyang.start({continuous: false});
            } else {
                $('#home').fadeIn('fast');
            }

            var showText = function (speech) {
                $("#message").html("<p>" + speech + "</p>")
            }

            var scrollTo = function (identifier, speed) {
                $('html, body').animate({
                    scrollTop: $(identifier).offset().top
                }, speed || 1000).delay(2000);

                $("#message").html("<p>Hi there!</p>")
                annyang.pause();
                responsiveVoice.speak("hi there");
                annyang.resume();
            }
        }
    });

    function scroll(identifier, speed) {
        identifier = '#services .container';
        $('html, body').animate({
            scrollTop: $(identifier).offset().top
        }, speed || 1000).delay(2000);

        $("#message").html("<p>Hi there!</p>");
        annyang.pause();
        responsiveVoice.speak("hi there");
        annyang.resume();
    }

    setTimeout(scroll, 2000);
});




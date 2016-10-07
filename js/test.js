$(document).ready(function () {

    var arr = {
        function: 'getGoalsForUser',
        userId: '1'
    };

    var color1 = ['#f44336', '#FFC107', '#4CAF50'];
//    var color2 = ['#ef9a9a', '#FFE082', '#A5D6A7'];
    var color2 = ['#212121', '#212121', '#212121'];

    var loggeruserid = "u20";
    var loggerid = "loggerinfo2";
    var loggername = "mylogger1";

    function refreshPage() {

        $.ajax({
            url: 'http://belos.it.usyd.edu.au:1234/code/' + loggeruserid + '/show/' + loggerid + '/' + loggername,
//        url: 'http://belos.it.usyd.edu.au:1234/code/u20/show/loggerinfo2/testlogger',
            type: 'GET',
//        data: JSON.stringify(arr),
            dataType: 'json',
            beforeSend: function () {
                $('#loading').css('display', 'inline-block');
            },
            error: function (jqXHR, textStatus) {
                if (textStatus === 'timeout')
                {
                    $('#message2').html('<p>Connection timed out!</p>');
                } else {
                    $('#message2').html('<p>Connection Error!</p>')
                }
            },
            complete: function () {
//                identifier = '#services .container';
//                identifier = '#visualization';
//                $('html, body').animate({
//                    scrollTop: $(identifier).offset().top
//                }, speed || 1000).delay(2000);
            },
            success: function (msg) {
                $('#loading').css('display', 'none');
                $.each(msg, function (index, element) {
                    var total = msg.length;
//                alert("Goal ID: " + element.ID + "\nGoal Title: " + element.TITLE + "\nExpected Count: " + element.TARGET);
                    var sample = '0';

//                $.each(msg, function (index, element) {

                    var goals = msg.GOALS;
                    $("#visualization").empty();
                    $.each(goals, function (index1, element1) {

                        var presentIndex = index1 + 1;



                        $("#visualization").append("<div class='graphVisualization' id='task-" + presentIndex + "'></div>");

                        var percentage = parseFloat(parseInt(element1.TODAYCOUNT, 10) * 100) / parseInt(element1.TARGET, 10);
                        var set = "Morris.Donut({"
                                + "element: 'task-" + presentIndex + "',";
                        if (percentage < 30)
                            set = set + "colors: ['" + color1[0] + "', '" + color2[0] + "'],";
                        else if (percentage > 30 && percentage < 70)
                            set = set + "colors: ['" + color1[1] + "', '" + color2[1] + "'],";
                        else if (percentage > 70)
                            set = set + "colors: ['" + color1[2] + "', '" + color2[3] + "'],";
                        set = set + "pointStrokeColors: ['000000'],";
                        set = set + "data: [";

////                    if(parseInt(element.TODAYCOUNT) > parseInt(element.TARGET))
////                        set = set + "{value: " + element.TARGET + ",label: 'Task " + presentIndex + " - " + element.TITLE + "', formatted: '" + element.TODAYCOUNT + "'" + "},";
//                    else
                        set = set + "{value: " + element1.TODAYCOUNT + ",label: 'Task " + presentIndex + "\\n" + element1.TITLE + "', labelColor: '#ffffff', formatted: '\\n" + element1.TODAYCOUNT + "/" + element1.TARGET + "'" + "},";

                        var rest = 0;
                        if (parseInt(element1.TODAYCOUNT) < parseInt(element1.TARGET))
                            rest = parseInt(element1.TARGET) - parseInt(element1.TODAYCOUNT);

                        set = set + "{value: " + rest + ",label: 'Task " + presentIndex + "\\n" + element1.TITLE + "', labelColor: '#ffffff', formatted: '\\n" + element1.TODAYCOUNT + "/" + element1.TARGET + "'" + "}";

//                    set = set + "{value: " + element.TARGET + ",label: 'Task " + presentIndex + " - " + element.TITLE + "', formatted: '" + element.TODAYCOUNT + "'" + "}";
                        set = set + "],"
                                + "formatter: function (x, data) { return data.formatted; }"
                                + "});";

                        $('#task-' + presentIndex).empty();
                        eval(set);
                        prettyPrint();

                    });
                });
//            });
            }
//    }),30000);
        });

        setTimeout(refreshPage, 300000);
    }

    refreshPage();

});


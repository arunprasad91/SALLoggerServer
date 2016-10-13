$(document).ready(function () {

    function addCookie(loggerUserID, loggerID, loggerName) {
        var now = new Date();
        var time = now.getTime();
        var expireTime = time + 1000 * 36000;
        now.setTime(expireTime);
        document.cookie = 'SALLogger=TRUE;expires=' + now.toGMTString() + ';path=/';
        document.cookie = 'loggeruserid=' + loggerUserID + ';expires=' + now.toGMTString() + ';path=/';
        document.cookie = 'loggerid=' + loggerID + ';expires=' + now.toGMTString() + ';path=/';
        document.cookie = 'loggername=' + loggerName + ';expires=' + now.toGMTString() + ';path=/';
    }

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
        var loggerUserID = getCookie('loggeruserid');
        var loggerID = getCookie('loggerid');
        var loggerName = getCookie('loggername');

        window.location = 'homePage.php';
    } else {
        $('#content').css('display','inline-block');
    }

    $('#submit').click(function () {
        var loggerUserID = $('#loggerUserID').val();
        var loggerID = $('#loggerID').val();
        var loggerName = $('#loggerName').val();

        if (getCookie('SALLogger') != 'TRUE') {
            addCookie(loggerUserID, loggerID, loggerName);
        }

        window.location = 'homePage.php';
    });


});
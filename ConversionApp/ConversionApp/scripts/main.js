﻿
//adds the menu
$(document).ready(function () {
    var cookie = document.cookie;
    var userIdIndex = cookie.indexOf("userId=");
    var userName = cookie.substring(5, cookie.indexOf("; "));
    var userId = cookie.substring(userIdIndex + 7);

    $('div[data-role="header"]').append(
        //'<h1>User ' + userName + ' signed in</h1>' +
        '<div data-role="navbar"><ul>' +
        '<p id="logged"></p></br>' +
        '<img src="images/sun.png" id="lightBtn" onclick="light()" /><img src="images/moon.png" id="darkBtn" onclick="dark()" />' +
        '<li><a data-role="button" href="#home-page">Home</a></li>' +
        '<li class="rm"><a data-role="button" id="btnLogin" href="#login-page">Log in</a></li>' +
        '<li class="rm"><a data-role="button" id="btnSignup" href="#signup-page">Sign up</a></li>' +
        '<li><a data-role="button" href="#convert-page">Convert</a></li>' +
        '<li><a data-role="button" href="#recents-page">Recents</a></li>' +
        '<li><a data-role="button" href="#favorites-page">Favorites</a></li>' +
        '</ul></div>'
        );
});

//home
$(document).on('pagebeforeshow ', '#home-page', function () {
    getDetails();
});

//login
$(document).on('pagebeforeshow ', '#login-page', function () {

    $('#pLogin').text('');
    $("#usernameInput").val('').trigger('change');
    $("#passwordInput").val('').trigger('change');

    $("#usernameInput").keydown(function (e) {
        if (e.which === 13) {
            $("#loginBtn").click();
        }
    });

    $("#passwordInput").keydown(function (e) {
        if (e.which === 13) {
            $("#loginBtn").click();
        }
    });
});

//sign-up
$(document).on('pagebeforeshow ', '#signup-page', function () {

    $('#signup-page p').append('<strong> sign up</strong>');
});
var getForm;
//convert
$(document).on('pagebeforeshow ', '#convert-page', function () {

    $('#pConv').text('');
    $("#convSelector").val('').trigger('change');

    $('#convert-page form').hide();
    $('#a').hide();
    $('#converterForm select').change(function () {

        var cookie = document.cookie;
        var userIdIndex = cookie.indexOf("userId=");
        var userId = cookie.substring(userIdIndex + 7);

        
        var right = $('#' + getForm + ' select[name="right"]').val()
        var left = $('#' + getForm + ' select[name="left"]').val();
        let username = loggedUser;
        
            if (left != right && document.cookie.indexOf('userId') > -1) {
                $.ajax({
                    type: "POST",
                    url: 'api/recents',
                    traditional: true,
                    data: {
                        "From": left,
                        "To": right,
                        "user": username
                    },
                    success: function (data) {
                        $('#pRec').text('Successfully added recent conversion: ' + left + ' to ' + right);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        $('#pRec').text(jqXHR.responseText);
                    }

                });
            }
        
        else {
            window.alert("Please log in if you want to save to recents.");
        }
        
    });
    $('#convSelector').change(function () {
        let val = $(this).val();
        getForm = val;
        let select = $("#convSelector").val(); 
      
        $('#weight').hide();
        $('#length').hide();
        $('#currency').hide();
        $('#volume').hide();
        $('#volume-dry').hide();
        $('#temperature').hide();
        $('#area').hide();
        $('#pressure').hide();
        $('#energy').hide();
        $('#power').hide();
        $('#force').hide();
        $('#time').hide();
        $('#velocity').hide();

        $('#heat-transfer-coefficient').hide();
        $('#flow').hide();
        $('#flow-mass').hide();
        $('#flow-molar').hide();
        $('#surface-tension').hide();
        $('#permeability').hide();
        $('#sound').hide();
        $('#digital-image-resolution').hide();
        $('#charge').hide();
        $('#current').hide();
        $('#acceleration').hide();
        $('#angle').hide();
        $('#dataStorage').hide();
        $('#density').hide();
        $('#fuelConsumption').hide();
        $('#heatDensity').hide();
        $('#momentOfForce').hide();
        $('#momentOfInertia').hide();
        $('#numbers').hide();
        $('#torque').hide();
        $('#' + val).show();

        getForm = val;
    });
});

//recents
$(document).on('pagebeforeshow ', '#recents-page', function () {
    $('#recents-page p').append('<strong> </strong>');
    getRecentConv();
});

//favorites
$(document).on('pagebeforeshow ', '#favorites-page', function () {

    $('#favorites-page p').append('<strong> favorites</strong>');
});

//add users
function signUp() {

    var username = $('#username').val();
    var password = $('#password').val();
    var email = $('#email').val();
    
    $.ajax({
        type: "POST",
        url: 'api/user',
        data: {
            "UserName": username,
            "Password": password,
            "Email": email
        },
        success: function () {
            $('#signUp').text('Successfully added new user ' + username);
        },
        error: function (status) {
            $('#signUp').text(status);
          alert("This username is already taken. Try a different one");
        }

    });
    $('#username').val('');
    $('#password').val('');
    $('#email').val('');

}

var loggedUser;
// log in
function Login() {

    var username = $('#usernameInput').val().trim();
    var pw = $('#passwordInput').val().trim();

    if (username !== '' && pw !== '') {
        $.ajax({
            url: 'api/login',
            type: 'POST',
            data: {
                'UserName': username,
                'Password': pw
            },
            success: function (data) {
                loggedUser = data.UserName;
                var msg = 'Hello ' + data.UserName + '! Your email is ' + data.Email + '.';
                window.location = '#home-page';
                $('#home-page p').text(msg);

                $('.rm').remove();
                $('#btnSignup').remove();
                $('#btnLogin').remove();
                $('ul').append(
                    '<li><a data-role="button" id="btnLogout" href="#logout" onclick="logout()">Logout</a></li>'
                );

                document.cookie = "user=" + data.UserName;
                document.cookie = "userId=" + data.Id;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#pLogin').text((jqXHR.responseText));
            }
        });
    }
}

function Favorite() {

    let username = loggedUser;
    let select = $("#convSelector").val();
    let form = getForm;
    var left = $('#' + form + ' select[name="left"]').find(':selected').val();
    var right = $('#' + form + ' select[name="right"]').find(':selected').val();

    if (username == undefined) {
        $('#pConv').text('This feature is available after logging in.');
    } else if (select == '') {
        $('#pConv').text('Please select a category.');
    } else if (left == right) {
        $('#pConv').text('Are you sure you want the same units?');
    } else {
        $.ajax({
            type: "POST",
            url: 'api/favorites',
            traditional: true,
            data: {
                "From": left,
                "To": right,
                "user": username
            },
            datatype: 'json',
            success: function (data) {
                $('#pConv').text('Successfully added new favorite conversion: ' + left + ' to ' + right);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#pConv').text(jqXHR.responseText);
            }
        });
    }
}

// log out
function logout(req, res) {
    // Clear cookies
    document.cookie = 'user=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'userId=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    window.location.reload();
}

function light() {
    $('.dark').addClass('light').removeClass('dark');
}

function dark() {
    $('.light').addClass('dark').removeClass('light');
}

function getDetails() {
    const country = getCountry();

    $.ajax({
        url: 'api/details',
        async: false,
        type: 'POST',
        data: {
            'Name': country
        },
        success: function (result) {
            const voltsArr = result.Volts.split(',');
            const plugsArr = result.PlugType.toUpperCase().split(',');

            let volts = processVolts(voltsArr);
            let plugs = processPlugs(plugsArr);

            $('#mongoDetails').html('Your Volt(s) are : ' + volts +
                '<br />Here are your Plug(s) :<br/ >' + plugs);
        },
        error: function (status) {
            $('#mongoDetails').html('Unable to Retrieve Data');
        }
    });
}

function processPlugs(plugsArr) {
    let returnString = '';

    $.each(plugsArr, function (index, val) {
        val = val.trim();
        returnString += 'Type : ' + val + '<br /><img src="images/plugs/' + val + '.jpg" /><br />';
    });

    return returnString;
}

function processVolts(voltsArr) {
    let returnString = '';

    $.each(voltsArr, function (index, val) {
        const reg = new RegExp(/vV/, 'g');
        val = val.trim().replace(reg, '');
        returnString += val + 'V ';
    });

    return returnString;
}

function getCountry() {
    let ip;
    let countryName;
    $.ajax({
        url: 'http://www.stupidwebtools.com/api/my_ip.json',
        dataType: 'json',
        async: false,
        success: function (result) {
            ip = result.my_ip.ip;
        }
    });

    $.ajax({
        url: 'http://usercountry.com/v1.0/json/' + ip,
        dataType: 'json',
        async: false,
        success: function (result) {
            $('#apiDetails').html('I see you in ' + result.country.name +
                '<br /> Continent Name : ' + result.continent.name +
                '<br /> Currency Symbol : ' + result.currency.symbol +
                '<br /> Currency Name : ' + result.currency.name +
                '<br /> Currency Code : ' + result.currency.code +
                '<br /> Language Name : ' + result.language.name +
                '<br /> Timezone Name : ' + result.timezone.name +
                '<br /> Timezone Code : ' + result.timezone.code);
            countryName = result.country.name;
        }
    });

    return countryName;
}
var uri='api/rec'
function getRecentConv() {
    let username = loggedUser;
    
    $.ajax({
        url: uri,
        type: 'POST',
        dataType: "json",
        data: {
            "UserName": username
        },
        success: function (data) {
            $('#recentConversions').empty();
            $.each(data, function (key, record) {
                $('#recentConversions').append(' <li>' + record["From"] + ' =>' + record["To"] + ' </li>');
            });
        },
        error: function (status) {
            $('#recentConversions').html('Unable to Retrieve Data');
        }
    });
   
}


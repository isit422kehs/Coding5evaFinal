
//adds the menu
$(document).ready(function () {

    $('div[data-role="header"]').append(
        '<div data-role="navbar"><ul>' +
        '<li><a data-role="button" href="#home-page">Home</a></li>' +
        '<li><a data-role="button" href="#login-page">Log in</a></li>' +
        '<li><a data-role="button" href="#signup-page">Sign up</a></li>' +
        '<li><a data-role="button" href="#convert-page">Convert</a></li>' +
        '<li><a data-role="button" href="#recents-page">Recents</a></li>' +
        '<li><a data-role="button" href="#favorites-page">Favorites</a></li>' +
        '</ul><img src="images/sun.png" id="lightBtn" onclick="light()" /><img src="images/moon.png" id="darkBtn" onclick="dark()" /></div>'
        );

});

var url='api/user';
//home
$(document).on('pagebeforeshow ', '#home-page', function () {  
    getCountry();
    $('#home-page [data-role=content]').append('<p><strong>heya</strong></p>');
});


//login
$(document).on('pagebeforeshow ', '#login-page', function () {

    $('#login-page p').append('');
});

//sign-up
$(document).on('pagebeforeshow ', '#signup-page', function () {

    $('#signup-page p').append('<strong> sign up</strong>');
});

//convert
$(document).on('pagebeforeshow ', '#convert-page', function () {

    $('#convert-page form').hide();
    $('#convSelector').change(function () {
        let val = $(this).val();
        $('#weight').hide();
        $('#length').hide();
        $('#currency').hide();
        $('#' + val).show();
    });
});

//recents
$(document).on('pagebeforeshow ', '#recents-page', function () {

    $('#recents-page p').append('<strong> recents</strong>');
});

//favorites
$(document).on('pagebeforeshow ', '#favorites-page', function () {

    $('#favorites-page p').append('<strong> favorites</strong>');
});

//add users
function addUsers() {

    var username = $('#username').val();
    var password = $('#password').val();
    var email = $('#email').val();
    
    $.ajax({
        type: "POST",
        url: url,
        data: {
            "UserName": username,
            "Password": password,
            "Email": email
        },
        success: function () {
            $('#addUsers').text('Successfully added new user ' + username);
        },
        error: function (response) {
            alert("This username is already taken. Try a different one");
        }


    });
    $('#username').val('');
    $('#password').val('');
    $('#email').val('');

}

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
                var msg = 'Hello ' + data.UserName + '! Your email is ' + data.Email + '.';
                window.location = '#home-page';
                $('#home-page p').text(msg);

                $('div[data-role="header"]').append(
                    '<li><a data-role="button" href="#logout" onclick="logout()">Logout</a></li>'
                );
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#pLogin').text((jqXHR.responseText));
            }
        });
    }
}

// log out
function logout(req, res) {
    window.location.reload();
}

function light() {
    $('.dark').addClass('light').removeClass('dark');
}

function dark() {
    $('.light').addClass('dark').removeClass('light');
}

function getCountry() {
    let ip;
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
            $('#country').text('I see you in ' + result.country.name);

        }
    });
}
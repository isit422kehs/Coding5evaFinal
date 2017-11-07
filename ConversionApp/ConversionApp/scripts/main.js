
//adds the menu
$(document).ready(function () {

    $('div[data-role="header"]').append(
        '<div data-role="navbar"><ul>' +
        '<li><a data-role="button" href="#home-page">Home</a></li>' +
        '<li><a data-role="button" href="#login-page">Sign in</a></li>' +
        '<li><a data-role="button" href="#signup-page">Sign up</a></li>' +
        '<li><a data-role="button" href="#convert-page">Convert</a></li>' +
        '<li><a data-role="button" href="#recents-page">Recents</a></li>' +
        '<li><a data-role="button" href="#favorites-page">Favorites</a></li>' +
        '</ul></div>'
        );

});

var url='api/user/';
//home
$(document).on('pagebeforeshow ', '#home-page', function () {  
    
    $('#home-page p').append('<strong>heya</strong>');
});


//login
$(document).on('pagebeforeshow ', '#login-page', function () {

    $('#login-page p').append('<strong>heya sign in</strong>');
});

//sign-up
$(document).on('pagebeforeshow ', '#signup-page', function () {

    $('#signup-page p').append('<strong> sign up</strong>');
});

//convert
$(document).on('pagebeforeshow ', '#convert-page', function () {

    $('#convert-page p').append('<strong>heya convert</strong>');
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
        error: function (status) {
        $('#addUsers').text(status);
    }
    });
   
}

// log in
function Login() {

    var username = $('#usernameInput').val().trim();
    var pw = $('#passwordInput').val().trim();

    function salt(user, pw) {
        var data = user + ':' + pw;
        var hash = Base64.encode(data);
        return "Basic " + hash;
    }

    if (username != '' && pw != '') {
        $.ajax({
            url: url + 'userLogin',
            type: 'POST',
            data: {
                'UserName': username,
                'Password': pw
            },
            success: function (response) {
                var msg = '';
                window.location = 'home-page';
                $('#login-page p').append(msg);
            }
        });
    }
}

// log out
function logout(req, res) {
    res.clearCookie('UserName');
    res.clearCookie('Password');
    req.session.destroy(function (e) { res.status(200).send('ok'); });
}
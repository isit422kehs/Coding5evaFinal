
//adds the menu
$(document).ready(function () {

    $('div[data-role="header"]').append(
        '<div data-role="navbar"><ul>' +
        '<li><a data-role="button" href="#home-page">Home</a></li>' +
        '<li><a data-role="button" href="#signin-page">Sign in</a></li>' +
        '<li><a data-role="button" href="#convert-page">Convert</a></li>' +
        '<li><a data-role="button" href="#recents-page">Recents</a></li>' +
        '<li><a data-role="button" href="#favorites-page">Favorites</a></li>' +
        '</ul></div>'
        );

});

//home
$(document).on('pagebeforeshow ', '#home-page', function () {  
    
    $('#home-page p').append('<strong>heya</strong>');
});


//sign-in
$(document).on('pagebeforeshow ', '#signin-page', function () {

    $('#signin-page p').append('<strong>heya sign in</strong>');
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
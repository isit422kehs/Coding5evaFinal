
//adds the menu
$(document).ready(function () {

    $('div[data-role="header"]').append(
        '<div data-role="navbar"><ul>' +
        '<li><a href="index.html">Home</a></li>' +
        '</ul></div>'
        );

});

//home
$(document).on('pagebeforeshow ', '#home-page', function () {  
    
    $('p').append('<strong>heya</strong>');
});


//sign-in
$(document).on('pagebeforeshow ', '#signin-page', function () {

    $('p').append('<strong>heya sign in</strong>');
});

//convert
$(document).on('pagebeforeshow ', '#convert-page', function () {

    $('p').append('<strong>heya convert</strong>');
});

//recents
$(document).on('pagebeforeshow ', '#recents-page', function () {

    $('p').append('<strong> recents</strong>');
});

//favorites
$(document).on('pagebeforeshow ', '#favorites-page', function () {

    $('p').append('<strong> favorites</strong>');
});
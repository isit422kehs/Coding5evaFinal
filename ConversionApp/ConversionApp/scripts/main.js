
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
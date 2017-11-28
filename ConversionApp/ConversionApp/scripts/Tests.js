function signTest() {
    var username = $('#username').val();
    var password = $('#password').val();
    var email = $('#email').val();

}

// tests
$(document).on('pagebeforeshow ', '#tests-page', function () {
    $('#pTests').text('');
});

// testing favorites
function FavTest() {
    let username = loggedUser;
    let form = 'weight';
    var left = 'kilogram';
    var right = 'gram';

    $.ajax({
        type: "POST",
        url: 'api/favorites',
        traditional: true,
        data: {
            "Category": form,
            "From": left,
            "To": right,
            "User": username
        },
        datatype: 'json',
        success: function (data) {
            $('#pTests').text('Successfully tested adding new favorite conversion: ' + left + ' to ' + right);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#pTests').text(jqXHR.responseText);
        }
    });
}
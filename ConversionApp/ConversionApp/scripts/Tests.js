function signTest() {
    var username = 'userTest';
    var password = 'pwTest';
    var email = 'test@test.com';

    $.ajax({
        type: "POST",
        url: 'api/user',
        data: {
            "UserName": username,
            "Password": password,
            "Email": email
        },
        datatype: 'json',
        success: function () {
            //$('#suTest').text('Successfully added new user ' + username);
            $("#suTest").text('Successfully added user ' + username + ' with password ' + password + ' and email ' + email);
        },
        error: function (status) {
            $('#suTest').text(status);
        }

    });
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

function adminTestConversion() {
    
    $('#testerForm').show();

}
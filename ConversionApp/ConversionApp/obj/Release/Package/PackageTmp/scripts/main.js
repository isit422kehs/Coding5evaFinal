
//adds the menu
$(document).ready(function () {
    var cookie = document.cookie;
    var userIdIndex = cookie.indexOf("userId=");
    var userName = cookie.substring(5, cookie.indexOf("; "));
    var userId = cookie.substring(userIdIndex + 7);
});

let loggedUser, left, right, parm, cat, key, getForm, currPage;

$(document).on("pagecontainerchange", function () {
    currPage = $(".ui-page-active").prop("id");
    // Remove active class from nav buttons
    $("[data-role='navbar'] a.ui-btn-active").removeClass("ui-btn-active");
    // Add active class to current nav button
    $("[data-role='navbar'] a").each(function () {
        let href = $(this).prop("href");
        if (href.indexOf(currPage, href.length - currPage.length) !== -1) {
            $(this).addClass("ui-btn-active");
        }
    });
});

//home
$(document).on('pagebeforeshow ', '#home', function () {
    getDetails();
});

//login
$(document).on('pagebeforeshow ', '#login', function () {

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
$(document).on('pagebeforeshow ', '#signup', function () {

    $('#signup p').append('<strong></strong>');
});

//convert
$(document).on('pagebeforeshow ', '#convert', function () {

    $('#convert form').hide();
    $('#a').hide();

    if (loggedUser === undefined) {
        $('#addFav').hide();
    } else {
        $('#addFav').show();
    }
    
    if (key > 0) {

        $("#convSelector").val(cat).change();
        $('#' + cat).show();

        $('#' + cat + ' select[name="left"]').val(left).change();
        $('#' + cat + ' select[name="right"]').val(right).change();

    } else if (key === undefined) {
        $('#pConv').text('');
        $('#convSelector').val('').trigger('change');

        $('#converterForm select').change(function () {

            var cookie = document.cookie;
            var userIdIndex = cookie.indexOf("userId=");
            var userId = cookie.substring(userIdIndex + 7);

            left = $('#' + getForm + ' select[name="left"]').val();
            right = $('#' + getForm + ' select[name="right"]').val();
            
            let username = loggedUser;

            if (left !== right && document.cookie.indexOf('userId') > -1) {

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
                        
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        $('#pRec').text(jqXHR.responseText);
                    }
                });
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
    }
});

//recents
$(document).on('pagebeforeshow ', '#recents', function () {
    $('#recents p').append('<strong> </strong>');
    getRecentConv();
});

//favorites
$(document).on('pagebeforeshow ', '#favorites', function () {

    ShowFavs();
    $("#favList").listview('refresh');
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
            $('#addUsers').text('Successfully added new user ' + username);
        },
        error: function (status) {
            $('#addUsers').text(status);
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

    if (username === 'admin' && pw === 'test') {
        $.ajax({
            url: 'api/login',
            type: 'POST',
            data: {
                'UserName': username,
                'Password': pw
            },
            success: function (data) {

                loggedUser = data.UserName;
                var msg = 'Logged in as ' + loggedUser;
                $('#user').html(msg);
                window.location = '#tests';

                $('.rm').remove();
                $('#btnSignup').remove();
                $('#btnLogin').remove();
                $('ul').append(
                    '<li><a data-role="button" href="#tests">Tests</a></li>' +
                    '<li><a data-role="button" href="#logout" onclick="logout()">Logout</a></li>'
                );

                document.cookie = "user=" + data.UserName;
                document.cookie = "userId=" + data.Id;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#pLogin').text(jqXHR.responseText);
            }
        });
    }

    if (username !== '' && pw !== '' && username !== 'admin') {
        $.ajax({
            url: 'api/login',
            type: 'POST',
            data: {
                'UserName': username,
                'Password': pw
            },
            success: function (data) {

                loggedUser = data.UserName;
                var msg = 'Logged in as ' + loggedUser;
                $('#user').html(msg);
                window.location = '#home';

                $('.rm').remove();
                $('#btnSignup').remove();
                $('#btnLogin').remove();
                $('#menu ul').append(
                    '<li><a href="#recents" data-role="button" data-iconpos="top" class="ui-btn ui-btn-inline"><img class="icon" src="images/recent.png"/>Recents</a></li>' +
                    '<li><a href="#favorites" data-role="button" data-iconpos="top" class="ui-btn ui-btn-inline"><img class="icon" src="images/fav2.png"/>Favorites</a></li>' +
                    '<li><a href="#logout" data-role="button" data-iconpos="top" class="ui-btn ui-btn-inline" onclick="logout()"><img class="icon" src="images/logout.png"/>Logout</a></li>'
                )

                $('#menu ul li').css('width', '20%');
                $('#menu ul li').css('float', 'left');
                $('#menu ul li').css('min-height', '100%');

                document.cookie = "user=" + data.UserName;
                document.cookie = "userId=" + data.Id;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#pLogin').text(jqXHR.responseText);
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

    if (username === undefined) {
        $('#pConv').text('This feature is available after logging in.');
    } else if (select === '') {
        $('#pConv').text('Please select a category.');
    } else if (left === right) {
        $('#pConv').text('Are you sure you want the same units?');
    } else {
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
    window.location = '';
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

            $('#apiDetails table').append('<tr><th colspan="2">Here are your Plug(s) Info</th></tr>' + volts + plugs);
        },
        error: function (status) {
            $('#mongoDetails').html('Unable to Retrieve Plugs Data from Mongo');
        }
    });
}

function processPlugs(plugsArr) {
    let returnString = '';

    $.each(plugsArr, function (index, val) {
        val = val.trim();
        returnString += '<tr><td>Type : ' + val + '</td><td><img src="images/plugs/' + val + '.jpg" /></td></tr>';
    });

    return returnString;
}

function processVolts(voltsArr) {
    let returnString = '<tr><td>Your Volt(s)</td><td>';

    $.each(voltsArr, function (index, val) {
        const reg = new RegExp(/vV/, 'g');
        val = val.trim().replace(reg, '');
        returnString += val + 'V ';
    });

    returnString += '</td></tr>';
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
        url: 'https://usercountry.com/v1.0/json/' + ip,
        dataType: 'json',
        async: false,
        success: function (result) {
            $('#apiDetails table').html('<tr><th colspan="2">I see you in ' + result.country.name + '</th></tr>' +
                '<tr><td>Continent Name</td><td>' + result.continent.name + '</td></tr>' +
                '<tr><td>Currency Symbol</td><td>' + result.currency.symbol + '</td></tr>' +
                '<tr><td>Currency Name</td><td>' + result.currency.name + '</td></tr>' +
                '<tr><td>Currency Code</td><td>' + result.currency.code + '</td></tr>' +
                '<tr><td>Language Name</td><td>' + result.language.name + '</td></tr>' +
                '<tr><td>Timezone Name</td><td>' + result.timezone.name + '</td></tr>' +
                '<tr><td>Timezone Code</td><td>' + result.timezone.code + '</td></tr>');
            countryName = result.country.name;
        }
    });

    return countryName;
}

function ShowFavs() {

    let username = loggedUser;
    let form = getForm;

    $('#favList').empty();

    $.ajax({
        type: "POST",
        url: 'api/getfavs',
        data: {
            "user": username
        },
        success: function (data) {

            $.each(data, function (key, record) {
                $('#favList').append('<li><a data-transition="pop" data-parm="' + data[key] + '" href="#convert" data-theme="a" class="ui-btn ui-btn-icon-right ui-icon-carat-r">[ ' + record[1].substr(0, 1).toUpperCase() + record[1].substr(1) + ' ] ' + record[2].substr(0, 1).toUpperCase() + record[2].substr(1) + ' => ' + record[3].substr(0, 1).toUpperCase() + record[3].substr(1) + '</a></li>');
            });

            $("a").on("click", function (event) {
                parm = $(this).attr("data-parm");
                var strArr = parm.split(',');

                key = strArr[0];
                cat = strArr[1];
                left = strArr[2];
                right = strArr[3];
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#pFav').text(jqXHR.responseText);
        }
    });
}

var uri = 'api/rec';
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
                $('#recentsTable').prepend('<tr><td>' + record["From"].substr(0, 1).toUpperCase() + record["From"].substr(1) + ' => ' + record["To"].substr(0, 1).toUpperCase() + record["To"].substr(1) + '</td></tr>');
            });
            $('#recentsTable').DataTable();
        },
        error: function (status) {
            $('#recentConversions').html('Unable to retrieve data.');
        }
    });
}
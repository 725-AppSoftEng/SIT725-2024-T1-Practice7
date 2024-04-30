$(document).ready(function () {

    $('.modal').modal();

    $('#clickMeButton').click(function () {
        $('#modal1').modal('open');
    });


    $('#formSubmit').click(function () {
        var firstName = $('#first_name').val();
        var lastName = $('#last_name').val();
        var password = $('#password').val();
        var email = $('#email').val();

        var formData = {
            firstName: firstName,
            lastName: lastName,
            password: password,
            email: email
        };


        $.ajax({
            type: 'POST',
            url: '/api/cats',
            data: formData,
            success: function (response) {
                console.log(response);

                $('#catPostSuccess').text('Cat post successful');
            },
            error: function (error) {
                console.error('Error:', error);

            }
        });
        $('#modal1').modal('close');
    });
    let socket = io();
    socket.on('number', (msg) => {
        console.log('Random Number: ' + msg);
    });
});


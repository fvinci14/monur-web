$(function() {
    var form = $('#contact-form');
    var formMessages = $('.form-messages');

    $(form).submit(function(e) {
        e.preventDefault();
        var formData = $(form).serialize();

        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        })
        .done(function(response) {
            console.log("Response: " + response); // Mostrar la respuesta en la consola
            $(formMessages).removeClass('error');
            $(formMessages).addClass('success');
            $(formMessages).text(response);
            $('#name').val('');
            $('#email').val('');
            $('#message').val('');
        })
        .fail(function(data) {
            console.log("Error: " + data.responseText); // Mostrar el error en la consola
            $(formMessages).removeClass('success');
            $(formMessages).addClass('error');
            if (data.responseText !== '') {
                $(formMessages).text(data.responseText);
            } else {
                $(formMessages).text('An error occurred and your message could not be sent.');
            }
        });
    });
});

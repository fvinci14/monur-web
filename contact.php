<?php
    /*
    name
    email
    message
    */
    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["name"]));
        $name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["message"]);
        

        // Set the recipient email address.
        // FIXME: Update this to your desired email address.
        $recipient = "modelo.onuregional@gmail.com";

        // Build the email content.
        $email_content = "Name $name\n";
        $email_content .= "Email $email\n";
        $email_content .= "Message $message\n";

        // Build the email headers.
        $email_headers = "From: $name <$email>";

        // Send the email.
        if (mail($recipient,  $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Gracias! Tu mensaje ha sido enviado.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Actualmente no tenemos el formulario activo. Prueba más tarde. Gracias.";
            //echo "Oops! Something went wrong ande we couldn't send your message.";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }

?>
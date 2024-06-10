document.addEventListener('DOMContentLoaded', () => {
    const $form = document.querySelector('#home-form');
    const $feedback = document.querySelector('#feedback');

    $form.addEventListener('submit', handleSubmit);

    async function handleSubmit(event) {
        event.preventDefault();
        
        // Deshabilitar el formulario para evitar múltiples envíos
        $form.querySelector('button[type="submit"]').disabled = true;
        
        // Mostrar mensaje de "procesando"
        showFeedback('Procesando...', 'processing');

        try {
            const formData = new FormData($form);
            const response = await fetch($form.action, {
                method: $form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                $form.reset();
                showFeedback('¡Gracias por tu mensaje! Te estaremos contactando pronto.', 'success');
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            showFeedback('Ocurrió un error. Por favor, vuelve a intentarlo luego.', 'error');
        } finally {
            // Rehabilitar el formulario después de procesar la solicitud
            $form.querySelector('button[type="submit"]').disabled = false;
        }
    }

    function showFeedback(message, type) {
        $feedback.textContent = message;
        $feedback.className = type;
        $feedback.style.display = 'block';
    }
});
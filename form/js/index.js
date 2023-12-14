// Se ejecuta cuando el contenido del documento ha sido completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencia al formulario por su ID
    const form = document.getElementById('formulario');

    // Agregar un event listener para el evento de envío del formulario
    form.addEventListener('submit', function (event) {
        // Prevenir el envío del formulario por defecto
        event.preventDefault();

        // Validar los campos del formulario
        const fullName = document.getElementById('full-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('Contraseña').value.trim();
        const selectWhere = document.getElementById('select-where').value;
        const conditionsCheckbox = document.getElementById('condiciones');

        // Reiniciar mensajes de error previos
        resetErrorMessages();

        let isValid = true;

        // Validar nombre completo
        if (fullName === '') {
            displayErrorMessage('full-name', 'Nombre inválido');
            isValid = false;
        }

        // Validar correo electrónico
        if (!isValidEmail(email)) {
            displayErrorMessage('email', 'Correo inválido');
            isValid = false;
        }

        // Validar contraseña
        if (password === '') {
            displayErrorMessage('Contraseña', 'Contraseña inválida');
            isValid = false;
        }

        // Validar cuadro de selección
        if (selectWhere === '') {
            displayErrorMessage('select-where', 'Selecciona una opción');
            isValid = false;
        }

        // Validar casilla de verificación
        if (!conditionsCheckbox.checked) {
            displayErrorMessage('condiciones', 'Debes aceptar las condiciones');
            isValid = false;
        }

        // Si el formulario es válido, puedes enviarlo o realizar acciones adicionales aquí
        if (isValid) {
            // Descomenta la línea siguiente para enviar el formulario
            // form.submit();
            location.reload();
            alert('¡Formulario enviado con éxito!');
        }
    });

    // Función para validar el formato del correo electrónico
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Función para mostrar mensajes de error
    function displayErrorMessage(fieldId, message) {
        const errorMessageElement = document.querySelector(`#${fieldId} + .formulario__input-error`);
        errorMessageElement.textContent = message;
        errorMessageElement.style.display = 'block';
    }

    // Función para reiniciar mensajes de error
    function resetErrorMessages() {
        const errorMessages = document.querySelectorAll('.formulario__input-error');
        errorMessages.forEach(function (errorMessage) {
            errorMessage.style.display = 'none';
        });
    }
});

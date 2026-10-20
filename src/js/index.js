'use strict';

dayjs.extend(dayjs_plugin_customParseFormat);
dayjs.extend(dayjs_plugin_duration);
dayjs.extend(dayjs_plugin_utc);
dayjs.extend(dayjs_plugin_timezone);
dayjs.locale('es');

// Simula los nombres de usuarios que ya están registrados.
const usuariosRegistrados = ["player_one", "pixelmaster", "dragonborn", "lunagamer"];
let elementsCheck = new Set();

// Elementos Html
const form = document.querySelector("#register-form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const birthdate = document.querySelector("#birthdate");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const usernameError = document.querySelector("#username-error");
const usernameStatus = document.querySelector("#username-status");
const emailError = document.querySelector("#email-error");
const birthdateError = document.querySelector("#birthdate-error");
const passwordError = document.querySelector("#password-error");
const confirmPasswordError = document.querySelector("#confirm-password-error");
const registerMessage = document.querySelector("#register-message");
const toggleButtons = document.querySelectorAll(".toggle-password");
const inputs = document.querySelectorAll("input");

// Regex
const regexEmail = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)*\.[A-Za-z]{2,}$/;
const regexUsername = /^[A-Za-z0-9_]{3,20}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$/;

// Funciones de validación
function checkUsuario() {
    elementsCheck.add("username");
    const content = username.value.trim();

    const formatoValido = regexUsername.test(content);
    const yaRegistrado = usuariosRegistrados.includes(content);
    const isValid = formatoValido && !yaRegistrado;

    username.setAttribute("aria-invalid", isValid ? "false" : "true");
    usernameStatus.setAttribute("aria-invalid", isValid ? "false" : "true");

    if (!isValid) {
        usernameError.textContent = formatoValido
            ? "Error: El usuario ya esta registrado"
            : "Error: El formato de usuario no es valido.";

        usernameStatus.textContent = "";
        return false;
    }

    usernameError.textContent = "";
    usernameStatus.textContent = "Usuario disponible";
    return true;
}

function checkPassword() {
    elementsCheck.add("password")

    let content = password.value.trim();

    let isValid = passwordRegex.test(content);
    passwordError.setAttribute("aria-invalid", isValid ? "false" : "true");
    passwordError.textContent = isValid ? "" : "La contraseña no es valida";
    return isValid
}

function checkPasswordConfirm() {
    elementsCheck.add("confirmPassword");

    const content = password.value.trim();
    const contentConfirm = confirmPassword.value.trim();

    const isValid = content !== "" && content === contentConfirm;

    confirmPassword.setAttribute("aria-invalid", isValid ? "false" : "true");
    confirmPasswordError.textContent = isValid ? "" : "Error: Las contraseñas no son iguales.";

    return isValid;
}

function checkEmail() {
    elementsCheck.add("email")

    let content = email.value.trim();

    let isValid = regexEmail.test(content);
    emailError.setAttribute("aria-invalid", isValid ? "false" : "true");
    emailError.textContent = isValid ? "" : "Error: Email no valido";
    return isValid
}

function checkBirthdate() {
    elementsCheck.add("birthdate");

    const content = birthdate.value.trim();
    const fecha = dayjs(content);
    const esFechaValida = content !== "" && fecha.isValid();
    const noEsFutura = esFechaValida && !fecha.isAfter(dayjs(), "day");
    const isValid = esFechaValida && noEsFutura;

    birthdate.setAttribute("aria-invalid", isValid ? "false" : "true");
    birthdateError.textContent = isValid ? "" : "Fecha no válida";

    return isValid;
}

// Eventos:

// Evento al hacer click en el ojo 


toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const input = document.getElementById(button.getAttribute("aria-controls"));
        if (!input) return;

        const isVisible = button.getAttribute("aria-pressed") === "true";

        button.setAttribute("aria-pressed", isVisible ? "false" : "true");
        input.setAttribute("type", isVisible ? "password" : "text");
    });
});

inputs.forEach(input => {

    // Evento que checkea el campo al perder el foco
    input.addEventListener("blur", () => {
        if (input.id === "username") {
            checkUsuario();
        } else if (input.id === "password") {
            checkPassword();
        } else if (input.id === "email") {
            checkEmail()
        } else if (input.id === "birthdate") {
            checkBirthdate()
        } else if (input.id === "confirm-password") {
            checkPasswordConfirm()
        }
    })

    // Evento que comprueba los cambios en linea
    input.addEventListener("input", () => {
        if (elementsCheck.has("username")) {
            checkUsuario();
            elementsCheck.delete("username")
        } else if (elementsCheck.has("password")) {
            checkPassword();
            elementsCheck.delete("password")
        } else if (elementsCheck.has("email")) {
            checkPassword();
            elementsCheck.delete("email")
        } else if (elementsCheck.has("birthdate")) {
            checkPassword();
            elementsCheck.delete("birthdate")
        } else if (elementsCheck.has("confirm-password")) {
            checkPassword();
            elementsCheck.delete("confirm-password")
        }
    })
})


// Evento para enviar el formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkUsuario();
    checkPassword();
    checkPasswordConfirm()
    checkEmail()
    checkBirthdate()

    let completed = checkUsuario() && checkPassword() && checkPasswordConfirm() && checkEmail() && checkBirthdate();

    if (completed) {
        usuariosRegistrados.push(username.textContent)

        e.target.reset()

        registerMessage.textContent = "Registro simulado completado"
    }

    username.focus();
})



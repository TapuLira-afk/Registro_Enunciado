// Datos ficticios para comprobar el acceso. No cambies sus valores.
const cuentaPrueba = {
  usuario: "player_one",
  email: "player@example.com",
  password: "Juego2026!",
};
let elementsCheck = new Set();

// Elementos html
const form = document.querySelector("#login-form")
const togglePass = form.querySelector("#toggle-password")
const inputs = form.querySelectorAll('input');

// Regex
let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let regexUsu = /^[a-zA-Z0-9_]{3,20}$/;
let regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;

// Funciones de validación
function checkUsuario() {
  const inputUsu = form.querySelector("#identity");
  let content = inputUsu.value.trim();

  let isValid = regexEmail.test(content) || regexUsu.test(content);
  inputUsu.setAttribute("aria-invalid", isValid ? "false" : "true");
  document.querySelector("#identity-error").textContent = isValid ? "" : "Usuario o correo invalido";
  elementsCheck.add("identity");
}

function checkPassword() {
  const inputPass = form.querySelector("#password");
  let content = inputPass.value.trim();

  let isValid = regexPass.test(content);
  inputPass.setAttribute("aria-invalid", isValid ? "false" : "true");
  document.querySelector("#password-error").textContent = isValid ? "" : "La contraseña no es valida";
  elementsCheck.add("password");
}

// Eventos
togglePass.addEventListener("click", () => {
  let activated = togglePass.getAttribute("aria-pressed") === "true" ? "false" : "true";
  togglePass.setAttribute("aria-pressed", activated);

  let visible = activated === "true" ? "password" : "text";
  form.querySelector("#password").setAttribute("type", visible)
})

inputs.forEach(input => {
  input.addEventListener("blur", () => {
    if (input.id === "identity") {
      checkUsuario();
    } else if (input.id === "password") {
      checkPassword();
    }
  })

  input.addEventListener("input", () => {
    if (elementsCheck.has("identity")) {
      checkUsuario();
      elementsCheck.delete("identity")
    } else if (elementsCheck.has("password")) {
      checkPassword();
      elementsCheck.delete("password")
    }
  })
})

form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkUsuario();
  checkPassword();

  form.querySelector("#identity").focus();
})




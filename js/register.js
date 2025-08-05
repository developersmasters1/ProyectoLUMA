document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const warnings = document.getElementById("warnings");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let mensajes = [];
    warnings.innerHTML = "";

    // Validaciones de campos
    const nombre = document.getElementById("nombres").value.trim();
    const apellido = document.getElementById("apellidos").value.trim();
    const tipoDocumento = document.getElementById("tipoDocumento").value;
    const numeroDocumento = document.getElementById("numeroDocumento").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value;
    const departamento = document.getElementById("departamento").value;
    const ciudad = document.getElementById("ciudad").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const terminos = document.getElementById("terminos").checked;

    // Nombre
    if (nombre.length < 2) {
      mensajes.push("• El nombre debe tener al menos 2 caracteres.");
    }

    // Apellido
    if (apellido.length < 2) {
      mensajes.push("• El apellido debe tener al menos 2 caracteres.");
    }

    // Tipo de documento
    if (!tipoDocumento) {
      mensajes.push("• Selecciona un tipo de documento.");
    }

    // Número de documento (solo números, mínimo 5 caracteres)
    if (!/^\d{5,}$/.test(numeroDocumento)) {
      mensajes.push("• El número de documento debe tener al menos 5 dígitos numéricos.");
    }

    // Correo electrónico
    const regexEmail = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
    if (!regexEmail.test(correo)) {
      mensajes.push("• Ingresa un correo electrónico válido.");
    }

    // Contraseña (mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número)
    const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regexPass.test(password)) {
      mensajes.push("• La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula y un número.");
    }

    // Departamento
    if (!departamento) {
      mensajes.push("• Selecciona un departamento.");
    }

    // Ciudad
    if (ciudad.length < 2) {
      mensajes.push("• Ingresa una ciudad válida.");
    }

    // Dirección
    if (direccion.length < 5) {
      mensajes.push("• Ingresa una dirección válida (mínimo 5 caracteres).");
    }

    // Términos y condiciones
    if (!terminos) {
      mensajes.push("• Debes aceptar los Términos y Condiciones.");
    }

    // Mostrar advertencias o éxito

    if (mensajes.length > 0) {
      warnings.innerHTML = mensajes.join("<br>");
    } else {
      warnings.innerHTML = "<span style='color:green;'>¡Registro exitoso!</span>";
      alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
      setTimeout(() => {
        window.location.href = "/subpaginas/ingreso.html";
      }, 1200);
    }
  });
});
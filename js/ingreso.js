document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const warnings = document.getElementById("warnings");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let mensajes = [];
    warnings.innerHTML = "";

    const usuario = document.getElementById("usuario").value.trim();
    const pass = document.getElementById("pass").value;

    // Validar usuario/correo
    if (usuario.length < 3) {
      mensajes.push("• Ingresa tu usuario o correo.");
    } else {
      // Si parece un correo, validar formato
      if (usuario.includes("@")) {
        const regexEmail = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
        if (!regexEmail.test(usuario)) {
          mensajes.push("• Ingresa un correo electrónico válido.");
        }
      }
    }

    // Validar contraseña
    if (pass.length < 8) {
      mensajes.push("• La contraseña debe tener al menos 8 caracteres.");
    }

    // Mostrar advertencias o enviar
    if (mensajes.length > 0) {
      warnings.innerHTML = mensajes.join("<br>");
    } else {
      warnings.innerHTML = "¡Ingreso exitoso!";
      // Aquí iría la lógica de autenticación real
      alert("¡Ingreso exitoso!");
      window.location.href = "/subpaginas/catalogo.html"; // Redirige al catálogo
    }
  });
});
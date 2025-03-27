const nombre = document.getElementById("nombres");
const apellido = document.getElementById("apellidos");
const email = document.getElementById("correo");
const pass = document.getElementById("password");
const form = document.getElementById("form")
const parrafo = document.getElementById("warnings")

form.addEventListener("submit", e=>{
    e.preventDefault()
    let warnings = ""
    let entrar = false
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/ //Expresion regular para validar la arroba @ y el final (.com) del correo
    parrafo.innerHTML = ""
    if(nombre.value.length <2){
        warnings += alert("Nombre no valido");
        entrar = true
    }
    if(apellido.value.length <2){
        warnings += alert("Apellido no valido");
        entrar = true
    }
    if(!regexEmail.test(email.value)){
        warnings += alert("Correo no valido, por favor corrijalo");
        entrar = true   
    }
    if(pass.value.length < 8){
        warnings += alert("La contraseña debe tener al menos 8 caracteres");
        entrar = true
    }

    if(entrar){
        parrafo.innerHTML = warnings
    }else{
        parrafo.innerHTML = alert("¡Registrado con exito!");
        window.location = "/subpaginas/ingreso.html";
    }
})
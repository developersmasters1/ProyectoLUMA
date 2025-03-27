class Usuario {
    constructor()
    {
        var email = '';
        var pass = '';
    }
    obtener()
    {
        var email = document.getElementById('email').value;
        var pass = document.getElementById('pass').value;
        this.p(email, pass);
        
    }
    p = function(email, pass)
    {
        if(email == "Magda" && pass == "12345")
        {
            alert("Bienvenida " + email);
            window.location="/subpaginas/catalogo.html";
        }
        else if(email == "David" && pass == "01234")
        {
            alert("Bienvenido " + email);
            window.location="/subpaginas/catalogo.html";
        }
        else{
            alert("Credencial no válida");
        }
    }
}
var user = new Usuario();
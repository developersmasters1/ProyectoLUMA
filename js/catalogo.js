// Variable que mantiene el estado visible del carrito
var carritoVisible = false;

// Esperamos que todos los elementos de la página carguen para ejecutar el script
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {
    // Botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (var i = 0; i < botonesEliminarItem.length; i++) {
        botonesEliminarItem[i].addEventListener('click', eliminarItemCarrito);
    }

    // Botón sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (var i = 0; i < botonesSumarCantidad.length; i++) {
        botonesSumarCantidad[i].addEventListener('click', sumarCantidad);
    }

    // Botón restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (var i = 0; i < botonesRestarCantidad.length; i++) {
        botonesRestarCantidad[i].addEventListener('click', restarCantidad);
    }

    // Botón agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (var i = 0; i < botonesAgregarAlCarrito.length; i++) {
        botonesAgregarAlCarrito[i].addEventListener('click', agregarAlCarritoClicked);
    }

    // Botón pagar
    var btnPagar = document.getElementsByClassName('btn-pagar')[0];
    if (btnPagar) {
        btnPagar.addEventListener('click', pagarClicked);
    }
}

// Eliminar todos los elementos del carrito y ocultarlo
function pagarClicked() {
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount === 0) {
        alert("El carrito está vacío. Agrega productos antes de pagar.");
        return;
    }
    alert("¡Gracias por la compra! Redirigiendo a la página de pago...");
    window.location.href = "/subpaginas/envio.html"; // Redirige a la página de pago
    while (carritoItems.hasChildNodes()) {
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();
    ocultarCarrito();
    // window.location.href = "/subpaginas/pago.html"; // Descomenta si tienes página de pago
}

// Agregar al carrito
function agregarAlCarritoClicked(event) {
    var button = event.target;
    var item = button.closest('.item');
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;

    // Validación: No agregar si ya existe
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for (var i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText === titulo) {
            alert("El producto ya está en el carrito.");
            return;
        }
    }

    agregarItemAlCarrito(titulo, precio, imagenSrc);
    hacerVisibleCarrito();
}

// Hacer visible el carrito
function hacerVisibleCarrito() {
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

// Agregar un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    var item = document.createElement('div');
    item.classList.add('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar" title="Eliminar del carrito">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    // Funcionalidad botones nuevos
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);
    item.getElementsByClassName('restar-cantidad')[0].addEventListener('click', restarCantidad);
    item.getElementsByClassName('sumar-cantidad')[0].addEventListener('click', sumarCantidad);

    actualizarTotalCarrito();
}

// Sumar cantidad
function sumarCantidad(event) {
    var selector = event.target.parentElement;
    var cantidadInput = selector.getElementsByClassName('carrito-item-cantidad')[0];
    var cantidadActual = parseInt(cantidadInput.value);
    if (cantidadActual < 99) {
        cantidadInput.value = cantidadActual + 1;
        actualizarTotalCarrito();
    } else {
        alert("No puedes agregar más de 99 unidades de este producto.");
    }
}

// Restar cantidad
function restarCantidad(event) {
    var selector = event.target.parentElement;
    var cantidadInput = selector.getElementsByClassName('carrito-item-cantidad')[0];
    var cantidadActual = parseInt(cantidadInput.value);
    if (cantidadActual > 1) {
        cantidadInput.value = cantidadActual - 1;
        actualizarTotalCarrito();
    }
}

// Eliminar item del carrito
function eliminarItemCarrito(event) {
    var buttonClicked = event.target.closest('.btn-eliminar');
    buttonClicked.closest('.carrito-item').remove();
    actualizarTotalCarrito();
    ocultarCarrito();
}

// Ocultar carrito si está vacío
function ocultarCarrito() {
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount === 0) {
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}

// Función para parsear el precio de un string a un número
function parsePrecio(precioStr) {
    // Elimina el símbolo $, puntos y espacios
    let limpio = precioStr.replace(/\$/g, '').replace(/\./g, '').replace(/,/g, '').replace(/\s/g, '');
    // Convierte a número
    return parseInt(limpio, 10);
}

// Ejemplos de cambio de formato de precio:
console.log(parsePrecio("$1.750.000")); // 1750000
console.log(parsePrecio("$1700000"));   // 1700000
console.log(parsePrecio("$2,500,000")); // 2500000

// Actualizar total del carrito
function actualizarTotalCarrito() {
    var carritoItems = document.getElementsByClassName('carrito-item');
    var total = 0;
    for (var i = 0; i < carritoItems.length; i++) {
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        var precio = parsePrecio(precioElemento.innerText);
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = parseInt(cantidadItem.value);
        total += precio * cantidad;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$ ' + total.toLocaleString("es");
}









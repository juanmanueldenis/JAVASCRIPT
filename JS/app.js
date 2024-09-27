// Productos
const productos = [
    { id: 1, nombre: "Manzanas", precio: 1000, imagen: "SOURCE/manzana.png" },
    { id: 2, nombre: "Pan", precio: 2000, imagen: "SOURCE/pan.png" },
    { id: 3, nombre: "Leche", precio: 1700, imagen: "SOURCE/leche.png" },
    { id: 4, nombre: "Huevos", precio: 3800, imagen: "SOURCE/huevos.png" },
    { id: 5, nombre: "Queso", precio: 1100, imagen: "SOURCE/queso.png" },
    { id: 6, nombre: "Yogurt", precio: 1300, imagen: "SOURCE/yogurt.png" },
    { id: 7, nombre: "Pollo", precio: 7000, imagen: "SOURCE/pollo.png" },
    { id: 8, nombre: "1kg Carne ", precio: 12000, imagen: "SOURCE/carne.png" },
    { id: 9, nombre: "Cereal", precio: 1650, imagen: "SOURCE/cereal.png" },
    { id: 10, nombre: "Tomates", precio: 1000, imagen: "SOURCE/tomate.png"}
];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let descuentoAplicado = 0;
// Mostrar productos
function mostrarProductos() {
    const listaProductos = document.getElementById('productos-lista');
    listaProductos.innerHTML = ''; // Limpiar la lista antes de agregar elementos
    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p>${producto.nombre} - $${producto.precio.toFixed(2)}</p>
            <button class="agregar-carrito-btn" data-id="${producto.id}">Añadir al carrito</button>
        `;
        listaProductos.appendChild(productoDiv);
    });
    // Asignar eventos a los botones de "Añadir al carrito"
    document.querySelectorAll('.agregar-carrito-btn').forEach(button => {
        button.addEventListener('click', function() {
            const idProducto = parseInt(button.getAttribute('data-id'));
            agregarAlCarrito(idProducto);
        });
    });
}
// Agregar producto al carrito
function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    const itemEnCarrito = carrito.find(item => item.id === producto.id);
    if (itemEnCarrito) {
        // Si el producto ya está en el carrito, aumentar la cantidad
        itemEnCarrito.cantidad += 1;
    } else {
        // Si no está en el carrito, agrego 1
        carrito.push({ ...producto, cantidad: 1 });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}
// Mostrar carrito
function mostrarCarrito() {
    const listaCarrito = document.getElementById('carrito-lista');
    listaCarrito.innerHTML = ''; // Limpiar lista anterior
    let subtotal = 0;

    carrito.forEach((producto, index) => {
        // Crear un contenedor para cada elemento del carrito
        const item = document.createElement('li');
        item.classList.add('carrito-item');

        // Crear el nombre y el precio del producto
        const infoProducto = document.createElement('span');
        infoProducto.textContent = `${producto.nombre} - $${(producto.precio * producto.cantidad).toFixed(2)}`;
        
        // Crear el contenedor de cantidad con botones de + y -
        const cantidadControles = document.createElement('div');
        cantidadControles.classList.add('cantidad-controles');

        // Botón para disminuir cantidad
        const btnMenos = document.createElement('button');
        btnMenos.textContent = '-';
        btnMenos.classList.add('btn-menos');
        btnMenos.addEventListener('click', () => cambiarCantidadProducto(index, -1));

        // Span para mostrar la cantidad actual
        const cantidadSpan = document.createElement('span');
        cantidadSpan.textContent = producto.cantidad;
        cantidadSpan.classList.add('cantidad');

        // Botón para aumentar cantidad
        const btnMas = document.createElement('button');
        btnMas.textContent = '+';
        btnMas.classList.add('btn-mas');
        btnMas.addEventListener('click', () => cambiarCantidadProducto(index, 1));

        // Agregar los controles de cantidad al contenedor
        cantidadControles.appendChild(btnMenos);
        cantidadControles.appendChild(cantidadSpan);
        cantidadControles.appendChild(btnMas);

        // Agregar las partes al contenedor principal del producto
        item.appendChild(infoProducto);
        item.appendChild(cantidadControles);

        // Agregar el producto al carrito en la interfaz
        listaCarrito.appendChild(item);

        // Calcular el subtotal
        subtotal += producto.precio * producto.cantidad;
    });

    // Actualizar el subtotal en la interfaz
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    calcularTotalConDescuento(subtotal);
    calcularAhorro(subtotal);
}

// Cambiar la cantidad de un producto en el carrito
function cambiarCantidadProducto(index, cambio) {
    carrito[index].cantidad += cambio;

    // Si la cantidad es menor o igual a 0, eliminar el producto
    if (carrito[index].cantidad <= 0) {
        eliminarProductoDelCarrito(index);
    }

    // Actualizar el carrito en la interfaz
    mostrarCarrito();
}

// Eliminar un producto del carrito
function eliminarProductoDelCarrito(index) {
    carrito.splice(index, 1); // Eliminar producto del array

    // Actualizar el localStorage con el nuevo carrito
    localStorage.setItem('carrito', JSON.stringify(carrito));

    mostrarCarrito(); // Actualizar la interfaz
}

// Aplicar cupón de descuento
function aplicarCupon() {
    const cupon = document.getElementById('cupon').value;
    if (cupon === "DESCUENTO10") {
        descuentoAplicado = 0.10;
    } else if (cupon === "DESCUENTO25") {
        descuentoAplicado = 0.25;
    } else {
        descuentoAplicado = 0;
    }
    document.getElementById('descuento').textContent = `${(descuentoAplicado * 100).toFixed(0)}%`;
    mostrarCarrito();
}
// Calculo el total con el descuento aplicado
function calcularTotalConDescuento(subtotal) {
    const totalConDescuento = subtotal * (1 - descuentoAplicado);
    document.getElementById('total').textContent = totalConDescuento.toFixed(2);
}
// Calculo el ahorro
function calcularAhorro(subtotal) {
    const ahorro = subtotal * descuentoAplicado;
    document.getElementById('Ahorro').textContent = ahorro.toFixed(2);
}
// Reinicio el carrito
function reiniciarCarrito() {
    localStorage.removeItem('carrito');
    carrito = [];
    mostrarCarrito();
}

function finalizarcompra() {
    // Mostrar el modal
    const modal = document.getElementById('modal-compra');
    modal.style.display = 'block';

    // Cerrar el modal al hacer clic en el botón de cerrar (X)
    const span = document.getElementsByClassName('close')[0];
    span.onclick = function() {
        modal.style.display = 'none';
    }

    // Cerrar el modal si el usuario hace clic fuera del modal
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }

    // Confirmar compra y mostrar el ticket
    document.getElementById('form-datos').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir recarga de la página

        // Obtener datos del formulario
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const domicilio = document.getElementById('domicilio').value;
        const email = document.getElementById('email').value;

        // Generar ticket de compra
        generarTicket(nombre, apellido, domicilio, email);

        // Cerrar el modal
        modal.style.display = 'none';

        // Limpiar carrito
        reiniciarCarrito();
    });
}

// Función para generar el ticket de compra
function generarTicket(nombre, apellido, domicilio, email) {
    const resumenCompra = document.getElementById('resumen-compra');
    const listaResumen = document.getElementById('resumen-productos');
    const totalResumen = document.getElementById('total-resumen');

    // Mostrar el contenedor del resumen
    resumenCompra.style.display = 'block';

    // Mostrar datos del usuario
    document.getElementById('resumen-usuario').textContent = 
        `Cliente: ${nombre} ${apellido}  Domicilio: ${domicilio}  Email: ${email}`;

    // Llenar lista de productos
    listaResumen.innerHTML = ''; // Limpiar lista
    carrito.forEach(producto => {
        const item = document.createElement('li');
        item.textContent = `${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${(producto.precio * producto.cantidad).toFixed(2)}`;
        listaResumen.appendChild(item);
    });

    // Mostrar total a pagar
    const subtotal = carrito.reduce((total, prod) => total + prod.precio * prod.cantidad, 0);
    const totalConDescuento = subtotal * (1 - descuentoAplicado);
    totalResumen.textContent = totalConDescuento.toFixed(2);
}

// Asigno eventos a los botones del HTML
function asignarEventos() {
    document.getElementById('reiniciar-carrito-btn').addEventListener('click', reiniciarCarrito);
    document.getElementById('aplicar-cupon-btn').addEventListener('click', aplicarCupon);
    document.getElementById('finalizar-compra-btn').addEventListener('click', finalizarcompra );
}
// Inicializo las funciones
mostrarProductos();
mostrarCarrito();
asignarEventos();

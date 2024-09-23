// Productos //
const productos = [
    { id: 1, nombre: "Manzanas", precio: 1000, imagen: "SOURCE/manzana.png" },
    { id: 2, nombre: "Pan", precio: 2000, imagen: "SOURCE/pan.png" },
    { id: 3, nombre: "Leche", precio: 1700, imagen: "SOURCE/leche.png" },
    { id: 4, nombre: "Huevos", precio: 3800, imagen: "SOURCE/huevos.png" },
    { id: 5, nombre: "Queso", precio: 1100, imagen: "SOURCE/queso.png" },
    { id: 6, nombre: "Yogurt", precio: 1300, imagen: "SOURCE/yogurt.png" },
    { id: 7, nombre: "Pollo", precio: 7000, imagen: "SOURCE/pollo.png" },
    { id: 8, nombre: "1kg Carne Envasada", precio: 12000, imagen: "SOURCE/carne.png" },
    { id: 9, nombre: "Cereal", precio: 1650, imagen: "SOURCE/cereal.png" },
    { id: 10, nombre: "Tomates", precio: 1000, imagen: "SOURCE/tomate.png"}
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let descuentoAplicado = 0;

// Mostrar productos //
function mostrarProductos() {
    const listaProductos = document.getElementById('productos-lista');
    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}"s>
            <p>${producto.nombre} - $${producto.precio.toFixed(2)}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
        `;
        listaProductos.appendChild(productoDiv);
    });
}

// Agregar producto al carrito //
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

// Mostrar carrito //
function mostrarCarrito() {
    const listaCarrito = document.getElementById('carrito-lista');
    listaCarrito.innerHTML = ''; // Limpiar lista anterior

    let subtotal = 0;
    carrito.forEach(producto => {
        const item = document.createElement('li');
        item.textContent = `Cantidad: ${producto.cantidad} | ${producto.nombre} - $${(producto.precio * producto.cantidad).toFixed(2)}`;
        listaCarrito.appendChild(item);
        subtotal += producto.precio * producto.cantidad;
    });

    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    calcularTotalConDescuento(subtotal);
    calcularAhorro(subtotal);  // Llamada para actualizar el ahorro
}

// Aplicar cupón de descuento  //
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
    mostrarCarrito();  // Actualizar el carrito con el descuento y el ahorro aplicados
}

// Calcular el total con el descuento aplicado//
function calcularTotalConDescuento(subtotal) {
    const totalConDescuento = subtotal * (1 - descuentoAplicado);
    document.getElementById('total').textContent = totalConDescuento.toFixed(2);
}

// Calcular el ahorro
function calcularAhorro(subtotal) {
    const ahorro = subtotal * descuentoAplicado;
    document.getElementById('Ahorro').textContent = ahorro.toFixed(2);
}

// Reiniciar el carrito
function reiniciarCarrito() {
    localStorage.removeItem('carrito');
    carrito = [];
    mostrarCarrito();
}

// Inicialización
mostrarProductos();
mostrarCarrito();

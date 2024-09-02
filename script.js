const Empleados = [  
    { Id: 1, Nombre: 'ADMIN' },  
    { Id: 2, Nombre: 'JUAN' },
    { Id: 3, Nombre: 'MARIA' },
    { Id: 4, Nombre: 'NICOLAS' },
  ];
  
  const Productos = [  
    { Codigo: 1, Nombre: 'LECHE', Precio: 2000 },  
    { Codigo: 2, Nombre: 'AZUCAR', Precio: 1700 },
    { Codigo: 3, Nombre: 'MANTECA', Precio: 1300 },
    { Codigo: 4, Nombre: 'CERVEZA', Precio: 1800 },
    { Codigo: 5, Nombre: 'GALLETITAS', Precio: 800 },
    { Codigo: 6, Nombre: 'ALFAJOR', Precio: 650 },
    { Codigo: 7, Nombre: 'PAN', Precio: 2000 },
    { Codigo: 8, Nombre: 'SAL', Precio: 1200 },
    { Codigo: 9, Nombre: 'VINO', Precio: 3100 },   
  ];
  
  const Provedores = [  
    { Id: 10, Empresa: 'ARCOR' },  
    { Id: 20, Empresa: 'SERENISIMA' },
    { Id: 30, Empresa: 'QUILMES' },
    { Id: 40, Empresa: 'FINCAS DEL SUR' },
  ];
  alert('Hola, Bienvenido al software de "Mercadito"!');
  console.log('Hola, Bienvenido al software de "Mercadito"!');
  // Variable para verificar si se encontró el empleado
  let empleadoEncontrado = false;
  let buscarMas = false;
//   logueo(); // Llamada a la función de logueo
//   buscarInfo(); // Llamar a la función para iniciar el proceso  
logueo();
  function buscarInfo() {
    let buscarMas = true; // Inicializar la variable para controlar el bucle
    
    while (buscarMas) {
        let productoEncontrado = false;
        
        // Solicitar al usuario el nombre del producto
        const producto = prompt("Ingrese el Nombre del producto para ver INFO").toUpperCase();
        
        // Buscar el producto en el array
        for (let i = 0; i < Productos.length; i++) {
            if (Productos[i].Nombre === producto) {
                console.log(`INFO DE ${Productos[i].Nombre}! Precio: $ ${Productos[i].Precio}`); // Mostrar información del producto encontrado
                productoEncontrado = true;
                break; // Terminar el bucle al encontrar el producto
            }
        }
        
        if (!productoEncontrado) {
            console.log("No se encontró un producto con ese nombre.");
        }
        
        // Preguntar al usuario si desea buscar más
        buscarMas = confirm("¿Deseas buscar otro producto?");
    }
}

// Asignar la función al clic del botón
document.getElementById('buscarProductoBtn').addEventListener('click', buscarInfo);


  function logueo() { // Repetir hasta que se encuentre el empleado
    while (!empleadoEncontrado) { // Mientras no se haya encontrado el empleado
      const ingresoNom = prompt("Ingrese su Nombre").toUpperCase(); // Convertir el nombre ingresado a mayúsculas
  
      // Recorrer el array de empleados
      for (let i = 0; i < Empleados.length; i++) {
        if (Empleados[i].Nombre === ingresoNom) {
          console.log(`Hola, ${Empleados[i].Nombre}!`); // Saludar al empleado encontrado
          empleadoEncontrado = true; // Se encontró el empleado
          break; // Terminar el bucle al encontrar el empleado
        }
      }
  
      if (!empleadoEncontrado) {
        console.log("No se encontró un empleado con ese nombre. Inténtelo de nuevo.");
      }
    }
  }

  function descuento(){
    const producto = prompt("Ingrese el Nombre del producto para hacer el DESCUENTO").toUpperCase();
    const calculo = '${Productos[i].Precio-(Productos[i].Precio*desc)}!'   
    // Buscar el producto en el array
    for (let i = 0; i < Productos.length; i++) {
        if (Productos[i].Nombre === producto) {
            const desc = prompt("Ingrese el DESCUENTO")/100;
            console.log(`Precio con descuento: ${Productos[i].Precio-(Productos[i].Precio*desc)}!`); // GENERA EL DESCUENTO DE 30%
            productoEncontrado = true;
            break; // Terminar el bucle al encontrar el producto
        }
    }
    
    if (!productoEncontrado) {
        console.log("No se encontró un producto con ese nombre.");
    }
  }

document.getElementById('hacerDescuento').addEventListener('click', descuento);

var ModuloActual = document.getElementById("ModuloActual");
var valorModulo_ = ModuloActual.innerHTML;

var SubModuloActual = document.getElementById("SubModuloActual");
var valorSubModuloActual = SubModuloActual.innerHTML;
var sesion = localStorage.getItem("permisos");

// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// --------------------------------- OCULTAR MODULOS NO PERMITIDOS -----------------------------------

function convertirInicialesAMinusculas(lista) {

  // Crea una nueva lista para almacenar los resultados
  var nuevaLista = [];

  // Recorre cada palabra en la lista y convierte su inicial a minúscula
  for (var i = 0; i < lista.length; i++) {
    var palabra = lista[i];
    var inicialMinuscula = palabra.charAt(0).toLowerCase();
    var restoDePalabra = palabra.slice(1);
    var palabraCompleta = inicialMinuscula + restoDePalabra;

    // Agrega la palabra convertida a la nueva lista
    nuevaLista.push(palabraCompleta);
  }
  // Devuelve la nueva lista con las iniciales convertidas a minúsculas
  return nuevaLista;
}
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ------------------------- DENEGAR ACCESO A MODULOS QUE NO TIENE PERMISOS --------------------------

function ocultarModulosNoAutorizados() {
  var sesion = localStorage.getItem("permisos");

  //Creamos la lista con los modulos
  var listaModulos = [
    "usuarios",
    "roles",
    "proveedores",
    "compras",
    "productos",
    "clientes",
    "ventas",
  ];

  // Obtenemos el valor de los permisos desde la variable local
  var sesion = localStorage.getItem("permisos");
  var listaPermisos = sesion.split(" ,   ");
  var listaPermisos_ = convertirInicialesAMinusculas(listaPermisos);

  //Comprobamos a cuales modulos no tiene acceso referente a la lista principal
  for (let n = 0; n < listaPermisos_.length; n++) {
    var posicion = listaModulos.indexOf(listaPermisos_[n]);
    if (posicion !== -1) {
      listaModulos.splice(posicion, 1);
    }
  }


  //En los modulos que no tiene acceso agregamos un display none para ocultar
  console.log(listaModulos)

  listaModulos.forEach((moduloBorrar) => {
    document.getElementById(moduloBorrar).style.display = "none";
    document.querySelector(`li[moduloM="${moduloBorrar}"]`).style.display = "none";
  });

  //En los modulos que si tiene acceso agregamos un display inline para mostrar
  listaPermisos_.forEach((moduloMostrar) => {
    document.getElementById(moduloMostrar).style.display = "block";
  });



  if (listaModulos.includes(valorModulo) && valorSubModuloActual != 'configuracion') {
    pantalla = document.getElementById("pantalla");
    pantalla.classList.add('compa')

    Swal.fire({
      icon: "error",
      title: "Acceso Denegado",
      text: "Usted no tiene permisos a este modulo",
      confirmButtonText: "Volver al inicio",
      confirmButtonColor: '#3085d6',
    }).then(() => {
      window.location.href = "../../views/dashboard/index.php ";
    });
  }

  //Mostrar nuevamente la pantalla de acceso 
  pantalla = document.getElementsByClassName("pantalla")[0];
  pantalla.classList.add("pantalla_oculta");

}


// ----------------- SESIONES -----------------
const chekearSesion = () => {
  if (sesion == null) {
    Swal.fire({
      icon: "error",
      title: "Acceso Denegado",
      text: "Por favor inicie sesion",
      confirmButtonText: "Iniciar Sesion",
      confirmButtonColor: '#3085d6',
    }).then(() => {
      window.location.href = "../../login/index.html";
    });
  } else if (sesion != null) {

    // Validar nuevamente en el json si se ha modificado algo 
    const validarNuevamente = async () => {
      var id_usuario = localStorage.getItem('id')

      //IR A LA BASE DE DATOS
      const datos = new FormData();
      datos.append("id_usuario", id_usuario)

      var mi_consulta = await fetch("../../controllers/login/validarCambios.php", {
        method: 'POST',
        body: datos
      });

      //TREAER RESPUESTA DE LA BD
      var mi_resultado = await mi_consulta.json();

      //Valida si el usuario se desactivo o no
      if (mi_resultado.estado == 'Inactivo') {
        Swal.fire({
          icon: "error",
          title: "Usuario inactivo",
          text: "Su usuario ha sido desactivado",
          confirmButtonText: "Iniciar Sesion",
          confirmButtonColor: '#3085d6',
        }).then(() => {
          window.location.href = "../../login/index.html";
        });
        localStorage.clear();

      } else {
        localStorage.setItem('nombre', mi_resultado.nombre)
        localStorage.setItem('permisos', mi_resultado.permisos)

        ocultarModulosNoAutorizados()

      }
    }

    validarNuevamente()

  }
};


const cerrarSesion = () => {
  localStorage.clear();
  window.location.href = "../../login/index.html";
};


function formatearInput(input) {
  let valor = input.value.replace(/\./g, ""); // Remover puntos existentes
  valor = valor.replace(/\D/g, ""); // Remover caracteres no numéricos
  valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Insertar puntos cada tres dígitos

  input.value = valor;
}

function formatearNumero(numero) {
  let numeroFormateado = numero.toString(); // Convierte el número a formato de texto

  // Verifica si el número tiene más de 3 dígitos
  if (numeroFormateado.length > 3) {
    // Itera desde el final hacia el principio, insertando un punto cada 3 dígitos
    for (let i = numeroFormateado.length - 3; i > 0; i -= 3) {
      numeroFormateado = numeroFormateado.slice(0, i) + '.' + numeroFormateado.slice(i);
    }
  }

  return numeroFormateado;
}

var btnCerrarSesion = document.getElementById('btnCerrarSesion')
btnCerrarSesion.addEventListener('click', () => {
  Swal.fire({
    title: 'Cerrar sesion?',
    text: "Está seguro que desea salir?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Salir'
  }).then((result) => {
    if (result.isConfirmed) {
      cerrarSesion();
    } else {
      Swal.fire({
        title: 'Cancelado',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      })
    }
  })
})

var btnCerrarSesion_ = document.getElementById('btnCerrarSesion_')
btnCerrarSesion_.addEventListener('click', () => {
  Swal.fire({
    title: 'Cerrar sesion?',
    text: "Está seguro que desea salir?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Salir'
  }).then((result) => {
    if (result.isConfirmed) {
      cerrarSesion();
    } else {
      Swal.fire({
        title: 'Cancelado',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      })
    }
  })
})
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------


// function formatearInput(event) {
//   var input = event.target;
//   var valor = input.value;
//   valor = valor.replace(/\./g, '');
//   var numero = parseFloat(valor);

//   if (!isNaN(numero)) {
//     var numeroFormateado = formatearNumero(numero);
//     input.value = numeroFormateado;
//   }
// }

// function formatearNumero(numero) {
//   var numeroCadena = numero.toString();
//   var partes = numeroCadena.split(".");
//   var parteEntera = partes[0];
//   parteEntera = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
//   var resultado = parteEntera;
//   if (partes.length > 1) {
//     resultado += "." + partes[1];
//   }
//   return resultado;
// }     

// --------------------------- Acordeon ---------------------------
const funcionAcordeon = (p1, p2, p3) => {
  const activador = document.getElementById(p1);
  const modulo = document.getElementById(p2);
  const icon_desplegable = document.getElementById(p3);

  activador.addEventListener("click", function () {
    modulo.classList.toggle("oculto");
    icon_desplegable.classList.toggle("activo");

    var listaModulo = [];
    for (let i = 1; i <= 7; i++) {
      listaModulo.push("modulo" + i);
    }
    listaModulo = listaModulo.filter((modul) => modul != p2);

    listaModulo.forEach((element) => {
      document.getElementById(element).classList.add("oculto");
    });

    var listaFlecha = [];
    for (let i = 1; i <= 7; i++) {
      listaFlecha.push("icon_despliegue" + i);
    }
    listaFlecha = listaFlecha.filter((modul) => modul != p3);

    listaFlecha.forEach((element) => {
      document.getElementById(element).classList.remove("activo");
    });
  });
};

for (let i = 1; i <= 7; i++) {
  valorActivador = "activador" + i.toString();
  valorModulo = "modulo" + i.toString();
  valorDesplegable = "icon_despliegue" + i.toString();
  funcionAcordeon(valorActivador, valorModulo, valorDesplegable);
}



// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ------------------------------ HEADER PANEL CONFIGURACIONES ---------------------------------------


user = document.getElementById('user')
user.addEventListener('click', () => {
  document.getElementById('panel').classList.toggle('panel_oculto')
})


// Remplazar nombre
var nombre = localStorage.getItem("nombre");
var id = localStorage.getItem("id");

if (nombre != null) {
  nombre = nombre.split(' ')
  if (nombre.length == 1) {
    primerNombre = nombre[0]
    primerApellido = ''
  } else if (nombre.length == 2 || nombre.length == 3) {
    primerNombre = nombre[0]
    primerApellido = nombre[1]
  } else if (nombre.length == 4) {
    primerNombre = nombre[0]
    primerApellido = nombre[2]
  } else {
    primerNombre = nombre[0]
    primerApellido = nombre[2]
  }

  nombre = primerNombre + ' ' + primerApellido

  document.getElementById('user_name').innerHTML = nombre
}


// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------

//------------------SideBar------------------------------------------
const body = document.querySelector("body"),
  sidebar = body.querySelector("nav"),
  toggle = body.querySelector(".toggle"),
  searchBtn = body.querySelector(".search-box"),
  modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

// ------------ CUANDO EL SIDEBAR ESTE CERRADO QUE CUAQUIER MODULO LO ABRA ------------------
var clasesDeSidebar = sidebar.className;

if (clasesDeSidebar == "sidebar close") {
  var models = document.querySelectorAll(".model");

  for (var i = 0; i < models.length; i++) {
    models[i].addEventListener("click", function () {
      sidebar.classList.remove("close");
    });
  }
}

nValorModulo = valorModulo_

if (nValorModulo != "configuracion") {
  //------------------------- Color Pagina Actual --------------------------------
  //Atributos
  var ModuloActual = document.getElementById("ModuloActual");
  var valorModulo = ModuloActual.innerHTML;

  Rol = valorModulo;
  fondo = Rol;
  texto = fondo + "_text";
  icon = fondo + "_icon";
  // Fondo
  const Funcionfondo = document.getElementById(fondo);
  Funcionfondo.classList.add("actual");
  //Texto
  const Funciontexto = document.getElementById(texto);
  Funciontexto.classList.add("actual");
  //Icono
  const Funcionicono = document.getElementById(icon);
  Funcionicono.classList.add("actual");

  // SubFuncionActual color -------------------------
  var SubModuloActual = document.getElementById("SubModuloActual");
  var valorSubModuloActual = SubModuloActual.innerHTML;

  let subRol = valorSubModuloActual + "_" + Rol;
  let subfondo = subRol;
  let subtext = subRol + "_text";
  let subicon = subRol + "_icon";

  if (valorSubModuloActual.length != 0) {
    var FuncionSubFondo = document.getElementById(subRol);
    FuncionSubFondo.classList.add("actual");

    //Icono
    const FuncionSubIcono = document.getElementById(subicon);
    FuncionSubIcono.classList.add("actual");

    //Texto
    const FuncionSubTexto = document.getElementById(subtext);
    FuncionSubTexto.classList.add("actual");
  }
}
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------- INVALIDAR TEXTO EN CAMPOS NUMERICOS ------------------------------

function filtroNumero(input) {
  var textoF = input.value.replace(/\D/g, '');
  input.value = textoF
}


// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------

// ---------------------- Menu hamburguesa movil ------------------------------
// selector
var menu = document.querySelector(".nav_movil");

// method
function toggleMenu(event) {
  this.classList.toggle("is-active");
  document.querySelector(".menuppal").classList.toggle("is_active");
  event.preventDefault();
}
// event
menu.addEventListener("click", toggleMenu, false);

// ------------------------- Menu hamburguera -------------------------

const funcionAcordeon_ = (p1_, p2_) => {
  const activador_ = document.getElementById(p1_);
  const modulo_ = document.getElementById(p2_);

  activador_.addEventListener("click", () => {
    modulo_.classList.toggle("oculto_");

    var listaModulo = [];
    for (let i = 1; i <= 7; i++) {
      listaModulo.push("modulo" + "_" + i);
    }

    listaModulo = listaModulo.filter((modul) => modul != p2_);

    listaModulo.forEach((element) => {
      document.getElementById(element).classList.add("oculto_");
    });
  });
};

for (let i = 1; i <= 7; i++) {
  valorActivador_ = "activador_" + i.toString();
  valorModulo_ = "modulo_" + i.toString();
  funcionAcordeon_(valorActivador_, valorModulo_);
}



if (nValorModulo != 'configuracion') {
  //------------------------- Color Pagina Actual movil --------------------------------
  const FuncionModuloActualMobile = document.querySelector("." + valorModulo);
  FuncionModuloActualMobile.classList.add("actual_");


  //------------------------- SubFuncionActual movil --------------------------------
  const element = valorSubModuloActual + "_" + valorModulo + "_";

  const SubFuncionModulo = document.getElementById(element);

  if (valorModulo != "inicio") {

    SubFuncionModulo.classList.add("actual_");
  }
}

// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------

// --- Titulo Header -------------------------------
const PrimeraMayus = (palabra) => {
  var primerMayus = palabra.charAt(0).toUpperCase();
  var todoMayus = primerMayus + palabra.slice(1);

  return todoMayus;
};

if (nValorModulo != 'configuracion') {
  var tituloHeader = PrimeraMayus(valorSubModuloActual) + " " + PrimeraMayus(Rol);
  var titulo = (document.getElementById("titulo").innerHTML = tituloHeader);
}
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------

// -------------------------------- Carrito js ------------------------------

// if (valorModulo == "compras" || valorModulo == "ventas") {
//   var contador = 1;
//   var contis = document.getElementById("contador");



//   const Agregar = () => {
//     var contenido = document.getElementById("contenido");
//     var p = document.createElement("div");
//     contador = contador + 1;
//     p.setAttribute("id", `formulario${contador}`);


//     if (valorModulo == "compras") {
//       p.innerHTML = `
//         <br>

//         <main>

//             <div class="formulario">

//                 <h2 >Compra ${contador}</h2>
//                 <div class="formulario__grupo" id="grupo__password">
//                     <div class="formulario__grupo-input">


//                     </div>
//                 </div>


//                 <!-- Seleccione una categoria -->
//                 <div class="formulario__grupo" id="grupo__password">
//                     <label for="password" class="formulario__label">Seleccione una categoria</label>
//                     <div class="formulario__grupo-input">
//                         <select class="formulario__input categorias_producto" name="place" id="categoria_producto_${contador
//         }">
//                             <option value="0">Seleccione una categoria</option>
//                             <option value="1">Bicicleta alta gama</option>
//                             <option value="2">Bicicleta baja gama</option>
//                         </select>

//                     </div>
//                 </div>

//                 <!-- Seleccione un producto -->
//                 <div class="formulario__grupo" id="grupo__password2">
//                     <label for="password2" class="formulario__label">Seleccione un producto</label>
//                     <div class="formulario__grupo-input">
//                         <select class="formulario__input productos_compra" name="place" id="producto_compra_${contador
//         }">
//                             <option value="0">seleccione un producto</option>
//                             <option value="1">Manubrio</option>
//                             <option value="2">Pedales</option>
//                         </select>
//                     </div>

//                 </div>
//                 <!-- Cantidad producto -->
//                 <div class="formulario__grupo" id="grupo__password2">
//                     <label for="password2" class="formulario__label">Cantidad de producto</label>
//                     <div class="formulario__grupo-input">
//                         <input type="text" class="formulario__input cantidades_producto" name="" id="cantidad_producto_${contador} oninput="filtroNumero(this)"">
//                     </div>

//                 </div>

//                 <!-- Valor unitario producto -->
//                 <div class="formulario__grupo" id="grupo__correo">
//                     <label for="correo" class="formulario__label">Precio del producto unitario</label>
//                     <div class="formulario__grupo-input">
//                         <input type="email" class="formulario__input preciosU_producto" name="correo" id="precioU_producto_${contador
//         }"
//                   >
//                     </div>

//                 </div>

//         </main> `;
//     } else if (valorModulo == "ventas") {
//       p.innerHTML = `
//         <br>

//         <main>

//             <div class="formulario">

//                 <h2 >Venta ${contador}</h2>
//                 <div class="formulario__grupo" id="grupo__password">
//                     <div class="formulario__grupo-input">


//                     </div>
//                 </div>


//                 <!-- Grupo: Contraseña -->
//                 <div class="formulario__grupo" id="grupo__password">
//                     <label for="password" class="formulario__label">Seleccione una categoria</label>
//                     <div class="formulario__grupo-input">
//                         <select class="formulario__input" name="place" id="select${contadorCaja + 1
//         }">
//                             <option value="0">Seleccione una categoria</option>
//                             <option value="1">Bicicleta alta gama</option>
//                             <option value="2">Bicicleta baja gama</option>
//                         </select>

//                     </div>
//                 </div>

//                 <!-- Grupo: Contraseña 2 -->
//                 <div class="formulario__grupo" id="grupo__password2">
//                     <label for="password2" class="formulario__label">Seleccione un producto</label>
//                     <div class="formulario__grupo-input">
//                         <select class="formulario__input" name="place" id="select${contadorCaja + 2
//         }">
//                             <option value="0">seleccione un producto</option>
//                             <option value="1">Manubrio</option>
//                             <option value="2">Pedales</option>
//                         </select>
//                     </div>

//                 </div>
//                 <!-- Grupo: Contraseña 2 -->
//                 <div class="formulario__grupo" id="grupo__password2">
//                     <label for="password2" class="formulario__label">Cantidad de producto</label>
//                     <div class="formulario__grupo-input">
//                         <input type="text" class="formulario__input" name="" id="input${contadorCaja - 1
//         }">
//                     </div>

//                 </div>

//                 <!-- Grupo: Correo Electronico -->
//                 <div class="formulario__grupo" id="grupo__correo">
//                     <label for="correo" class="formulario__label">Precio del producto unitario</label>
//                     <div class="formulario__grupo-input">
//                         <input type="email" class="formulario__input" name="correo" id="input${contadorCaja}"
//                   >
//                     </div>

//                 </div>

//         </main> `;
//     }



//     contenido.appendChild(p);

//     //Sirve para agregar a la base de datos n elemento y esto los cuenta
//     // contis.setAttribute('value',contador)

//     // ---------------------------- ALERTA CARRITO -----------------------------------
//     Swal.fire({
//       //Elementos de la alerta
//       text: "Agregado con exito!",
//       icon: "success",
//       timer: 800,
//       timerProgressBar: true,
//       showConfirmButton: false,
//       width: "40%",
//       // Posicion
//       position: "bottom-end",
//     });

//     if (contador != 1) {
//       botonMenos.classList.remove("close");
//     }
//   };

//   const Remover = () => {
//     // ------------- Alerta carrito ---------
//     const swalWithBootstrapButtons = Swal.mixin({
//       customClass: {
//         confirmButton: "btn btn-success",
//         cancelButton: "btn btn-danger",
//       },
//       buttonsStyling: true,
//     });
//     // ------------- Alerta carrito ---------
//     swalWithBootstrapButtons
//       .fire({
//         title: "Elimnar compra",
//         text: "¿Estás seguro que deseas eliminar está compra?",
//         icon: "warning",
//         showCancelButton: true,

//         cancelButtonColor: "#A0A0A0",
//         confirmButtonText: "Eliminar",
//         confirmButtonColor: "#f53131",

//         cancelButtonText: "Cancelar",
//       })
//       .then((result) => {
//         if (result.isConfirmed) {
//           for (let i = 1; i <= contador; i++) {
//             formularios = [];
//             formularios[i] = document.getElementById(`formulario${i}`);
//           }
//           contador = parseInt(contador);
//           if (contador != 1) {
//             formularios[contador].parentNode.removeChild(formularios[contador]);
//             contador = contador - 1;
//           }

//           if (contador == 1) {
//             botonMenos.classList.add("close");
//           }

//           //Mensaje exito eliminacion
//           swalWithBootstrapButtons.fire({
//             text: "Se ha eliminado exitosamente!",
//             icon: "success",
//             timer: 800,
//             timerProgressBar: true,
//             showConfirmButton: false,
//             width: "40%",
//             position: "bottom-end",
//           });
//         } else if (result.dismiss === Swal.DismissReason.cancel) {
//           swalWithBootstrapButtons.fire({
//             text: "Cancelando accion",
//             icon: "error",
//             timer: 800,
//             timerProgressBar: true,
//             showConfirmButton: false,
//             width: "40%",
//             position: "bottom-end",
//           });
//         }
//       });

//     // contis.setAttribute('value',contador)
//   };
//   if (valorSubModuloActual == "registrar") {
//     var botonMas = document.getElementById("boton+");
//     botonMas.addEventListener("click", Agregar);

//     var botonMenos = document.getElementById("boton-");
//     botonMenos.addEventListener("click", Remover);
//   }
// }

// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------

//----------------------------- ALERTAS REGISTRO------------------------------------------------

// FormularioModulo = (cantidadSelect, cantidadInput) => {
//     requisitos = 0
//     sumatoria = ""
//     total = cantidadInput + cantidadSelect
//     const selects = [];
//     for (let i = 1; i <= cantidadSelect; i++) {
//         select = 'select' + i.toString()
//         selects[i] = select
//     }
//     console.log("Sigue funcionando")
//     const inputs = [];
//     for (let i = 1; i <= cantidadInput; i++) {
//         input = 'input' + i.toString()
//         inputs[i] = input
//     }
//     console.log("Sigue funcionando")
//     for (let n = 1; n <= cantidadSelect; n++) {
//         sumatoria = sumatoria + document.getElementById(selects[n]).value;
//     }
//     for (let n = 1; n <= cantidadInput; n++) {
//         sumatoria = sumatoria + document.getElementById(inputs[n]).value.length;
//     }
//     console.log("Sigue funcionando")
//     console.log(sumatoria)

//     for (let i = 0; i <= total; i++) {
//         if (sumatoria[i] == 0) {
//             requisitos = 1
//         }
//     }
//     return (requisitos)
// }

// //--- VALIDACION FORMULARIO RELLENO

// const AlertaRegistro = (contador, valorModulo) => {
//   switch (valorModulo) {
//     case "clientes":
//       cantidadSelect = 1;
//       cantidadInput = 4;
//       break;

//     case "compras":
//       cantidadSelect = 1 + 2 * contador;
//       cantidadInput = 2 * contador;
//       break;

//     case "productos":
//       cantidadSelect = 1;
//       cantidadInput = 1;
//       break;

//     // case "proveedores":
//     //     cantidadSelect = 1
//     //     cantidadInput = 2
//     //     break;

//     // case "roles":
//     //     cantidadInput = 1
//     //     break;

//     case "usuarios":
//       cantidadSelect = 2;
//       cantidadInput = 5;
//       break;

//     case "ventas":
//       cantidadSelect = 2 * contador;
//       cantidadInput = 2 * contador;
//       break;
//   }
// };

// //     if (FormularioModulo(cantidadSelect, cantidadInput)) {
// //         Swal.fire({
// //             title: "Campos vacios ",
// //             text: "Por favor rellene todos los campos",
// //             icon: "warning",
// //             confirmButtonColor: '#118dd5',
// //         })
// //     } else {
// //         Swal.fire({
// //             //Contenido de la alerta
// //             title: "Registro exitoso",
// //             text: "Se ha registrado una venta",
// //             icon: "success",
// //             confirmButtonText: "Cofirmar",
// //             timer: 5000,
// //             timerProgressBar: true,
// //             // Estilos de las alertas (Botones)
// //             showConfirmButton: false,
// //             confirmButtonColor: '#118dd5',
// //             confirmButtonAriaLabel: 'Confirmar',
// //         })
// //         // customClass: {} Añadir clases del css a la alerta
// //     }
// // }

// // ---------------- LLAMA LA VALIDACION DEL FORMULARIO ---------------------------------------

// if (valorSubModuloActual == "registrar" && valorModulo != "roles") {
//   const botonRegistrar = document.getElementById("registrar");
//   botonRegistrar.addEventListener("click", () =>
//     AlertaRegistro(contador, valorModulo)
//   );
// }

// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
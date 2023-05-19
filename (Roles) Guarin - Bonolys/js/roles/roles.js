// ----------------------------- TOGGLES DE REGISTRAR ------------------------------------

var ModuloActual = document.getElementById("ModuloActual");
var valorModulo = ModuloActual.innerHTML;

var SubModuloActual = document.getElementById("SubModuloActual");
var valorSubModuloActual = SubModuloActual.innerHTML;

if (valorSubModuloActual == "registrar") {
  modulos = [
    "usuarios",
    "roles",
    "proveedores",
    "compras",
    "productos",
    "clientes",
    "ventas",
  ];

  const Registrar = async (nombreRol_, inputUsuarios_, inputRoles_,
    inputProveedores_, inputCompras_, inputProductos_, inputClientes_, inputVentas_) => {

    // Se envian los datos en .json ----------
    const datosRg = new FormData();
    datosRg.append("nombreRol", nombreRol_);
    datosRg.append("permiso_usuarios", inputUsuarios_);
    datosRg.append("permiso_roles", inputRoles_);
    datosRg.append("permiso_proveedores", inputProveedores_);
    datosRg.append("permiso_compras", inputCompras_);
    datosRg.append("permiso_productos", inputProductos_);
    datosRg.append("permiso_clientes", inputClientes_);
    datosRg.append("permiso_ventas", inputVentas_);

    var registrarRoles = await fetch("../../controllers/roles/registrar.php", {
      method: 'POST',
      body: datosRg
    });


    Swal.fire({
      title: 'Rol registrado! ',
      text: 'Se ha registrado un rol',
      icon: "success",
      confirmButtonText: "Cofirmar",
      timer: 1200,
      timerProgressBar: true,
      position: "bottom-end",
      showConfirmButton: false,
      confirmButtonColor: '#118dd5',
      confirmButtonAriaLabel: 'Confirmar',
    }).then(() => {
      window.location.href = '../../views/roles/listar.php'
    });



  }


  const Validar = async () => {
    console.log("holis")
    var nombreRol = document.getElementById('nombreRol').value;

    (document.getElementById('toggle_Us').checked) ? inputUsuarios = 'usuarios' : inputUsuarios = '';
    (document.getElementById('toggle_Rl').checked) ? inputRoles = 'roles' : inputRoles = '';
    (document.getElementById('toggle_Prv').checked) ? inputProveedores = 'proveedores' : inputProveedores = '';
    (document.getElementById('toggle_Cr').checked) ? inputCompras = 'compras' : inputCompras = '';
    (document.getElementById('toggle_Prd').checked) ? inputProductos = 'productos' : inputProductos = '';
    (document.getElementById('toggle_Cl').checked) ? inputClientes = 'clientes' : inputClientes = '';
    (document.getElementById('toggle_Ve').checked) ? inputVentas = 'ventas' : inputVentas = '';

    console.log(inputUsuarios)
    console.log(inputRoles)
    console.log(inputProveedores)
    console.log(inputCompras)
    console.log(inputProductos)
    console.log(inputClientes) 
    console.log(inputVentas) 
  

    if (nombreRol.trim() === ""){
        Swal.fire({
          title: "Nombre vacio",
          text: "Por favor ingrese un nombre de rol",
          icon: "warning",
          confirmButtonColor: "#118dd5",
        });
      } else if(
        inputUsuarios.trim() === "" &&
        inputRoles.trim() === "" &&
        inputProveedores.trim() === "" &&
        inputCompras.trim() === "" &&
        inputProductos.trim() === "" &&
        inputClientes.trim() === "" &&
        inputVentas.trim() === "")  {
          Swal.fire({
            title: "Roles inactivos",
            text: "Por favor active al menos un rol",
            icon: "warning",
            confirmButtonColor: "#118dd5",
        })

      }else{
      //----------- Validar si estan repetidos -------

      // Solo se envian los necesarios ----------
      const datosCl = new FormData();
      datosCl.append("nombreRol", nombreRol);


      var consultaRoles = await fetch("../../controllers/roles/repetidos.php", {
        method: 'POST',
        body: datosCl
      });

      //Traer mensaje de respuesta desde PHP -----
      var resultado = await consultaRoles.json();

      //---- Si alguno esta repetido ERROR
      if (resultado.success == false) {
        Swal.fire({
          title: resultado.title,
          text: resultado.mensaje,
          icon: "warning",
          confirmButtonColor: "#118dd5",
        });
      } else {
        Registrar(nombreRol, inputUsuarios, inputRoles, inputProveedores,
          inputCompras, inputProductos, inputClientes, inputVentas)
      }
    }

  }
  //Llamamos el boton registrar -------------
  var registrar = document.getElementById("registrar");
  registrar.addEventListener("click", Validar);

}


// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// --------------------------------------- LISTAR ----------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------



if (valorSubModuloActual == "listar") {

  // // ---------------------- Funcion buscador dinamico (Roles) -----------------------------
  var buscador = document.getElementById("buscador");

  //Datos para usar Solo Activos
  var inactivos = document.querySelectorAll(".Inactivo");
  var activos = document.querySelectorAll(".Activo");
  var cantInactivos = inactivos.length;
  var cantActivos = activos.length;

  // ---------- Valores por los que quiera buscar
  // nombreRol -------
  var nombreRol = document.querySelectorAll(".nombreRol");
  var similitudNombre = "";
  var ListaResultadosNombre = [];

  // idRol -------
  var idRol = document.querySelectorAll(".idRol");
  var similitudId = "";
  var ListaResultadosID = [];


  //Funcion comparadora
  buscador.addEventListener("keyup", () => {
    var busqueda = buscador.value.toLowerCase();
    ListaResultadosNombre = [];
    ListaResultadosID = [];

    var sinRes = 0;

    // Buscar por ID
    idRol.forEach((resultados) => {
      for (let i = 0; i < buscador.value.length; i++) {
        similitudId = similitudId + resultados.innerHTML[i];
      }
      ListaResultadosID.push(similitudId);
      similitudId = "";
    });

    // Buscar por nombre del rol
    nombreRol.forEach((resultados) => {
      for (let i = 0; i < buscador.value.length; i++) {
        similitudNombre =
          similitudNombre + resultados.innerHTML.toLowerCase()[i];
      }
      ListaResultadosNombre.push(similitudNombre);
      similitudNombre = "";
    });

    // Comparacion final ---
    for (let n = 0; n < ListaResultadosNombre.length; n++) {
      if (
        ListaResultadosNombre[n] == busqueda ||
        ListaResultadosID[n] == busqueda
      ) {
        document
          .getElementsByClassName("_" + (n + 1))[0]
          .classList.remove("inexistente");
        console.log(document.getElementsByClassName("_" + (n + 1))[0]);
      } else {
        document
          .getElementsByClassName("_" + (n + 1))[0]
          .classList.add("inexistente");
        sinRes += 1;
      }
    }
    var vari = true;

    for (let m = 0; m < ListaResultadosNombre.length; m++) {
      var ejem = document.getElementsByClassName("_" + (m + 1))[0];

      texto = ejem.className;
      letra = " ";
      cont = 0;
      for (i = 0; i < texto.length; i++) {
        let = texto.substring(i, i + 1);
        if (letra ==
          let) {
          cont = cont + 1;
        }
      }
      console.log(cont);

      if (cont == 1) {
        vari = false;
      }
    }

    console.log(vari);
    if (vari) {
      document.getElementById("sinResult").innerHTML =
        "Sin resultados de busqueda";
    } else {
      document.getElementById("sinResult").innerHTML = "";
    }
  });

  // ----------------  Boton solo activos -----------------
  for (let index = 0; index < inactivos.length; index++) {
    inactivos[index].classList.add("inexistente_");
  }

  var botonVer = document.getElementById("inactivos");
  var cont = 0;
  botonVer.addEventListener("click", () => {
    cont += 1;
    for (let index = 0; index < inactivos.length; index++) {
      inactivos[index].classList.toggle("inexistente_");
    }
    if (cont % 2 == 1) {
      botonVer.innerHTML = "Activos";
    } else {
      botonVer.innerHTML = "Todos";
    }
  });



  botonesEditar = []
  // ---------------------- Listas nombres ----------------
  inputs_roles = []
  listaInputsNombres = []

  // --------------------- Swichts Usuarios -------------------
  swichts_usuarios = []
  listaSwichtUsuarios = []
  // --------------------- Swichts Roles -------------------
  swichts_roles = []
  listaSwichtRoles = []
  // --------------------- Swichts Proveedores -------------------
  swichts_proveedores = []
  listaSwichtProveedores = []
  // --------------------- Swichts Compras -------------------
  swichts_compras = []
  listaSwichtCompras = []
  // --------------------- Swichts Productos -------------------
  swichts_productos = []
  listaSwichtProductos = []
  // --------------------- Swichts Clientes -------------------
  swichts_clientes = []
  listaSwichtClientes = []
  // --------------------- Swichts Ventas -------------------
  swichts_ventas = []
  listaSwichtVentas = []



  for (let x = 0; x < totalReg; x++) {
    // ------------------------ BOTON ----------------------------------------
    botonEditar = document.getElementsByClassName(`guardarRoles${x + 1}`)[0];
    botonesEditar.push(botonEditar)

    contClick = 0
    botonesEditar[x].addEventListener("click", () => {


      if (listaInputsNombres[0][x].value == "" ||
        (
          listaSwichtUsuarios[0][x].value == "" &&
          listaSwichtRoles[0][x].value == "" &&
          listaSwichtProveedores[0][x].value == "" &&
          listaSwichtCompras[0][x].value == "" &&
          listaSwichtProductos[0][x].value == "" &&
          listaSwichtClientes[0][x].value == "" &&
          listaSwichtVentas[0][x].value == "")
      ) {

        if (listaInputsNombres[0][x].value == "") {
          Swal.fire({
            title: "Nombre vacio",
            text: "No se puede ingresar un nombre vacio",
            icon: "warning",
            confirmButtonColor: "#118dd5",
          });
        } else {
          Swal.fire({
            title: "Roles inactivos",
            text: "Por favor active al menos un permiso",
            icon: "warning",
            confirmButtonColor: "#118dd5",
          });

        }

      }
      else if (arrayNombres[x].includes((listaInputsNombres[0][x].value.toLowerCase()))) {
        Swal.fire({
          title: "Error de nombre",
          text: "Nombre de rol ya en uso",
          icon: "warning",
          confirmButtonColor: "#118dd5",
        });

      } else {
        contClick += 1
        if (contClick != 2) {
          Swal.fire({
            //Contenido de la alerta
            title: "Registro exitoso",
            text: "Se ha registrado una venta",
            icon: "success",
            confirmButtonText: "Cofirmar",
            timer: 1500,
            timerProgressBar: true,
            width: "40%",
            height: "30%",
            position: "bottom-end",
            // Estilos de las alertas (Botones)
            showConfirmButton: false,
            confirmButtonColor: "#118dd5",
            confirmButtonAriaLabel: "Confirmar",
          });
        }
        setTimeout(() => {
          botonesEditar[x].setAttribute('type', 'submit')
          botonesEditar[x].click()

        }, "1000");





      }
    });





  }

  // -------------------------------- Ventana actualizar roles -----------------------------------
  var totalReg = document.querySelectorAll(".ventaActualizarRoles").length;

  actualizarRoles = [];
  cerrarVentanas = [];
  ventaActualizarRoless = [];

  for (let o = 0; o < totalReg; o++) {
    actualizarRoles.push(
      document.querySelector(".botonActualizarRol" + (o + 1))
    );
    cerrarVentanas.push(document.querySelector(".cerrarVentana" + (o + 1)));
    ventaActualizarRoless.push(
      document.querySelector(".ventaActualizarRoles" + (o + 1))
    );

    actualizarRoles[o].addEventListener("click", (e) => {
      e.preventDefault();
      ventaActualizarRoless[o].classList.add("ventaActualizarRoles--show");

     
    });

    cerrarVentanas[o].addEventListener("click", (e) => {
      e.preventDefault();
      ventaActualizarRoless[o].classList.remove("ventaActualizarRoles--show");
    });
  }

  // --------------------------------  Activar roles en ventana modal -----------------------------------

  permisos_roles = document.getElementsByClassName('permisos_rol')

console.log(permisos_roles[0].value)
  ArrayPermisos =permisos_roles[0].innerHTML.split(',')

  console.log(ArrayPermisos)



  Toggle_usuarios = document.getElementById('toggle_Us_1')
  Toggle_roles = document.getElementById('toggle_Rl_1')
  Toggle_proveedores = document.getElementById('toggle_Prv_1')
  Toggle_compras = document.getElementById('toggle_Cr_1')
  Toggle_productos = document.getElementById('toggle_Prd_1')
  Toggle_clientes = document.getElementById('toggle_Cl_1')
  Toggle_ventas = document.getElementById('toggle_Ve_1')

  console.log(Toggle_usuarios)


  

}
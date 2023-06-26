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
    var nombreRol = document.getElementById('nombreRol').value.trim();

    (document.getElementById('toggle_Us').checked) ? inputUsuarios = 'usuarios' : inputUsuarios = '';
    (document.getElementById('toggle_Rl').checked) ? inputRoles = 'roles' : inputRoles = '';
    (document.getElementById('toggle_Prv').checked) ? inputProveedores = 'proveedores' : inputProveedores = '';
    (document.getElementById('toggle_Cr').checked) ? inputCompras = 'compras' : inputCompras = '';
    (document.getElementById('toggle_Prd').checked) ? inputProductos = 'productos' : inputProductos = '';
    (document.getElementById('toggle_Cl').checked) ? inputClientes = 'clientes' : inputClientes = '';
    (document.getElementById('toggle_Ve').checked) ? inputVentas = 'ventas' : inputVentas = '';


    if (nombreRol.trim() === "") {
      Swal.fire({
        title: "Nombre vacio",
        icon: "warning",
        confirmButtonColor: "#118dd5",
        text: "Por favor ingrese un nombre de rol"
      });

    } else if (
      inputUsuarios.trim() === "" &&
      inputRoles.trim() === "" &&
      inputProveedores.trim() === "" &&
      inputCompras.trim() === "" &&
      inputProductos.trim() === "" &&
      inputClientes.trim() === "" &&
      inputVentas.trim() === "") {
      Swal.fire({
        title: "Roles inactivos",
        text: "Por favor active al menos un rol",
        icon: "warning",
        confirmButtonColor: "#118dd5",
      })

    } else {
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

      } else if (arrayNombres[x].includes((listaInputsNombres[0][x].value.toLowerCase()))) {
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


      // ======================== VALIDAR SI HAY USUARIOS CON ESE ROL =========================================
      const validarCamposAsc = async () => {
        // console.log("ENTRRE EN EL BOTON")
        idRol = document.getElementsByClassName('idRol_')[o].value
        estadoRol_ = document.getElementsByClassName('estadoRolActualizado')[o]
        // console.log(idRol)

        // Se envian los datos en .json ----------
        const datosVal = new FormData();
        datosVal.append("idRol", idRol);


        var consultaEliminarAs = await fetch("../../controllers/roles/validarAsociados.php", {
          method: 'POST',
          body: datosVal
        });

        //Traer mensaje de respuesta desde PHP -----
        var resultadoAsc = await consultaEliminarAs.json();

        if (resultadoAsc['success'] != true) {
          console.log('No se encontraron registros')
          // Se agrega la clase que ocutla el boton
          btnEliminar = document.getElementsByClassName('eliminar');
          btnEliminar[o].style.display = 'none'
          estadoRol_.disabled = true

        }
      }
      validarCamposAsc()

    });

    cerrarVentanas[o].addEventListener("click", (e) => {
      e.preventDefault();
      ventaActualizarRoless[o].classList.remove("ventaActualizarRoles--show");
    });
  }

  boton_admi = actualizarRoles[0]
  boton_admi.classList.remove('Btn')
  boton_admi.classList.add('btn-admin')

  boton_admi_copia = boton_admi.cloneNode(true)

  boton_admi.parentNode.replaceChild(boton_admi_copia, boton_admi)

  boton_admi_copia.addEventListener('click', () => {
    Swal.fire({
      //Contenido de la alerta
      title: "Lo sentimos",
      text: "No puedes editar el rol administrador",
      icon: "warning",
      confirmButtonText: "Cofirmar",
      timer: 4500,
      timerProgressBar: true,
      width: "40%",
      height: "30%",

      // Estilos de las alertas (Botones)
      showConfirmButton: true,
      confirmButtonColor: "#118dd5",
      confirmButtonAriaLabel: "Aceptar",
    });


  })


  // --------------------------------  Activar roles en ventana modal -----------------------------------
  Validar = async (id, nombreRol) => {
    //----------- Validar si estan repetidos -------
    // Solo se envian los necesarios ----------
    const datosRl = new FormData();
    datosRl.append("idRol", id);
    datosRl.append("nombreRol", nombreRol);


    var consultaRoles = await fetch("../../controllers/roles/validarActualizar.php", {
      method: 'POST',
      body: datosRl
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
    }

    return resultado.success
  }

  const editar = async (_id, _nombreRol, _estadoRol, _inputUs, _inputRol, _inputPro, _inputCom, _inputProd, _inputCl, _inputven) => {


    // Se envian los datos en .json ----------
    const datosAr = new FormData();
    datosAr.append("idRol", _id);
    datosAr.append("nombreRol", _nombreRol);
    datosAr.append("estadoRol", _estadoRol);
    datosAr.append("permiso_usuarios", _inputUs);
    datosAr.append("permiso_roles", _inputRol);
    datosAr.append("permiso_proveedores", _inputPro);
    datosAr.append("permiso_compras", _inputCom);
    datosAr.append("permiso_productos", _inputProd);
    datosAr.append("permiso_clientes", _inputCl);
    datosAr.append("permiso_ventas", _inputven);

    var consultaRoles = await fetch("../../controllers/roles/actualizar.php", {
      method: 'POST',
      body: datosAr
    });

    //Traer mensaje de respuesta desde PHP -----
    var resultado = await consultaRoles.json();

    Swal.fire({
      title: 'Rol actualizado! ',
      text: 'Se ha actualizado un Rol',
      icon: "success",
      confirmButtonText: "Cofirmar",
      timer: 1200,
      timerProgressBar: true,
      position: "center",
      showConfirmButton: false,
      confirmButtonColor: '#118dd5',
      confirmButtonAriaLabel: 'Confirmar',
    }).then(() => {
      window.location.href = '../../views/roles/listar.php'
    });
  }

  permisos_roles = document.getElementsByClassName('permisos_rol')

  for (let n = 1; n <= totalReg; n++) {
    permiso = permisos_roles[n - 1].value
    console.log(permiso)

    const arrayPermisos = permiso.split(",").map(item => item.trim());

    console.log(arrayPermisos);

    Toggle_usuarios = document.getElementById('toggle_Us_' + n)
    Toggle_roles = document.getElementById('toggle_Rl_' + n)
    Toggle_proveedores = document.getElementById('toggle_Prv_' + n)
    Toggle_compras = document.getElementById('toggle_Cr_' + n)
    Toggle_productos = document.getElementById('toggle_Prd_' + n)
    Toggle_clientes = document.getElementById('toggle_Cl_' + n)
    Toggle_ventas = document.getElementById('toggle_Ve_' + n)

    if (arrayPermisos.includes('Usuarios')) {
      Toggle_usuarios.checked = true
    }
    if (arrayPermisos.includes('Roles')) {
      Toggle_roles.checked = true
    }
    if (arrayPermisos.includes('Proveedores')) {
      Toggle_proveedores.checked = true
    }
    if (arrayPermisos.includes('Compras')) {
      Toggle_compras.checked = true
    }
    if (arrayPermisos.includes('Productos')) {
      Toggle_productos.checked = true
    }
    if (arrayPermisos.includes('Clientes')) {
      Toggle_clientes.checked = true
    }
    if (arrayPermisos.includes('Ventas')) {
      Toggle_ventas.checked = true
    }
  }


  botonesGuardar = document.getElementsByClassName('guardarCambios')

  for (let m = 0; m < totalReg; m++) {
    botonesGuardar[m].addEventListener('click', () => {
      // -----------------------------
      console.log('Click en boton: ' + (m + 1))
      nombre = document.getElementsByClassName('nombreRolActualizado')[m].value
      id = document.getElementsByClassName('idRol_')[m].value

      estado = document.getElementsByClassName('estadoRolActualizado')[m].value

      console.log(estado)
      if (document.getElementById('toggle_Us_' + (m + 1)).checked) {
        inputUsuarios = 'usuarios'
      } else {
        inputUsuarios = ''
      }
      if (document.getElementById('toggle_Rl_' + (m + 1)).checked) {
        inputRoles = 'roles'
      } else {
        inputRoles = ''
      }
      if (document.getElementById('toggle_Prv_' + (m + 1)).checked) {
        inputProveedores = 'proveedores'
      } else {
        inputProveedores = ''
      }
      if (document.getElementById('toggle_Cr_' + (m + 1)).checked) {
        inputCompras = 'compras'
      } else {
        inputCompras = ''
      }
      if (document.getElementById('toggle_Prd_' + (m + 1)).checked) {
        inputProductos = 'productos'
      } else {
        inputProductos = ''
      }
      if (document.getElementById('toggle_Cl_' + (m + 1)).checked) {
        inputClientes = 'clientes'
      } else {
        inputClientes = ''
      }
      if (document.getElementById('toggle_Ve_' + (m + 1)).checked) {
        inputVentas = 'ventas'
      } else {
        inputVentas = ''
      }

      if (nombre.trim() === "") {
        Swal.fire({
          title: "Nombre vacio",
          icon: "warning",
          confirmButtonColor: "#118dd5",
          text: "Por favor ingrese un nombre de rol"
        });

      } else if (
        inputUsuarios.trim() === "" &&
        inputRoles.trim() === "" &&
        inputProveedores.trim() === "" &&
        inputCompras.trim() === "" &&
        inputProductos.trim() === "" &&
        inputClientes.trim() === "" &&
        inputVentas.trim() === "") {
        Swal.fire({
          title: "Roles inactivos",
          text: "Por favor active al menos un rol",
          icon: "warning",
          confirmButtonColor: "#118dd5",
        })

      } else {
        Validar(id, nombre).then((resultado) => {
          const miVariable = resultado;
          if (miVariable) {
            editar(id, nombre, estado, inputUsuarios, inputRoles, inputProveedores, inputCompras, inputProductos, inputClientes, inputVentas)
          }
        });
      }

    })

  }

  // Se llama el boton eliminar 
  eliminar = document.getElementsByClassName('eliminar')
  // console.log(botonesGuardar)

  for (let y = 0; y < totalReg; y++) {
    eliminar[y].addEventListener('click', () => {

      const eliminarReg = async () => {
        idRol = document.getElementsByClassName('idRol_')[y].value
        // Solo se envian los necesarios ----------
        const datosEl = new FormData();
        datosEl.append("idRol", idRol);

        var eliminarDato = await fetch("../../controllers/roles/eliminar.php", {
          method: 'POST',
          body: datosEl
        });

        //Traer mensaje de respuesta desde PHP -----
        var resultado = await eliminarDato.json();

        Swal.fire({
          title: resultado.title,
          text: resultado.mensaje,
          icon: "success",
          confirmButtonText: "Cofirmar",
          timer: 1200,
          timerProgressBar: true,
          position: "center",
          showConfirmButton: false,
          confirmButtonColor: '#118dd5',
          confirmButtonAriaLabel: 'Confirmar',
        }).then(() => {
          window.location.href = '../../views/roles/listar.php'
        });

      }

      Swal.fire({
        title: 'Eliminar registro',
        text: "¿Está seguro que desea eliminar este registro?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          eliminarReg()
        } else {
          Swal.fire({
            title: 'Cancelado',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }
          )
        }
      })



    })
  }

}
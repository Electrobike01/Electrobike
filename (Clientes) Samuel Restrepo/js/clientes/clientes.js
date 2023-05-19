var ModuloActual = document.getElementById("ModuloActual");
var valorModulo = ModuloActual.innerHTML;

var SubModuloActual = document.getElementById("SubModuloActual");
var valorSubModuloActual = SubModuloActual.innerHTML;

// ----------------------- DIVIDIR MODULOS EN REGISTRAR Y LISTAR -------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// --------------------------------------- REGISTRAR -------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------

if (valorSubModuloActual == "registrar") {

  // ----- Se crea el metodo Registrar ----------
  const Registrar = async (nombreCliente_, tipoDocumentoCliente_,
    documentoCliente_, telefonoCliente_, correoCliente_) => {

    // Se envian los datos en .json ----------
    const datosRg = new FormData();
    datosRg.append("nombreCliente", nombreCliente_);
    datosRg.append("tipoDocumentoCliente", tipoDocumentoCliente_);
    datosRg.append("documentoCliente", documentoCliente_);
    datosRg.append("telefonoCliente", telefonoCliente_);
    datosRg.append("correoCliente", correoCliente_);

    var registrarClientes = await fetch("../../controllers/clientes/registrar.php", {
      method: 'POST',
      body: datosRg
    });


    Swal.fire({
      title: 'Cliente registrado! ',
      text: 'Se ha registrado un cliente',
      icon: "success",
      confirmButtonText: "Cofirmar",
      timer: 1200,
      timerProgressBar: true,
      position: "bottom-end",
      showConfirmButton: false,
      confirmButtonColor: '#118dd5',
      confirmButtonAriaLabel: 'Confirmar',
    }).then(() => {
      window.location.href = '../../views/clientes/listar.php'
    });
  }

  // ------- Se crea el metodo Validar ----------


  const Validar = async () => {
    // ------------------------- VALIDAR CAMPOS VACIOS -----------------------------
    //Se optienen todos los elementos de ingreso
    var nombreCliente = document.getElementById("nombreCliente").value.trim();
    var tipoDocumentoCliente = document.getElementById("tipoDocumentoCliente").value.trim();
    var documentoCliente = document.getElementById("documentoCliente").value.trim();
    var telefonoCliente = document.getElementById("telefonoCliente").value.trim();
    var correoCliente = document.getElementById("correoCliente").value.trim();

    // Validar si estan vacios
    if (
      nombreCliente.trim() === "" ||
      documentoCliente.trim() === "" ||
      telefonoCliente.trim() === "" ||
      correoCliente.trim() === "" ||
      tipoDocumentoCliente.value == "Seleccione un tipo de documento"
    ) {
      Swal.fire({
        title: "Campos vacios",
        text: "Por favor llene todos los campos",
        icon: "warning",
        confirmButtonColor: "#118dd5",
      });
    } else {
      //----------- Validar si estan repetidos -------

      // Solo se envian los necesarios ----------
      const datosCl = new FormData();
      datosCl.append("documentoCliente", documentoCliente);
      datosCl.append("telefonoCliente", telefonoCliente);
      datosCl.append("correoCliente", correoCliente);

      var consultaClientes = await fetch("../../controllers/clientes/repetidos.php", {
        method: 'POST',
        body: datosCl
      });

      //Traer mensaje de respuesta desde PHP -----
      var resultado = await consultaClientes.json();

      //---- Si alguno esta repetido ERROR
      if (resultado.success == false) {
        Swal.fire({
          title: resultado.title,
          text: resultado.mensaje,
          icon: "warning",
          confirmButtonColor: "#118dd5",
        });

        //---- Si ninguno está repetido llamar la funcion registrar
      } else {
        Registrar(nombreCliente, tipoDocumentoCliente,
          documentoCliente, telefonoCliente, correoCliente);
      }
    }
  };

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
  //--------------------- EDITAR CLIENTES ------------------

  //Se capturan las ventanas modales y se cuentan
  var totalReg = document.querySelectorAll(".ventaActualizarModulo").length;

  // Se guardan las listas con los elemntos ventana y boton cerrar
  actualizarModulos = [];
  cerrarVentanas = [];
  ventanaActualizarModulos = [];

  for (let o = 0; o < totalReg; o++) {
    actualizarModulos.push(
      document.querySelector(".botonActualizarModulo" + (o + 1))
    );
    cerrarVentanas.push(document.querySelector(".cerrarVentana" + (o + 1)));
    ventanaActualizarModulos.push(
      document.querySelector(".ventaActualizarModulos" + (o + 1))
    );

    actualizarModulos[o].addEventListener("click", (e) => {
      e.preventDefault();
      ventanaActualizarModulos[o].classList.add("ventaActualizarModulos--show");
    });

    cerrarVentanas[o].addEventListener("click", (e) => {
      e.preventDefault();
      ventanaActualizarModulos[o].classList.remove(
        "ventaActualizarModulos--show"
      );
    });
  }

  // // ---------------------- Funcion buscador dinamico -----------------------------

  var buscador = document.getElementById("buscador");

  //Datos para usar Solo Activos
  var inactivos = document.querySelectorAll(".Inactivo");
  var activos = document.querySelectorAll(".Activo");
  var cantInactivos = inactivos.length;
  var cantActivos = activos.length;

  // ---------- Valores por los que quiera buscar
  // nombre Cliente -------
  var nombreCliente = document.querySelectorAll(".nombreCliente");
  var similitudNombre = "";
  var ListaResultadosNombre = [];

  // idRol -------
  var idCliente = document.querySelectorAll(".idCliente");
  var similitudId = "";
  var ListaResultadosID = [];

  // Documento -------
  var documentoCliente = document.querySelectorAll(".documentoCliente");
  var similitudDocumento = "";
  var ListaResultadosDocumento = [];

  // Correo -------
  var correoCliente = document.querySelectorAll(".correoCliente");
  var similitudCorreo = "";
  var ListaResultadosCorreo = [];

  //Funcion comparadora
  buscador.addEventListener("keyup", () => {
    var busqueda = buscador.value.toLowerCase();

    ListaResultadosNombre = [];
    ListaResultadosID = [];
    ListaResultadosDocumento = [];
    ListaResultadosCorreo = [];

    var sinRes = 0;

    // Buscar por ID
    idCliente.forEach((resultados) => {
      for (let i = 0; i < buscador.value.length; i++) {
        similitudId = similitudId + resultados.innerHTML[i];
      }
      ListaResultadosID.push(similitudId);
      similitudId = "";
    });

    // Buscar por nombre
    nombreCliente.forEach((resultados) => {
      for (let i = 0; i < buscador.value.length; i++) {
        similitudNombre =
          similitudNombre + resultados.innerHTML.toLowerCase()[i];
      }
      ListaResultadosNombre.push(similitudNombre);
      similitudNombre = "";
    });

    // Buscar por documento
    documentoCliente.forEach((resultados) => {
      for (let i = 0; i < buscador.value.length; i++) {
        similitudDocumento =
          similitudDocumento + resultados.innerHTML.toLowerCase()[i];
      }
      ListaResultadosDocumento.push(similitudDocumento);
      similitudDocumento = "";
    });

    // Buscar por correo
    correoCliente.forEach((resultados) => {
      for (let i = 0; i < buscador.value.length; i++) {
        similitudCorreo =
          similitudCorreo + resultados.innerHTML.toLowerCase()[i];
      }
      ListaResultadosCorreo.push(similitudCorreo);
      similitudCorreo = "";
    });

    //------------------------------ Comparacion final ------------------------------------------
    for (let n = 0; n < ListaResultadosNombre.length; n++) {
      if (
        ListaResultadosNombre[n] == busqueda ||
        ListaResultadosID[n] == busqueda ||
        ListaResultadosDocumento[n] == busqueda ||
        ListaResultadosCorreo[n] == busqueda
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

  // ----------------  validar ediciones repetidas -----------------

    for (let x = 0; x < totalReg; x++) {

    const Editar = async (idClienteActualizado_, nombreClienteActuaizado_, tipoDocumentoClienteActualizado_,
      documentoClienteActualizado_, telefonoClienteActualizado_, correoClienteActualizado_, estadoClienteActualizado_) => {
      // Se envian los datos en .json ----------
      const datosAc = new FormData();
      datosAc.append("idCliente", idClienteActualizado_);
      datosAc.append("nombreCliente", nombreClienteActuaizado_);
      datosAc.append("tipoDocumentoCliente", tipoDocumentoClienteActualizado_);
      datosAc.append("documentoCliente", documentoClienteActualizado_);
      datosAc.append("telefonoCliente", telefonoClienteActualizado_);
      datosAc.append("correoCliente", correoClienteActualizado_);
      datosAc.append("estadoCliente", estadoClienteActualizado_);


      var registrarRoles = await fetch("../../controllers/clientes/actualizar.php", {
        method: 'POST',
        body: datosAc
      });


      Swal.fire({
        title: 'Cliente actualizado! ',
        text: 'Se ha actualizado un cliente',
        icon: "success",
        confirmButtonText: "Cofirmar",
        timer: 1200,
        timerProgressBar: true,
        position: "center",
        showConfirmButton: false,
        confirmButtonColor: '#118dd5',
        confirmButtonAriaLabel: 'Confirmar',
      }).then(() => {
        window.location.href = '../../views/clientes/listar.php'
      });



    }




    guardarClientes = document.getElementsByClassName(`guardarClientes${x + 1}`);
    guardarClientes[0].addEventListener('click', () => {
      const Validar = async () => {
        // ------------------------- VALIDAR CAMPOS VACIOS -----------------------------
        //Se optienen todos los elementos de ingreso
        //---------------- CONSULTAR REPETIDOS -----------------

        var idCliente = document.getElementsByClassName('idCliente_')[x].value.trim()
        var nombreClienteActualizado = document.getElementsByClassName('nombreClienteActualizado')[x].value.trim()
        var tipoDocumentoClienteActualizado = document.getElementsByClassName('tipoDocumentoClienteActualizado')[x].value
        var documentoClienteActualizado = document.getElementsByClassName('documentoClienteActualizado')[x].value.trim()
        var telefonoClienteActualizado = document.getElementsByClassName('telefonoClienteActualizado')[x].value.trim()
        var correoClienteActualizado = document.getElementsByClassName('correoClienteActualizado')[x].value.trim()
        var estadoClienteActualizado = document.getElementsByClassName('estadoClienteActualizado')[x].value.trim()



        // Validar si estan vacios
        if (
          nombreClienteActualizado.trim() === "" ||
          documentoClienteActualizado.trim() === "" ||
          telefonoClienteActualizado.trim() === "" ||
          correoClienteActualizado.trim() === "" ||
          tipoDocumentoClienteActualizado.value == "Seleccione un tipo de documento"
        ) {
          Swal.fire({
            title: "Campos vacios",
            text: "Por favor llene todos los campos",
            icon: "warning",
            confirmButtonColor: "#118dd5",
          });
        } else {
          //----------- Validar si estan repetidos -------

          // Solo se envian los necesarios ----------
          const datosCl = new FormData();
          datosCl.append("idCliente", idCliente);
          datosCl.append("documentoCliente", documentoClienteActualizado);
          datosCl.append("telefonoCliente", telefonoClienteActualizado);
          datosCl.append("correoCliente", correoClienteActualizado);

          var consultaClientes = await fetch("../../controllers/clientes/validarActualizar.php", {
            method: 'POST',
            body: datosCl
          });

          //Traer mensaje de respuesta desde PHP -----
          var resultado = await consultaClientes.json();
          console.log(resultado)

          //---- Si alguno esta repetido ERROR
          if (resultado.success == false) {
            Swal.fire({
              title: resultado.title,
              text: resultado.mensaje,
              icon: "warning",
              confirmButtonColor: "#118dd5",
            });

            //---- Si ninguno está repetido llamar la funcion registrar
          } else {
            //Llamamos la funcion editar
            Editar(idCliente, nombreClienteActualizado,
              tipoDocumentoClienteActualizado, documentoClienteActualizado,
              telefonoClienteActualizado, correoClienteActualizado,estadoClienteActualizado)
          }
        }
      };
      // LLAMAR LA VALIDACION
      Validar()


    })
  }




}

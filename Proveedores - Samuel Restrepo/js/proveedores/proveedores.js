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

  const Registrar = async (nombreProveedor_, tipoDocumentoProveedor_,
    documentoProveedor_, correoProveedor_, telefonoProveedor_) => {

    // Se envian los datos en .json ----------
    const datosRg = new FormData();
    datosRg.append("nombreProveedor", nombreProveedor_);
    datosRg.append("tipoDocumentoProveedor", tipoDocumentoProveedor_);
    datosRg.append("documentoProveedor", documentoProveedor_);
    datosRg.append("correoProveedor", correoProveedor_);
    datosRg.append("telefonoProveedor", telefonoProveedor_);

    var registrarProveedores = await fetch("../../controllers/proveedores/registrar.php", {
      method: 'POST',
      body: datosRg
    });


    Swal.fire({
      title: 'Proveedor registrado! ',
      text: 'Se ha registrado un proveedor',
      icon: "success",
      confirmButtonText: "Cofirmar",
      timer: 1200,
      timerProgressBar: true,
      position: "bottom-end",
      showConfirmButton: false,
      confirmButtonColor: '#118dd5',
      confirmButtonAriaLabel: 'Confirmar',
    }).then(() => {
      window.location.href = '../../views/proveedores/listar.php'
    });
  }



  const Validar = async () => {
    //Se optienen los elemenstos de ingreso
    var nombreProveedor = document.getElementById('nombreProveedor').value.trim();
    var tipoDocumentoProveedor = document.getElementById('tipoDocumentoProveedor').value.trim();
    var documentoProveedor = document.getElementById('documentoProveedor').value.trim();
    var correoProveedor = document.getElementById('correoProveedor').value.trim();
    var telefonoProveedor = document.getElementById('telefonoProveedor').value.trim();

    //Validar correo 
    var regexCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (
      nombreProveedor.trim() === "" ||
      documentoProveedor.trim() === "" ||
      correoProveedor.trim() === "" ||
      telefonoProveedor.trim() === "" ||
      tipoDocumentoProveedor == "Seleccione un tipo de documento"
    ) {
      Swal.fire({
        title: "Campos vacios",
        text: "Por favor llene todos los campos",
        icon: "warning",
        confirmButtonColor: "#118dd5",
      });
    } else if (documentoProveedor.length < 7) {
      Swal.fire({
        title: "Documento Invalido",
        text: "Por favor ingrese un documento válido",
        icon: "warning",
        confirmButtonColor: "#118dd5",
      });
    } else if (!regexCorreo.test(correoProveedor)) {
      Swal.fire({
        title: "Correo Electronico invalido",
        text: "El correo no es valido",
        icon: "warning",
        confirmButtonColor: "#118dd5",
      });

    } else if (telefonoProveedor.length < 7) {
      Swal.fire({
        title: "Telefono Invalido",
        text: "Por favor ingrese un teléfono válido",
        icon: "warning",
        confirmButtonColor: "#118dd5",
      });
    } else {
      //----------- Validar si estan repetidos -------

      // Solo se envian los necesarios ----------
      const datosCl = new FormData();
      datosCl.append("documentoProveedor", documentoProveedor);
      datosCl.append("telefonoProveedor", telefonoProveedor);
      datosCl.append("correoProveedor", correoProveedor);

      var consultaProveedores = await fetch("../../controllers/proveedores/repetidos.php", {
        method: 'POST',
        body: datosCl
      });

      //Traer mensaje de respuesta desde PHP -----
      var resultado = await consultaProveedores.json();

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
        Registrar(nombreProveedor, tipoDocumentoProveedor,
          documentoProveedor, correoProveedor, telefonoProveedor);
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
  //--------------------- EDITAR PROVEEDORES ------------------


    if(document.getElementById('rg').length == 0){
      document.getElementsByClassName('mi_tabla')[0].innerHTML = `<td class="impar text-center" colspan="8" >Lo sentimos no encontramos ningun resultado</td>`
    } else(
      console.log("Si tiene registro")
    )

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

      // ======================== VALIDAR SI HAY COMPRAS CON ESE PROVEEDOR =========================================
      const validarCamposAsc = async () => {
        // console.log("ENTRRE EN EL BOTON")
        idProveedor = document.getElementsByClassName('idProveedor')[o].value
        // console.log(idRol)

        // Se envian los datos en .json ----------
        const datosVal = new FormData();
        datosVal.append("idProveedor", idProveedor);


        var consultaEliminarAs = await fetch("../../controllers/proveedores/validarAsociados.php", {
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
        }
      }
      validarCamposAsc()
    });

    cerrarVentanas[o].addEventListener("click", (e) => {
      e.preventDefault();
      ventanaActualizarModulos[o].classList.remove("ventaActualizarModulos--show");
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
  // nombre Proveedor -------
  var nombreProveedor = document.querySelectorAll(".nombreProveedor");
  var similitudNombre = "";
  var ListaResultadosNombre = [];

  // idRol -------
  var idProveedor = document.querySelectorAll(".idProveedor");
  var similitudId = "";
  var ListaResultadosID = [];

  // documento -------
  var documentoProveedor = document.querySelectorAll(".documentoProveedor");
  var similitudDocumento = "";
  var ListaResultadosDocumento = [];

  // Correo -------
  var correoProveedor = document.querySelectorAll(".correoProveedor");
  var similitudCorreo = "";
  var ListaResultadosCorreo = [];


  // Tipo documento -------
  var tipoDocumentoProveedor = document.querySelectorAll(".tipoDocumentoProveedor");
  var similitudTipoDocumento = "";
  var ListaResultadosTipoDocumento = [];


  // Telefono -------
  var telefonoProveedor = document.querySelectorAll(".telefonoProveedor");
  var similitudTelefono = "";
  var ListaResultadosTelefono = [];



  //Funcion comparadora
  buscador.addEventListener("keyup", () => {
    var busqueda = buscador.value.toLowerCase();

    ListaResultadosNombre = [];
    ListaResultadosID = [];
    ListaResultadosDocumento = [];
    ListaResultadosCorreo = [];
    ListaResultadosTipoDocumento = [];
    ListaResultadosTelefono = [];

    var sinRes = 0;

    // Buscar por ID
    idProveedor.forEach((resultados) => {
      for (let i = 0; i < buscador.value.length; i++) {
        similitudId = similitudId + resultados.innerHTML[i];
      }
      ListaResultadosID.push(similitudId);
      similitudId = "";
    });

    // Buscar por nombre 
    nombreProveedor.forEach((resultados) => {
      for (let i = 0; i < buscador.value.length; i++) {
        similitudNombre =
          similitudNombre + resultados.innerHTML.toLowerCase()[i];
      }
      ListaResultadosNombre.push(similitudNombre);
      similitudNombre = "";
    });

    // Buscar por documento
    documentoProveedor.forEach((resultados) => {
      for (let i = 0; i < buscador.value.length; i++) {
        similitudDocumento =
          similitudDocumento + resultados.innerHTML.toLowerCase()[i];
      }
      ListaResultadosDocumento.push(similitudDocumento);
      similitudDocumento = "";
    });

    // Buscar por documento
    correoProveedor.forEach((resultados) => {
      for (let i = 0; i < buscador.value.length; i++) {
        similitudCorreo =
          similitudCorreo + resultados.innerHTML.toLowerCase()[i];
      }
      ListaResultadosCorreo.push(similitudCorreo);
      similitudCorreo = "";
    });

    // Buscar por tipo documento
    tipoDocumentoProveedor.forEach((resultados) => {
      for (let i = 0; i < buscador.value.length; i++) {
        similitudTipoDocumento =
          similitudTipoDocumento + resultados.innerHTML.toLowerCase()[i];
      }
      ListaResultadosTipoDocumento.push(similitudTipoDocumento);
      similitudTipoDocumento = "";
    });

    // Buscar por telefono
    telefonoProveedor.forEach((resultados) => {
      for (let i = 0; i < buscador.value.length; i++) {
        similitudTelefono =
          similitudTelefono + resultados.innerHTML.toLowerCase()[i];
      }
      ListaResultadosTelefono.push(similitudTelefono);
      similitudTelefono = "";
    });


    //------------------------------ Comparacion final ------------------------------------------
    for (let n = 0; n < ListaResultadosNombre.length; n++) {
      if (
        ListaResultadosNombre[n] == busqueda ||
        ListaResultadosID[n] == busqueda || ListaResultadosDocumento[n] == busqueda ||
        ListaResultadosTipoDocumento[n] == busqueda || ListaResultadosTelefono[n] == busqueda
        || ListaResultadosCorreo[n] == busqueda

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


  for (let x = 0; x < totalReg; x++) {

    const Editar = async (idProveedor_, nombreProveedorActualizado_,
      tipoDocumentoProveedorActualizado_, documentoProveedorActualizado_, correoProveedorActualizado_,
      telefonoProveedorActualizado_, estadoProveedorActualizado_) => {

      const datosAc = new FormData();
      datosAc.append("idProveedor", idProveedor_);
      datosAc.append("nombreProveedor", nombreProveedorActualizado_);
      datosAc.append("tipoDocumentoProveedor", tipoDocumentoProveedorActualizado_);
      datosAc.append("documentoProveedor", documentoProveedorActualizado_);
      datosAc.append("correoProveedor", correoProveedorActualizado_);
      datosAc.append("telefonoProveedor", telefonoProveedorActualizado_);
      datosAc.append("estadoProveedor", estadoProveedorActualizado_);


      var registrarProveedores = await fetch("../../controllers/proveedores/actualizar.php", {
        method: 'POST',
        body: datosAc
      });


      Swal.fire({
        title: 'Proveedor actualizado! ',
        text: 'Se ha actualizado un proveedor',
        icon: "success",
        confirmButtonText: "Cofirmar",
        timer: 1200,
        timerProgressBar: true,
        position: "center",
        showConfirmButton: false,
        confirmButtonColor: '#118dd5',
        confirmButtonAriaLabel: 'Confirmar',
      }).then(() => {
        window.location.href = '../../views/proveedores/listar.php'
      });



    }


    guardarClientes = document.getElementsByClassName(`guardarProveedores${x + 1}`);
    guardarClientes[0].addEventListener('click', () => {
      const Validar = async () => {


        // ----------------  validar ediciones repetidas -----------------


        var idProveedor = document.getElementsByClassName('idProveedor')[x].value.trim();
        var nombreProveedorActualizado = document.getElementsByClassName('nombreProveedorActualizado')[x].value.trim();
        var estadoProveedorActualizado = document.getElementsByClassName('estadoProveedorActualizado')[x].value.trim();
        var tipoDocumentoProveedorActualizado = document.getElementsByClassName('tipoDocumentoProveedorActualizado')[x].value.trim();
        var documentoProveedorActualizado = document.getElementsByClassName('documentoProveedorActualizado')[x].value.trim();
        var correoProveedorActualizado = document.getElementsByClassName('correoProveedorActualizado')[x].value.trim();
        var telefonoProveedorActualizado = document.getElementsByClassName('telefonoProveedorActualizado')[x].value.trim();


        //Validar correo 
        var regexCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (
          nombreProveedorActualizado.trim() === "" ||
          documentoProveedorActualizado.trim() === "" ||
          correoProveedorActualizado.trim() === "" ||
          telefonoProveedorActualizado.trim() === "" ||
          tipoDocumentoProveedorActualizado == "Seleccione un tipo de documento"
        ) {
          Swal.fire({
            title: "Campos vacios",
            text: "Por favor llene todos los campos",
            icon: "warning",
            confirmButtonColor: "#118dd5",
          });
        } else if (documentoProveedorActualizado.length < 7) {
          Swal.fire({
            title: "Documento Invalido",
            text: "Por favor ingrese un documento válido",
            icon: "warning",
            confirmButtonColor: "#118dd5",
          });
        } else if (telefonoProveedorActualizado.length < 7) {
          Swal.fire({
            title: "Telefono Invalido",
            text: "Por favor ingrese un teléfono válido",
            icon: "warning",
            confirmButtonColor: "#118dd5",
          });
        }else if (!regexCorreo.test(correoProveedorActualizado)) {
          Swal.fire({
              title: "Correo Electronico invalido",
              text: "El correo no es valido",
              icon: "warning",
              confirmButtonColor: "#118dd5",
          });

      } else {
          //----------- Validar si estan repetidos -------

          // Solo se envian los necesarios ----------
          const datosCl = new FormData();
          datosCl.append("idProveedor", idProveedor);
          datosCl.append("documentoProveedor", documentoProveedorActualizado);
          datosCl.append("telefonoProveedor", telefonoProveedorActualizado);
          datosCl.append("correoProveedor", correoProveedorActualizado);


          var consultaProveedores = await fetch("../../controllers/proveedores/validarActualizar.php", {
            method: 'POST',
            body: datosCl
          });

          //Traer mensaje de respuesta desde PHP -----
          var resultado = await consultaProveedores.json();

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
            Editar(idProveedor, nombreProveedorActualizado,
              tipoDocumentoProveedorActualizado, documentoProveedorActualizado,correoProveedorActualizado,
              telefonoProveedorActualizado, estadoProveedorActualizado)
          }


        }
      }
      Validar()
    })
  }

  // Se llama el boton eliminar 
  eliminar = document.getElementsByClassName('eliminar')
  // console.log(botonesGuardar)

  for (let y = 0; y < totalReg; y++) {
    eliminar[y].addEventListener('click', () => {

      const eliminarReg = async () => {
        idProveedor = document.getElementsByClassName('idProveedor')[y].value
        // Solo se envian los necesarios ----------
        const datosEl = new FormData();
        datosEl.append("idProveedor", idProveedor);

        var eliminarDato = await fetch("../../controllers/proveedores/eliminar.php", {
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
          window.location.href = '../../views/proveedores/listar.php'
        });

      }

      Swal.fire({
        title: 'Eliminar registro',
        text: "¿Está seguro que desea eliminar este proveedor?",
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
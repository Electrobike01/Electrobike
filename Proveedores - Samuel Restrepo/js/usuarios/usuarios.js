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

    const Registrar = async (nombreUsuario_, tipoDocumentoUsuario_,
        documentoUsuario_, correoUsuario_, rolUsuario_, contrasenaUsuario_) => {
        // Se envian los datos en .json ----------
        const datosRg = new FormData();
        datosRg.append("nombreUsuario", nombreUsuario_);
        datosRg.append("tipoDocumentoUsuario", tipoDocumentoUsuario_);
        datosRg.append("documentoUsuario", documentoUsuario_);
        datosRg.append("correoUsuario", correoUsuario_);
        datosRg.append("rolUsuario", rolUsuario_);
        datosRg.append("contrasenaUsuario", contrasenaUsuario_);

        var registrarUsuarios = await fetch("../../controllers/usuarios/registrar.php", {
            method: 'POST',
            body: datosRg
        });


        Swal.fire({
            title: 'Usuario registrado! ',
            text: 'Se ha registrado un usuario',
            icon: "success",
            confirmButtonText: "Cofirmar",
            timer: 1200,
            timerProgressBar: true,
            position: "bottom-end",
            showConfirmButton: false,
            confirmButtonColor: '#118dd5',
            confirmButtonAriaLabel: 'Confirmar',
        }).then(() => {
            window.location.href = '../../views/usuarios/listar.php'
        });
    }


    // ------------------------- VALIDAR CAMPOS VACIOS -----------------------------
    const Validar = async () => {

        //Se optienen los elemenstos de ingreso
        var nombreUsuario = document.getElementById('nombreUsuario').value.trim();
        var tipoDocumentoUsuario = document.getElementById('tipoDocumentoUsuario').value.trim();
        var documentoUsuario = document.getElementById('documentoUsuario').value.trim();
        var correoUsuario = document.getElementById('correoUsuario').value.trim();
        var rolUsuario = document.getElementById('rolUsuario').value.trim();
        var contrasenaUsuario = document.getElementById('contrasenaUsuario').value.trim();
        var contrasenaUsuario2 = document.getElementById('contrasenaUsuario2').value.trim();


        // Dividir el texto en palabras utilizando los espacios en blanco como separadores
        var ListanombreUsuario = nombreUsuario.split(" ").length;

        //Validar correo 
        var regexCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        console.log
        if (
            nombreUsuario.trim() === "" ||
            documentoUsuario.trim() === "" ||
            correoUsuario.trim() === "" ||
            contrasenaUsuario.trim() === "" ||
            contrasenaUsuario2.trim() === "" ||
            tipoDocumentoUsuario == "Seleccione un tipo de documento" ||
            rolUsuario == "Seleccione un rol"
        ) {
            Swal.fire({
                title: "Campos vacios",
                text: "Por favor llene todos los campos",
                icon: "warning",
                confirmButtonColor: "#118dd5",
            });
        } else if (ListanombreUsuario < 3 || ListanombreUsuario > 4) {
            Swal.fire({
                title: "Nombre invalido",
                text: "Por favor ingrese su nombre completo",
                icon: "warning",
                confirmButtonColor: "#118dd5",
            });
        } else if (!regexCorreo.test(correoUsuario)) {
            Swal.fire({
                title: "Correo Electronico invalido",
                text: "El correo no es valido",
                icon: "warning",
                confirmButtonColor: "#118dd5",
            });

        } else if (contrasenaUsuario.trim() != contrasenaUsuario2.trim()) {
            Swal.fire({
                title: "Error de contrasena",
                text: "Las contrasenas no coinciden",
                icon: "warning",
                confirmButtonColor: "#118dd5",
            });
        } else {
            //----------- Validar si estan repetidos -------

            // Solo se envian los necesarios ----------
            const datosCl = new FormData();
            datosCl.append("documentoUsuario", documentoUsuario);
            datosCl.append("correoUsuario", correoUsuario);

            var consultaUsuarios = await fetch("../../controllers/usuarios/repetidos.php", {
                method: 'POST',
                body: datosCl
            });

            //Traer mensaje de respuesta desde PHP -----
            var resultado = await consultaUsuarios.json();

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
                Registrar(nombreUsuario, tipoDocumentoUsuario,
                    documentoUsuario, correoUsuario, rolUsuario, contrasenaUsuario);

            }


        }
    }



    var registrar = document.getElementById("registrar");
    registrar.addEventListener("click", Validar);
}

// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// --------------------------------------- LISTAR ----------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------


if (valorSubModuloActual == "listar") {

    //--------------------- EDITAR USUARIOS ------------------


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

    
  boton_admi = actualizarModulos[0]
  console.log(boton_admi)
  boton_admi.classList.remove('Btn')
  boton_admi.classList.add('btn-admin')

  boton_admi_copia = boton_admi.cloneNode(true)

  boton_admi.parentNode.replaceChild(boton_admi_copia,boton_admi)

  boton_admi_copia.addEventListener('click',()=>{
    Swal.fire({
      //Contenido de la alerta
      title: "Lo sentimos",
      text: "No puedes editar el usuario administrador",
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


    // // ---------------------- Funcion buscador dinamico -----------------------------

    var buscador = document.getElementById("buscador");

    //Datos para usar Solo Activos
    var inactivos = document.querySelectorAll(".Inactivo");
    var activos = document.querySelectorAll(".Activo");
    var cantInactivos = inactivos.length;
    var cantActivos = activos.length;


    // ---------- Valores por los que quiera buscar
    // nombre Usuario -------
    var nombreUsuario = document.querySelectorAll(".nombreUsuario");
    var similitudNombre = "";
    var ListaResultadosNombre = [];

    // idRol -------
    var idUsuario = document.querySelectorAll(".idUsuario");
    var similitudId = "";
    var ListaResultadosID = [];

    // tipo documento -------
    var tipoDocumentoUsuario = document.querySelectorAll(".tipoDocumentoUsuario");
    var similitudTipoDocumento = "";
    var ListaResultadosTipoDocumento = [];

    // documento -------
    var documentoUsuario = document.querySelectorAll(".documentoUsuario");
    var similitudDocumento = "";
    var ListaResultadosDocumento = [];

    // correo -------
    var correoUsuario = document.querySelectorAll(".correoUsuario");
    var similitudCorreo = "";
    var ListaResultadosCorreo = [];



    //Funcion comparadora
    buscador.addEventListener("keyup", () => {
        var busqueda = buscador.value.toLowerCase();

        ListaResultadosNombre = [];
        ListaResultadosID = [];
        ListaResultadosTipoDocumento = [];
        ListaResultadosDocumento = [];
        ListaResultadosCorreo = [];

        var sinRes = 0;

        // Buscar por ID
        idUsuario.forEach((resultados) => {
            for (let i = 0; i < buscador.value.length; i++) {
                similitudId = similitudId + resultados.innerHTML[i];
            }
            ListaResultadosID.push(similitudId);
            similitudId = "";
        });

        // Buscar por nombre 
        nombreUsuario.forEach((resultados) => {
            for (let i = 0; i < buscador.value.length; i++) {
                similitudNombre =
                    similitudNombre + resultados.innerHTML.toLowerCase()[i];
            }
            ListaResultadosNombre.push(similitudNombre);
            similitudNombre = "";
        });

        // Buscar por tipo documento
        tipoDocumentoUsuario.forEach((resultados) => {
            for (let i = 0; i < buscador.value.length; i++) {
                similitudTipoDocumento =
                    similitudTipoDocumento + resultados.innerHTML.toLowerCase()[i];
            }
            ListaResultadosTipoDocumento.push(similitudTipoDocumento);
            similitudTipoDocumento = "";
        });

        // Buscar por documento
        documentoUsuario.forEach((resultados) => {
            for (let i = 0; i < buscador.value.length; i++) {
                similitudDocumento =
                    similitudDocumento + resultados.innerHTML.toLowerCase()[i];
            }
            ListaResultadosDocumento.push(similitudDocumento);
            similitudDocumento = "";
        });

        // Buscar por correo
        correoUsuario.forEach((resultados) => {
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
                ListaResultadosID[n] == busqueda || ListaResultadosDocumento[n] == busqueda ||
                ListaResultadosCorreo[n] == busqueda || ListaResultadosTipoDocumento[n] == busqueda

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

    // ----------------  validar ediciones repetidas -----------------}

    for (let x = 0; x < totalReg; x++) {

        const Editar = async (idUsuario_, nombreUsuarioActualizado_,
            tipoDocumentoUsuarioActualizado_, documentoUsuarioActualizado_,
            correoUsuarioActualizado_, rolUsuarioActualizado_, estadoUsuarioActualizado_) => {

            const datosAc = new FormData();
            datosAc.append("idUsuario", idUsuario_);
            datosAc.append("nombreUsuario", nombreUsuarioActualizado_);
            datosAc.append("tipoDocumentoUsuario", tipoDocumentoUsuarioActualizado_);
            datosAc.append("documentoUsuario", documentoUsuarioActualizado_);
            datosAc.append("correoUsuario", correoUsuarioActualizado_);
            
            datosAc.append("rolUsuario", rolUsuarioActualizado_);
            datosAc.append("estadoUsuario", estadoUsuarioActualizado_);

            var actualizarUsuario = await fetch("../../controllers/usuarios/actualizar.php", {
                method: 'POST',
                body: datosAc
            });


            Swal.fire({
                title: 'Usuario actualizado! ',
                text: 'Se ha actualizado un usuario',
                icon: "success",
                confirmButtonText: "Cofirmar",
                timer: 1200,
                timerProgressBar: true,
                position: "center",
                showConfirmButton: false,
                confirmButtonColor: '#118dd5',
                confirmButtonAriaLabel: 'Confirmar',
            }).then(() => {
                window.location.href = '../../views/usuarios/listar.php'
            });


        }


        guardarClientes = document.getElementsByClassName(`guardarUsuarios${x + 1}`);
        guardarClientes[0].addEventListener('click', () => {
            const Validar = async () => {
                // ------------------------- VALIDAR CAMPOS VACIOS -----------------------------
                //Se optienen todos los elementos de ingreso
                //---------------- CONSULTAR REPETIDOS -----------------

                var idUsuario = document.getElementsByClassName('idUsuario_')[x].value.trim();
                var nombreUsuarioActualizado = document.getElementsByClassName('nombreUsuarioActualizado')[x].value.trim();
                var tipoDocumentoUsuarioActualizado = document.getElementsByClassName('tipoDocumentoUsuarioActualizado')[x].value.trim();
                var documentoUsuarioActualizado = document.getElementsByClassName('documentoUsuarioActualizado')[x].value.trim();
                var correoUsuarioActualizado = document.getElementsByClassName('correoUsuarioActualizado')[x].value.trim();
                var rolUsuarioActualizado = document.getElementsByClassName('rolUsuarioActualizado')[x].value.trim();
                var estadoUsuarioActualizado = document.getElementsByClassName('estadoUsuarioActualizado')[x].value.trim();


                // Dividir el texto en palabras utilizando los espacios en blanco como separadores
                var ListanombreUsuario_ = nombreUsuarioActualizado.split(" ").length;

                //Validar correo 
                var regexCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

                if (
                    nombreUsuarioActualizado.trim() === "" ||
                    documentoUsuarioActualizado.trim() === "" ||
                    correoUsuarioActualizado.trim() === "" ||
                    tipoDocumentoUsuarioActualizado.value == "Seleccione un tipo de documento"
                ) {
                    Swal.fire({
                        title: "Campos vacios",
                        text: "Por favor llene todos los campos",
                        icon: "warning",
                        confirmButtonColor: "#118dd5",
                    });
                } else if (ListanombreUsuario_ < 3 || ListanombreUsuario_ > 4) {
                    Swal.fire({
                        title: "Nombre invalido",
                        text: "Por favor ingrese su nombre completo",
                        icon: "warning",
                        confirmButtonColor: "#118dd5",
                    });
                } else if (!regexCorreo.test(correoUsuarioActualizado)) {
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
                    datosCl.append("idUsuario", idUsuario);
                    datosCl.append("documentoUsuario", documentoUsuarioActualizado);
                    datosCl.append("correoUsuario", correoUsuarioActualizado);

                    var consultaUsuarios = await fetch("../../controllers/usuarios/validarActualizar.php", {
                        method: 'POST',
                        body: datosCl
                    });


                    //Traer mensaje de respuesta desde PHP -----
                    var resultado = await consultaUsuarios.json();
                    // console.log(resultado)

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
                        Editar(idUsuario, nombreUsuarioActualizado,
                            tipoDocumentoUsuarioActualizado, documentoUsuarioActualizado,
                            correoUsuarioActualizado, rolUsuarioActualizado, estadoUsuarioActualizado)
                    }
                }
            }
            Validar()
        })
    }
}

if (valorSubModuloActual == "configuracion") {

    id = localStorage.getItem("id");
    console.log(id)

    const ObtenerDatos = async (id_) => {

        // Solo se envian los necesarios ----------
        const datosCl = new FormData();
        datosCl.append("id", id_);

        var consultaDatos = await fetch("../../controllers/usuarios/datosPerfil.php", {
            method: 'POST',
            body: datosCl
        });

        //Traer mensaje de respuesta desde PHP -----
        var resultado = await consultaDatos.json();

        nombre = resultado['nombre']
        tipoDocumento = resultado['tipoDocumento']
        documento = resultado['documento']
        correo = resultado['correo']
        contrasena = resultado['contrasena']
        rol = resultado['rol']
        estado = resultado['estado']


        // ---------- OBTENER INPUTS PARA REMPLAZAR ------------
        input_id = document.getElementById('idUsuario_').value = id
        input_nombre = document.getElementById('nombreUsuario_').value = nombre
        input_tipo_documento = document.getElementById('tipoDocumento_').innerHTML = tipoDocumento
        if (input_tipo_documento == "Cédula"){
            op2 = "Cédula Extranjera"
            op3 = "Pasaporte"
        }
        if (input_tipo_documento == "Cédula Extranjera"){
            op2 = "Cédula"
            op3 = "Pasaporte"
        }
        if (input_tipo_documento == "Pasaporte"){
            op2 = "Cédula"
            op3 = "Cédula Extranjera"
        }

        document.getElementById('tipoDocumento_opc2').innerHTML = op2
        document.getElementById('tipoDocumento_opc3').innerHTML = op3

        input_documento = document.getElementById('documentoUsuario_').value = documento
        input_correo = document.getElementById('correoUsuario_').value = correo
        input_estado = document.getElementById('estadoUsuario_').value = estado
        input_rol = document.getElementById('rolUsuario_').value = rol
        input_contrasena = document.getElementById('contrasenaUsuario_').value = contrasena
        input_contrasena2 = document.getElementById('contrasenaUsuario2_').value = contrasena
    }

    ObtenerDatos(id)


    const Editar = async (idUsuario_, nombreUsuario_,
        tipoDocumentoUsuario_, documentoUsuario_,
        correoUsuario_, contrasenaUsuario_, idRolUsuario_, estadoUsuario_) => {

        const datosAc = new FormData();
        datosAc.append("idUsuario", idUsuario_);
        datosAc.append("nombreUsuario", nombreUsuario_);
        datosAc.append("tipoDocumentoUsuario", tipoDocumentoUsuario_);
        datosAc.append("documentoUsuario", documentoUsuario_);
        datosAc.append("correoUsuario", correoUsuario_);
        datosAc.append("contrasenaUsuario", contrasenaUsuario_);
        datosAc.append("rolUsuario", idRolUsuario_);
        datosAc.append("estadoUsuario", estadoUsuario_);

        var actualizarUsuario = await fetch("../../controllers/usuarios/actualizar.php", {
            method: 'POST',
            body: datosAc
        });

        Swal.fire({
            title: 'Usuario actualizado! ',
            text: 'Se ha actualizado un usuario',
            icon: "success",
            confirmButtonText: "Cofirmar",
            timerProgressBar: true,
            timer: 1200,
            position: "center",
            showConfirmButton: false,
            confirmButtonColor: '#118dd5',
            confirmButtonAriaLabel: 'Confirmar',
        }).then(() => {
            Swal.fire({
                title: 'Su sesion ha expirado ',
                text: 'Por su seguridad, ingrese nuevamente',
                icon: "info",
                timer: 2200,
                timerProgressBar: true,
                position: "center",
                showConfirmButton: false,
                confirmButtonColor: '#118dd5',
                confirmButtonAriaLabel: 'Confirmar',
            }).then(() => {
                localStorage.clear();
                window.location.href = "../../login/index.html";
            });
        });

       
    }

    btnActualizarUsuario = document.getElementById('actualizarUsuario');
    btnActualizarUsuario.addEventListener('click', () => {
        const ValidarConfig = async () => {

            var idUsuario_ = document.getElementById('idUsuario_').value.trim();
            var nombreUsuario_ = document.getElementById('nombreUsuario_').value.trim();
            var tipoDocumentoUsuario_ = document.getElementById('tipoDocumentoUsuario_').value.trim();
            var documentoUsuario_ = document.getElementById('documentoUsuario_').value.trim();
            var correoUsuario_ = document.getElementById('correoUsuario_').value.trim();
            var contrasenaUsuario_ = document.getElementById('contrasenaUsuario_').value.trim();
            var contrasenaUsuario2_ = document.getElementById('contrasenaUsuario2_').value.trim();
            var idRolUsuario_ = document.getElementById('rolUsuario_').value.trim();
            var estadoUsuario_ = document.getElementById('estadoUsuario_').value.trim();

             // Dividir el texto en palabras utilizando los espacios en blanco como separadores
             var ListanombreUsuario = nombreUsuario_.split(" ").length;

            if (
                nombreUsuario_.trim() === "" ||
                documentoUsuario_.trim() === "" ||
                contrasenaUsuario_.trim() === "" ||
                contrasenaUsuario2_.trim() === ""
            ) {
                Swal.fire({
                    title: "Campos vacios",
                    text: "Por favor llene todos los campos",
                    icon: "warning",
                    confirmButtonColor: "#118dd5",
                });
            }  else if (ListanombreUsuario < 3 || ListanombreUsuario > 4) {
            Swal.fire({
                title: "Nombre invalido",
                text: "Por favor ingrese su nombre completo",
                icon: "warning",
                confirmButtonColor: "#118dd5",
            });
        } else if (contrasenaUsuario_.trim() != contrasenaUsuario2_.trim()) {
                Swal.fire({
                    title: "Las contrasenas no coinciden",
                    text: "Las contrasenas no coinciden",
                    icon: "warning",
                    confirmButtonColor: "#118dd5",
                });


            } else {

                //----------- Validar si estan repetidos -------

                // Solo se envian los necesarios ----------
                const datosCl = new FormData();
                datosCl.append("idUsuario", idUsuario_);
                datosCl.append("documentoUsuario", documentoUsuario_);


                var consultaUsuarios = await fetch("../../controllers/usuarios/validarConfig.php", {
                    method: 'POST',
                    body: datosCl
                });

                //Traer mensaje de respuesta desde PHP -----
                var resultado = await consultaUsuarios.json();

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
                    Editar(idUsuario_, nombreUsuario_,
                        tipoDocumentoUsuario_, documentoUsuario_,
                        correoUsuario_, contrasenaUsuario_, idRolUsuario_, estadoUsuario_)
                }
            }


        }

        ValidarConfig();

    })


    // BOTON EDITAR DATOS
    permisoEditar = document.getElementById('permitirEditar')
    btnActualizarUsuario.style.display = 'none'

    permisoEditar.addEventListener('click',()=>{
        btnActualizarUsuario.style.display = 'block'
        permisoEditar.style.display = 'none'

        nombreUsuario_.disabled = false
        tipoDocumentoUsuario_.disabled = false
        documentoUsuario_.disabled = false
        contrasenaUsuario_.disabled = false
        contrasenaUsuario2_.disabled = false
 
    })


}
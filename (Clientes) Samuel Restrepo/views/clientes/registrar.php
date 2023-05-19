<!-- Coding by CodingLab | www.codinglabweb.com -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!----------------------- DEPENDENCIAS --------------------------- -->
    <div id="pantalla"  class="pantalla"></div>
    <!----============= CSS ================ -->
    <link rel="stylesheet" href="../../style/clientes/formulario.css">
    <link rel="stylesheet" href="../../style/clientes/listar.css">
    <link rel="stylesheet" href="../../style/_general/style.css">
    <link rel="stylesheet" href="../../style/_general/sidebar.css">
    <link rel="stylesheet" href="../../style/_general/responsive.css">
    <!----===== Boxicons CSS ===== -->
    <link rel="stylesheet" href="../../dependencias/boxicons-2.1.4/css/boxicons.min.css">
    <!----===== Bootstrap ===== -->
    <link rel="stylesheet" href="../../dependencias/bootstrap-5.3.0-alpha1-dist/css/bootstrap.min.css">
    <!----===== SweetAlert ===== -->
    <script src="../../dependencias/sweetAlert/js/sweetAlert-main.js"></script>

    <title>Electrobike</title>
</head>

<!-------- Llamar la sesion ----->
<?php include('../../nav/sesion.html'); ?>

<body class="animate-in-ov">


    <!-------- Llamar al nav ----->
    <?php include('../../nav/nav.html'); ?>

    <section class="home">

        <!---------------------- Header ----------------->
        <div class="header">

            <!---------- Icono menu_movil ---------->
            <div class="nav_movil">
                <div class="_layer -top"></div>
                <div class="_layer -mid"></div>
                <div class="_layer -bottom"></div>
            </div>

            <h1 id="titulo" class="titulo"></h1>

            <!-------- Llamar al nav_movil ----->

            <?php include('../../nav/nav_movil.html'); ?>


            <!-------- Llamar recuadro user ----->
            <?php include('../../nav/user.html'); ?>


        </div>


        <!-- -----------------------FORMULARIO --------------------------------------------- -->

        <form>

            <br>
            <main>



                <!-- ------ Nombre ------ -->
                <div class="formulario__grupo" id="grupo__usuario">
                    <label for="password2" class="formulario__label">Nombre</label>
                    <div class="formulario__grupo-input">
                        <input type="text" class="formulario__input" name="nombreCliente" id="nombreCliente" placeholder="Ingrese un nombre">
                    </div>
                </div>

                <br>
                <div class="formulario">

                    <!-- ------ Tipo de documento ------ -->

                    <div class="formulario__grupo" id="grupo__usuario">
                        <label for="" class="formulario__label">Tipo de documento</label>
                        <div class="formulario__grupo-input">
                            <select class="formulario__input" name="tipoDocumentoCliente" id="tipoDocumentoCliente">
                                <option>Seleccione un tipo de documento</option>
                                <option value="Cedula">Cedula</option>
                                <option value="Tarjeta de identidad">Tarjeta de identidad</option>
                                <option value="NIT">NIT</option>
                            </select>
                        </div>
                    </div>

                    <!-- ------ Documento ------ -->

                    <div class="formulario__grupo" id="grupo__password2">
                        <label for="password2" class="formulario__label">Documento de identidad</label>
                        <div class="formulario__grupo-input">
                            <input type="number" class="formulario__input" name="documentoCliente" id="documentoCliente" placeholder="Ingrese un documento" onkeypress="return isNumber(event)">
                        </div>
                    </div>


                    <!-- ------ Telefono ------ -->

                    <div class="formulario__grupo" id="grupo__password2">
                        <label for="password2" class="formulario__label">Telefono</label>
                        <div class="formulario__grupo-input">
                            <input type="text" maxlength="16" name="telefonoCliente" class="formulario__input telefono" placeholder="Ingrese un telefono" id="telefonoCliente" onkeypress="return isNumber(event)">

                        </div>

                    </div>


                    <!-- ------ Correo ------ -->

                    <div class="formulario__grupo" id="grupo__correo">
                        <label for="correo" class="formulario__label">Correo</label>
                        <div class="formulario__grupo-input">
                            <input type="email" class="formulario__input" name="correoCliente" id="correoCliente" placeholder="Ingrese un correo">
                        </div>

                    </div>



                </div>




            </main>

            <br>

            <!-- ------ Boton registrar------ -->
            <div class="ubicacionBoton">
                <div class="formulario__grupo formulario__grupo-btn-enviar">
                    <button name="registrarCliente" type="button" id="registrar" class="formulario__btn registrarCliente">Finalizar registro</button>

                </div>
            </div>
            <br>

        </form>
        <!-- ------------------------------------------------------------------------------- -->




        <h1 class="page" id="ModuloActual">clientes</h1>
        <h1 class="page" id="SubModuloActual">registrar</h1>

    </section>


    <script src="../../js/clientes/clientes.js"></script>
    <script src="../../js/_general/script.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js" integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
    </script>



    </div>
</body>

</html>
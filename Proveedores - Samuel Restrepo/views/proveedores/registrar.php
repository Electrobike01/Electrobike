<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!----------------------- DEPENDENCIAS --------------------------- -->
    <div id="pantalla" class="pantalla"></div>
    <!----============= CSS ================ -->
    <link rel="stylesheet" href="../../style/proveedores/formulario.css">
    <link rel="stylesheet" href="../../style/proveedores/listar.css">
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


                <br>
                <!-- ------ Nombre ------ -->
                <div class="formulario__grupo" id="grupo__password2">
                    <label for="password2" class="formulario__label">Nombre</label>
                    <div class="formulario__grupo-input">
                        <input type="text" class="formulario__input" name="nombreProveedor" id="nombreProveedor" placeholder="Ingrese un nombre ">
                    </div>
                </div>

                <div class="formulario">
                    <!-- ------ Tipo documento ------ -->
                    <div class="formulario__grupo" id="grupo__usuario">
                        <label for="" class="formulario__label">Tipo de documento</label>
                        <div class="formulario__grupo-input">
                            <select class="formulario__input" name="tipoDocumentoProveedor" id="tipoDocumentoProveedor">
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
                            <input type="text" class="formulario__input" name="documentoProveedor" id="documentoProveedor" placeholder="Ingrese un documento" oninput="filtroNumero(this)">
                        </div>
                    </div>

                    <!-- ------ Telefono ------ -->

                    <div class="formulario__grupo" id="grupo__password2">
                        <label for="password2" class="formulario__label">Telefono</label>
                        <div class="formulario__grupo-input">
                            <input type="text" class="formulario__input" name="telefonoProveedor" id="telefonoProveedor" placeholder="Ingrese un telefono" oninput="filtroNumero(this)">
                        </div>

                    </div>

                    <!-- ------ Correo Electronico ------ -->

                    <div class="formulario__grupo" id="grupo__password2">
                        <label for="password2" class="formulario__label">Correo electronico</label>
                        <div class="formulario__grupo-input">
                            <input type="email" class="formulario__input" placeholder="Ingrese su correo " name="correoProveedor" id="correoProveedor">
                        </div>

                    </div>



                </div>



            </main>

            <br>

            <!-- ------ Boton registrar------ -->

            <div class="formulario__grupo formulario__grupo-btn-enviar">
                <button type="button" id="registrar" class="registrar ">Registrar </button>
            </div><br>

            <br>

        </form>
        <!-- ------------------------------------------------------------------------------- -->



        <h1 class="page" id="ModuloActual">proveedores</h1>
        <h1 class="page" id="SubModuloActual">registrar</h1>
    </section>






    <script src="../../js/proveedores/proveedores.js"></script>
    <script src="../../js/_general/script.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js" integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
    </script>



    </div>
</body>

</html>
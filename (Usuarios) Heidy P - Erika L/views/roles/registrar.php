
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!----------------------- DEPENDENCIAS --------------------------- -->
    <div id="pantalla" class="pantalla"></div>
    <!----============= CSS ================ -->
    <link rel="stylesheet" href="../../style/roles/formulario.css">
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

        <!-- ----------------------- FORMULARIO --------------------------------------------- -->

        <form method="POST">

            <div class="container">
                <br>
                <div class="elementos">
                    <!-- <input type="text" name="nombreRol" class="" id="nombreRol" placeholder="Ingrese un nombre"> -->

                    <div class="vinculo" style="margin-left: 20px;">
                        <input type="text" placeholder="Nombre"  id="nombreRol" class="input">
                        <input style="display: none;">
                    </div>
                </div>



                <br>

                <div class="container switchs">


                    <div class="switch">
                        <span class="textin">Usuarios</span>
                        <label class="switchos element">
                            <input id='toggle_Us' type="checkbox" class="checkbox">
                            <div class="slider"> </div>
                        </label>
                    </div>

                    <div class="switch">
                        <span class="textin">Roles</span>
                        <label class="switchos element">
                            <input id='toggle_Rl' type="checkbox" class="checkbox ">
                            <div class="slider"> </div>
                        </label>

                        <style>

                        </style>

                    </div>

                    <div class="switch">
                        <span class="textin">Proveedores</span>
                        <label class="switchos element">
                            <input id='toggle_Prv' type="checkbox" class="checkbox">
                            <div class="slider"> </div>
                        </label>
                    </div>

                    <div class="switch">
                        <span class="textin">Compras</span>
                        <label class="switchos element">
                            <input id='toggle_Cr' type="checkbox" class="checkbox">
                            <div class="slider"> </div>
                        </label>

                    </div>

                    <div class="switch">
                        <span class="textin">Productos</span>
                        <label class="switchos element">
                            <input id='toggle_Prd' type="checkbox" class="checkbox">
                            <div class="slider"> </div>
                        </label>

                    </div>

                    <div class="switch">
                        <span class="textin">Clientes</span>
                        <label class="switchos element">
                            <input id='toggle_Cl' type="checkbox" class="checkbox">
                            <div class="slider"> </div>
                        </label>

                    </div>

                    <div class="switch">
                        <span class="textin">Ventas</span>
                        <label class="switchos element">
                            <input id='toggle_Ve' type="checkbox" class="checkbox">
                            <div class="slider"> </div>
                        </label>

                    </div>

                </div>

                <br>

                <div class="formulario__grupo formulario__grupo-btn-enviar">
                    <button type="button" id="registrar" class="registrar registrarRol">Registrar </button>
                </div><br>

            </div>
        </form>


        <!-- ------------------------------------------------------------------------------- -->


        <h1 class="page" id="ModuloActual">roles</h1>
        <h1 class="page" id="SubModuloActual">registrar</h1>
    </section>





    <script src="../../js/roles/roles.js"></script>
    <script src="../../js/_general/script.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js" integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
    </script>



    </div>
</body>

</html>




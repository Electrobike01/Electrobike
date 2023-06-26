<!-- Coding by CodingLab | www.codinglabweb.com -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!----------------------- DEPENDENCIAS --------------------------- -->
    <div id="pantalla" class="pantalla"></div>
    <!----============= CSS ================ -->
    <link rel="stylesheet" href="../../style/productos/formulario.css">
    <link rel="stylesheet" href="../../style/productos/listar.css">
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

        <form action="" method="post">


            <br>
            <main>

                <!-- ------ Producto ------ -->

                <div class="formulario__grupo" id="grupo__password2">
                    <label for="password2" class="formulario__label">Ingrese el nombre del producto</label>
                    <div class="formulario__grupo-input">
                        <input type="text" class="formulario__input" name="" id="nombreProducto" placeholder="Nombre del producto">
                    </div>

                </div>


                <!-- ------ Categoria ------ -->

                <div class="formulario__grupo" id="grupo__usuario">
                    <label for="" class="formulario__label">Seleccione una categoria</label>
                    <div class="formulario__grupo-input">
                        <select class="formulario__input" name="" id="categoriaProducto">
                            <option value="Seleccione una categoria">Seleccione una categoria</option>
                            <option value="Bicicletas alta gama">Bicicletas alta gama</option>
                            <option value="Bicicletas baja gama">Bicicletas baja gama</option>
                            <option value="Repuestos alta gama">Repuestos alta gama</option>
                            <option value="Repuestos baja gama">Repuestos baja gama</option>

                        </select>
                    </div>
                </div>


            </main>

            <br>

            <!-- ------ Boton registrar------ -->
            <div class="formulario__grupo formulario__grupo-btn-enviar">
                    <button type="button" id="registrar" class="registrar registrarRol">Registrar </button>
                </div><br>
            <br>

            <br>

        </form>
        <!-- ------------------------------------------------------------------------------- -->



        <h1 class="page" id="ModuloActual">productos</h1>
        <h1 class="page" id="SubModuloActual">registrar</h1>
    </section>






    <script src="../../js/productos/productos.js"></script>
    <script src="../../js/_general/script.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js" integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
    </script>



    </div>
</body>

</html>
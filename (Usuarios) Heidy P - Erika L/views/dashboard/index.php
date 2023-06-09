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
    <link rel="stylesheet" href="../../style/productos/categorias.css">
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


        <!-- ----------------------- CATEGORIAS --------------------------------------------- -->


        <div class="container cajas">




            <a class="text-decoration-none text-dark" href="">
                <div class="box1">
                    <h2 class="title">Bicicletas Alta gama</h2>
                    <img class="image" src="https://via.placeholder.com/300x200" alt="Imagen 1">
                    <p class="description">125</p>
                </div>
            </a>

            <a class="text-decoration-none text-dark" href="">
                <div class="box2">
                    <h2 class="title">Bicicletas Baja gama</h2>
                    <img class="image" src="https://via.placeholder.com/300x200" alt="Imagen 2">
                    <p class="description">90</p>
                </div>
            </a>

            <a class="text-decoration-none text-dark" href="">
                <div class="box3">
                    <h2 class="title">Repuestos Alta Gama</h2>
                    <img class="image" src="https://via.placeholder.com/300x200" alt="Imagen 3">
                    <p class="description">370</p>
                </div>
            </a>

            <a class="text-decoration-none text-dark" href="">
                <div class="box4">
                    <h2 class="title">Repuestos Baja Gama</h2>
                    <img class="image" src="https://via.placeholder.com/300x200" alt="Imagen 3">
                    <p class="description">250</p>
                </div>
            </a>

        </div>


        <!-- ------------------------------------------------------------------------------- -->



        <h1 class="page" id="ModuloActual">inicio</h1>
        <h1 class="page" id="SubModuloActual"></h1>
    </section>


    <script src="../../js/_general/script.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js" integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
    </script>

    </div>
</body>

</html>
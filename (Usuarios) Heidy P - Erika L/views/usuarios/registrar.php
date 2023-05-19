<?php
require_once '../../controllers/conexion.php';


$db = new Database();
$con = $db->conectar();

$roles = $con->query("SELECT * FROM roles WHERE estadoRol = 'Activo'");
$roles->execute();
$consultaRoles = $roles->fetchAll(PDO::FETCH_ASSOC);


?>



<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!----------------------- DEPENDENCIAS --------------------------- -->
    <div id="pantalla" class="pantalla"></div>
    <!----============= CSS ================ -->
    <link rel="stylesheet" href="../../style/usuarios/formulario.css">
    <link rel="stylesheet" href="../../style/usuarios/listar.css">
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


                <!-- ------ Nombre Usuario ------ -->

                <div class="formulario__grupo" id="grupo__password2">
                    <label for="password2" class="formulario__label">Ingrese el nombre completo</label>
                    <div class="formulario__grupo-input">
                        <input type="text" class="formulario__input" name="nombreUsuario" id="nombreUsuario">
                    </div>

                </div>

                <br>
                <div class="formulario">


                    <!-- ------ Tipo de documento ------ -->

                    <div class="formulario__grupo" id="grupo__usuario">
                        <label for="" class="formulario__label">Tipo de documento</label>
                        <div class="formulario__grupo-input">
                            <select class="formulario__input" name="tipoDocumentoUsuario" id="tipoDocumentoUsuario">
                                <option>Seleccione un tipo de documento</option>
                                <option value="Cedula">Cedula</option>
                                <option value="Cedula Extranjera">Cedula extranjera</option>
                                <option value="Pasaporte">Pasaporte</option>

                            </select>
                        </div>
                    </div>


                    <!-- ------ Numero de documento ------ -->

                    <div class="formulario__grupo" id="grupo__password2">
                        <label for="password2" class="formulario__label">Numero de documento</label>
                        <div class="formulario__grupo-input">
                            <input type="text" class="formulario__input" name="documentoUsuario" id="documentoUsuario">
                        </div>

                    </div>


                    <!-- ------ Correo Electronico ------ -->

                    <div class="formulario__grupo" id="grupo__password2">
                        <label for="password2" class="formulario__label">Correo electronico</label>
                        <div class="formulario__grupo-input">
                            <input type="email" class="formulario__input" name="correoUsuario" id="correoUsuario">
                        </div>

                    </div>


                    <!-- ------ Rol ------ -->

                    <div class="formulario__grupo" id="grupo__usuario">
                        <label for="" class="formulario__label">Rol</label>
                        <div class="formulario__grupo-input">
                            <select class="formulario__input" name="rolUsuario" id="rolUsuario">
                                <option>Seleccione un rol</option>
                                <?php $x = 0;
                                foreach ($consultaRoles as $row) {
                                    $x += 1
                                ?>
                                    <option value="<?php echo $row['idRol'] ?>"> <?php echo $row['nombreRol'] ?> </option>
                                <?php }
                                if ($x == 0) { ?><option> No se encontro ningun rol activo </option><?php } ?>
                            </select>
                        </div>
                    </div>


                    <!-- ------ Contraseña ------ -->

                    <div class="formulario__grupo" id="grupo__password2">
                        <label for="password2" class="formulario__label">Contraseña</label>
                        <div class="formulario__grupo-input">
                            <input type="password" class="formulario__input" name="contrasenaUsuario" id="contrasenaUsuario">
                        </div>

                    </div>



                    <!-- ------ Confirmar contraseña ------ -->

                    <div class="formulario__grupo" id="grupo__password2">
                        <label for="password2" class="formulario__label">Confirmar contraseña</label>
                        <div class="formulario__grupo-input">
                            <input type="password" class="formulario__input" name="" id="contrasenaUsuario2">
                        </div>

                    </div>


                </div>



            </main>

            <br>



            <div class="formulario__grupo formulario__grupo-btn-enviar">
                <button type="button" id="registrar" class="registrar registrarRol">Registrar </button>
            </div><br>

            <br>

        </form>
        <!-- ------------------------------------------------------------------------------- -->



        <h1 class="page" id="ModuloActual">usuarios</h1>
        <h1 class="page" id="SubModuloActual">registrar</h1>
    </section>





    <script src="../../js/usuarios/usuarios.js"></script>
    <script src="../../js/_general/script.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js" integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
    </script>



    </div>
</body>

</html>
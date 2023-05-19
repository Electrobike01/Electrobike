<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$query = $con->query("SELECT * FROM `usuarios`");
$query->execute();
$consultas = $query->fetchAll(PDO::FETCH_ASSOC);


$i = 0
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!----------------------- DEPENDENCIAS --------------------------- -->
    <div id="pantalla"  class="pantalla"></div>
    <!----============= CSS ================ -->
    <link rel="stylesheet" href="../../style/usuarios/listar.css">
    <link rel="stylesheet" href="../../style/usuarios/formulario.css">
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

        <!-- ----------------------- LISTA --------------------------------------------- -->
        <br>

        <div class="container">

            <div class="elementos">
                <a href="../usuarios/registrar.php"><button class="vinculo btn btn-primary">Registrar</button></a>

                <div class="buscador">
                    <input id="buscador" class="busc" type="text" placeholder="Buscador">
                    <button id="inactivos" class="btn btn-primary"> Todos</button>

                </div>
            </div>

            <br>
            <div class="table-responsive">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th class="recuadro">ID</th>
                            <th class="text-center">Nombre Completo</th>
                            <th class="text-center">Tipo documento</th>
                            <th class="text-center">Numero documento</th>
                            <th class="text-center">Correo electronico</th>
                            <th class="text-center">Contraseña</th>
                            <th class="text-center">Rol</th>
                            <th class="text-center">Estado</th>
                            <th class="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>

                        <?php foreach ($consultas as $row) {

                            $i += 1;
                            // $idRol = $campo->idRol;

                        ?>


                            <tr class="_<?php echo $i; ?> <?php echo $row['estadoUsuario']; ?>">
                                <td class="text-center idUsuario"><?php echo $row['idUsuario']; ?></td>
                                <td class="text-center nombreUsuario"><?php echo $row['nombreUsuario']; ?></td>
                                <td class="text-center"><?php echo $row['tipoDocumentoUsuario']; ?></td>
                                <td class="text-center documentoUsuario"><?php echo $row['documentoUsuario']; ?></td>
                                <td class="text-center correoUsuario"><?php echo $row['correoUsuario']; ?></td>
                                <td class="text-center"><?php echo $row['contraseñaUsuario']; ?></td>
                                <?php
                                //------------- MUESTRA EL NOMBRE DE ROL EN LA TABLA ----------------------

                                $idRol = $row['idRol'];
                                $sqlNombreRol = $con->query("SELECT * FROM `roles` WHERE idRol = '$idRol'");
                                $sqlNombreRol->execute();
                                $consultaRol = $sqlNombreRol->fetchAll(PDO::FETCH_ASSOC);
                                ?>

                                <?php foreach ($consultaRol as $rowRol) {
                                ?>
                                    <td class="text-center">
                                        <?php echo $rowRol['nombreRol'];
                                        ?>
                                    </td>
                                <?php } ?>
                                <td class="text-center estadoModulo"><?php echo $row['estadoUsuario']; ?></td>
                                <td class="text-center">
                                    <a href="#" class="btn btn-primary botonActualizarModulo<?php echo $i; ?>">Editar</a>
                                </td>

                            </tr>




                            <div class="ventaActualizarModulo ventaActualizarModulos<?php echo $i; ?>">
                                <form action="../../controllers/usuarios/actualizar.php" method="POST">

                                    <div class="contenedorActualizarModulo">
                                        <h1 class="tituloVentana">Actualizar Cliente</h1>

                                        <div class="contenedorActualizar">

                                            <div class="" id="">
                                                <label class="formulario__label">ID </label>
                                                <div class=""><input type="text" class="form-control idUsuario_" name="idUsuario" value="<?php echo  $row['idUsuario']; ?>" readonly>
                                                </div>
                                            </div>


                                            <div class="" id="">
                                                <label class="formulario__label">Nombre </label>
                                                <div><input type="text" class="form-control nombreUsuarioActualizado" name="nombreUsuario" value="<?php echo  $row['nombreUsuario']; ?>" id="input2">
                                                </div>

                                            </div>


                                            <div class="" id="">
                                                <label for="" class="formulario__label">Tipo de documento</label>
                                                <select class="form-select tipoDocumentoUsuarioActualizado" name="tipoDocumentoUsuario" id="select1">
                                                    <option><?php echo  $row['tipoDocumentoUsuario']; ?></option>
                                                    <?php
                                                    if ($row['tipoDocumentoUsuario'] == 'Cedula') {
                                                        echo '<option value="Pasaporte">Pasaporte</option>';
                                                        echo '<option value="Cedula extranjera">Cedula extranjera</option>';
                                                    } elseif ($row['tipoDocumentoUsuario'] == 'Pasaporte') {
                                                        echo '<option value="Cedula">Cedula</option>';
                                                        echo '<option value="Cedula extranjera">Cedula extranjera</option>';
                                                    } elseif ($row['tipoDocumentoUsuario'] == 'Cedula extranjera') {
                                                        echo '<option value="Cedula">Cedula</option>';
                                                        echo '<option value="Pasaporte">Pasaporte</option>';
                                                    }
                                                    ?>

                                                </select>
                                            </div>

                                            <div class="">
                                                <label for="password2" class="formulario__label">Documento de identidad</label>
                                                <div class="formulario__grupo-input">
                                                    <input type="number" class="form-control documentoUsuarioActualizado" name="documentoUsuario" value="<?php echo $row['documentoUsuario']; ?>" id="input1" onkeypress="return isNumber(event)">
                                                </div>
                                            </div>

                                            <div class="">
                                                <label for="password2" class="formulario__label">Correo </label>
                                                <div class="formulario__grupo-input">
                                                    <input type="text" class="form-control correoUsuarioActualizado" value="<?php echo $row['correoUsuario']; ?>" name="correoUsuario" id="input3">
                                                </div>
                                            </div>


                                            <div class="">
                                                <label for="password2" class="formulario__label">Contraseña</label>
                                                <div class="formulario__grupo-input">
                                                    <input type="text" class="form-control contraseñaUsuarioActualizado" value="<?php echo $row['contraseñaUsuario'] ?>" name="contrasenaUsuario" id="input3">
                                                </div>
                                            </div>


                                            <div class="formulario__grupo" id="grupo__usuario">

                                                <?php
                                                // --------------------- SELECT DE ACTUALIZAR ROLES-------------------------
                                                $idRol = $row['idRol'];    
                                                $sqlNombreRolAc = $con->query("SELECT * FROM `roles` WHERE idRol = '$idRol'");
                                                $sqlNombreRolAc->execute();
                                                $consultaRolAc = $sqlNombreRolAc->fetchAll(PDO::FETCH_ASSOC);

                                                foreach ($consultaRolAc as $rowRolAc ){
                                                    $idRol_ =  $rowRolAc['idRol'];
                                                    $nombreRol_ =  $rowRolAc['nombreRol'];
                                                 }


                                                $consultaSelectRoles = $con->query("SELECT * FROM `roles` WHERE nombreRol != '$nombreRol_' AND  estadoRol = 'Activo'");
                                                $consultaSelectRoles->execute();
                                                $consultaSelectRolesAcatualizar = $consultaSelectRoles->fetchAll(PDO::FETCH_ASSOC);
                                                

                                                ?>

                                                <label for="" class="formulario__label">Rol</label>
                                                <div class="formulario__grupo-input">
                                                    <select class="form-select rolUsuarioActualizado" name="rolUsuario" id="rolUsuario">
                                                        <option value="<?php echo $idRol_ ?>" selected>
                                                        <?php echo $nombreRol_ ?></option>
                                                        <?php
                                                        foreach ($consultaSelectRolesAcatualizar as $rowRolSelectAc ){
                                                        ?>
                                                        <option value=" <?php echo $rowRolSelectAc['idRol']; ?>"> <?php echo $rowRolSelectAc['nombreRol']; ?></option>
                                                        <?php }?>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="">
                                                <label class="formulario__label">Estado</label>
                                                <select class="form-select estadoUsuarioActualizado" name="estadoUsuario" id="">
                                                    <option selected><?php echo $row['estadoUsuario']; ?></option>

                                                    <?php
                                                    if ($row['estadoUsuario'] == 'Activo') {
                                                        echo '<option value="Inactivo">Inactivo</option>';
                                                    } else {
                                                        echo '<option value="Activo">Activo</option>';
                                                    }
                                                    ?>
                                                </select>
                                            </div>

                                        </div>


                                        <div class="contenedorBotones">
                                            <div class="botonGuardar">
                                                <!-- <input type="sumbit" class="btn btn-primary guardarRoles<?php // echo $i; ?>" name="guardarProveedores" id='guardarRoles' value="Guardar"> -->
                                                <button type="button" class="btn btn-primary guardarUsuarios<?php echo $i; ?>" name="guardarUsuarios" id='guardarUsuarios'> Guardar </button>
                                            </div>
                                            <div class="botonCerrar">
                                                <a href="#" class="cerrarVentana btn btn-danger cerrarVentana<?php echo $i; ?>">Cerrar</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </form>
                            </div>
                        <?php   }
                        ?>
                    </tbody>
                </table>
                <h5 id="sinResult"></h5>
            </div>
        </div>

        <!-- ------------------------------------------------------------------------------- -->

        <h1 class="page" id="ModuloActual">usuarios</h1>
        <h1 class="page" id="SubModuloActual">listar</h1>
    </section>








    <script src="../../js/usuarios/usuarios.js"></script>
    <script src="../../js/_general/script.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js" integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
    </script>

    </div>
</body>

</html>
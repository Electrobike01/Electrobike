<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$query = $con->query("SELECT * FROM `clientes`");
$query->execute();

// ------------ CREA EL ARRAY ------------
$consultas = $query->fetchAll(PDO::FETCH_ASSOC);


$i = 0
?>


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
    <link rel="stylesheet" href="../../style/clientes/listar.css">
    <link rel="stylesheet" href="../../style/clientes/formulario.css">
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
    <?php include ('../../nav/sesion.html');?>

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
                <a href="../clientes/registrar.php"><button class="vinculo btn btn-primary">Registrar</button></a>

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
                            <th class="text-center">ID</th>
                            <th class="text-center">Nombre</th>
                            <th class="text-center">Tipo de documento</th>
                            <th class="text-center">Documento</th>
                            <th class="text-center">Teléfono</th>
                            <th class="text-center">Correo</th>
                            <th class="text-center">Estado</th>
                            <th class="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>

                        <?php foreach ($consultas as $row) {
                            $i += 1;
                        ?>
                            <tr class="_<?php echo $i; ?> <?php echo $row['estadoCliente']; ?>">
                                <td class="text-center idCliente"><?php echo $row['idCliente']; ?></td>
                                <td class="text-center nombreCliente"><?php echo $row['nombreCliente']; ?></td>
                                <td class="text-center"><?php echo $row['tipoDocumentoCliente']; ?></td>
                                <td class="text-center documentoCliente"><?php echo $row['documentoCliente']; ?></td>
                                <td class="text-center"><?php echo $row['telefonoCliente'] ?></td>
                                <td class="text-center correoCliente"><?php echo $row['correoCliente']; ?></td>
                                <td class="text-center estadoModulo"><?php echo $row['estadoCliente']; ?></td>

                                <td class="text-center">
                                    <a href="#" class="btn btn-primary botonActualizarModulo<?php echo $i; ?>">Editar</a>
                                </td>
                            </tr>

                            <div class="ventaActualizarModulo ventaActualizarModulos<?php echo $i; ?>">
                                <form action="../../controllers/clientes/actualizar.php" method="POST">

                                    <div class="contenedorActualizarModulo">
                                        <h1 class="tituloVentana">Actualizar Cliente</h1>

                                        <div class="contenedorActualizar">

                                            <div class="" id="">
                                                <label class="formulario__label">ID </label>
                                                <div class=""><input type="text" id="idCliente" class="form-control idCliente_" name="idCliente" value="<?php echo $row['idCliente']; ?>" readonly>
                                                </div>
                                            </div>


                                            <div class="" id="">
                                                <label class="formulario__label">Nombre </label>
                                                <div><input type="text" class="form-control nombreClienteActualizado" name="nombreCliente" value="<?php echo $row['nombreCliente']; ?>" id="input2">
                                                </div>

                                            </div>

                                    

                                            <div class="">

                                                <label class="formulario__label">Estado</label>
                                                <select class="form-select estadoClienteActualizado" name="estadoCliente" id="">
                                                    <option selected><?php echo $row['estadoCliente']; ?></option>

                                                    <?php
                                                    if ($row['estadoCliente'] == 'Activo') {
                                                        echo '<option value="Inactivo">Inactivo</option>';
                                                    } else {
                                                        echo '<option value="Activo">Activo</option>';
                                                    }
                                                    ?>
                                                </select>
                                            </div>

                                            <div class="" id="">
                                                <label for="" class="formulario__label">Tipo de documento</label>
                                                <select class="form-select tipoDocumentoClienteActualizado" name="tipoDocumentoCliente" id="select1">
                                                    <option><?php echo $row['tipoDocumentoCliente']; ?></option>
                                                    <?php
                                                    if ($row['tipoDocumentoCliente'] == 'Cedula') {
                                                        echo '<option value="Tarjeta de identidad">Tarjeta de identidad</option>';
                                                        echo '<option value="NIT">NIT</option>';
                                                    } elseif ($row['tipoDocumentoCliente'] == 'Tarjeta de identidad') {
                                                        echo '<option value="Cedula">Cedula</option>';
                                                        echo '<option value="NIT">NIT</option>';
                                                    } elseif ($row['tipoDocumentoCliente'] == 'NIT') {
                                                        echo '<option value="Cedula">Cedula</option>';
                                                        echo '<option value="Tarjeta de identidad">Tarjeta de identidad</option>';
                                                    }

                                                    ?>



                                                </select>
                                            </div>

                                            <div class="">
                                                <label for="password2" class="formulario__label">Documento de identidad</label>
                                                <div class="formulario__grupo-input">
                                                    <input type="number" class="form-control documentoClienteActualizado" name="documentoCliente" value="<?php echo $row['documentoCliente']; ?>" id="input1" onkeypress="return isNumber(event)">
                                                </div>
                                            </div>


                                            <div class="">
                                                <label for="password2" class="formulario__label">Telefono</label>
                                                <div class="formulario__grupo-input">
                                                    <input type="number" class="form-control telefonoClienteActualizado" value="<?php echo $row['telefonoCliente']; ?>" name="telefonoCliente" id="input3" onkeypress="return isNumber(event)">
                                                </div>
                                            </div>

                                            <div class="">
                                                <label for="password2" class="formulario__label">Correo </label>
                                                <div class="formulario__grupo-input">
                                                    <input type="text" class="form-control correoClienteActualizado" value="<?php echo $row['correoCliente']; ?>" name="correoCliente" id="input3">
                                                </div>
                                            </div>

                                        </div>


                                        <div class="contenedorBotones">
                                            <div class="botonGuardar">
                                                <!-- <input type="sumbit" class="btn btn-primary guardarRoles<?php echo $i; ?>" name="guardarProveedores" id='guardarRoles' value="Guardar"> -->
                                                <button type="button" class="btn btn-primary guardarClientes<?php echo $i; ?>" name="guardarClientes" id='guardarClientes'> Guardar </button>
                                            </div>
                                            <div class="botonCerrar">
                                                <a href="#" class="cerrarVentana btn btn-danger cerrarVentana<?php echo $i; ?>">Cerrar</a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>


                        <?php }; ?>


                    </tbody>
                </table>
                <h5 id="sinResult"></h5>
            </div>
        </div>


        <!-- ------------------------------------------------------------------------------- -->






        <h1 class="page" id="ModuloActual">clientes</h1>
        <h1 class="page" id="SubModuloActual">listar</h1>
    </section>


    <script src="../../js/clientes/clientes.js"></script>
    <script src="../../js/_general/script.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js" integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
    </script>

    </div>
</body>

</html>


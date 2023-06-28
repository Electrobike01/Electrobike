<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$query = $con->query("SELECT * FROM `productos`");
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


        <!-- ----------------------- LISTA --------------------------------------------- -->

        <br>



        <div class="container">

            <div class="elementos">
                <a href="../productos/registrar.php"><button class="vinculo btn btn-primary">Registrar</button></a>

                <div class="buscador">
                    <div class="group_">
                        <svg class="icon_" aria-hidden="true" viewBox="0 0 24 24">
                            <g>
                                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                            </g>
                        </svg>
                        <input id="buscador" placeholder="Buscador" class="input">
                    </div>
                    <div class="contInac">
                        <button id="inactivos" class="btn btn-primary"> Todos</button>
                    </div>
                </div>
            </div>

            <br>

            <div class="table-responsive">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th class="text-center">ID</th>
                            <th class="text-center">Producto</th>
                            <th class="text-center">Cantidad</th>
                            <th class="text-center">Categoría</th>
                            <th class="text-center">Estado</th>
                            <th class="text-center">Acciones</th>

                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($consultas as $row) {
                            $i += 1;
                        ?>
                            <tr class="_<?php echo $i; ?> <?php echo $row['estadoProducto']; ?>">
                                <td class="text-center idProducto"><?php echo $row['idProducto']; ?></td>
                                <td class="text-center nombreProducto"><?php echo $row['nombreProducto']; ?></td>
                                <td class="text-center cantidadProducto"><?php echo $row['cantidadProducto']; ?></td>
                                <td class="text-center categoriaProducto"><?php echo $row['categoriaProducto']; ?></td>
                                <td class="text-center estadoModulo"><?php echo $row['estadoProducto'];  ?></td>

                                <td class="text-center" style="width: 100px;">
                                    <button class="Btn  botonActualizarModulo<?php echo $i; ?>">Editar
                                        <svg class="svg" viewBox="0 0 512 512">
                                            <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                                        </svg>
                                    </button>
                                </td>

                            </tr>

                            <div class="ventaActualizarModulo ventaActualizarModulos<?php echo $i; ?>">
                                <form action="../../controllers/clientes/actualizar.php" method="POST">

                                    <div class="contenedorActualizarModulo">
                                        <h1 class="tituloVentana">Actualizar Producto</h1>

                                        <div class="contenedorActualizar">
                                            <div class="" id="">
                                                <label class="formulario__label">ID </label>
                                                <div class=""><input type="text" id="idCliente" class="form-control idProducto_" value="<?php echo $row['idProducto']; ?>" disabled>
                                                </div>
                                            </div>

                                            <div class="" id="">
                                                <label class="formulario__label">Nombre </label>
                                                <div><input type="text" class="form-control nombreProductoActualizado" value="<?php echo $row['nombreProducto']; ?>" id="input2">
                                                </div>

                                            </div>

                                            <div class="">

                                                <label class="formulario__label">Estado</label>
                                                <select class="form-select estadoProductoActualizado" name="estadoProducto" id="">
                                                    <option selected><?php echo $row['estadoProducto']; ?></option>
                                                    <?php
                                                    if ($row['estadoProducto'] == 'Activo') {
                                                        echo '<option value="Inactivo">Inactivo</option>';
                                                    } else {
                                                        echo '<option value="Activo">Activo</option>';
                                                    }
                                                    ?>
                                                </select>
                                                <div id='mensaje' class='mensaje'></div>
                                            </div>



                                            <div class="">
                                                <label class="formulario__label">Categoria</label>
                                                <select class="form-select categoriaProductoActualizado" name="categoriaProducto" id="">
                                                    <option selected><?php echo $row['categoriaProducto']; ?></option>
                                                    <?php
                                                    if ($row['categoriaProducto'] == 'Bicicletas alta gama') {
                                                        echo '<option value="Bicicletas baja gama">Bicicletas baja gama</option>';
                                                        echo '<option value="Repuestos alta gama">Repuestos alta gama</option>';
                                                        echo '<option value="Repuestos baja gama">Repuestos baja gama</option>';
                                                    } else if ($row['categoriaProducto'] == 'Bicicletas baja gama') {
                                                        echo '<option value="Bicicletas alta gama">Bicicletas alta gama</option>';
                                                        echo '<option value="Repuestos alta gama">Repuestos alta gama</option>';
                                                        echo '<option value="Repuestos baja gama">Repuestos baja gama</option>';
                                                    } else if ($row['categoriaProducto'] == 'Repuestos alta gama') {
                                                        echo '<option value="Bicicletas alta gama">Bicicletas alta gama</option>';
                                                        echo '<option value="Bicicletas baja gama">Bicicletas baja gama</option>';
                                                        echo '<option value="Repuestos baja gama">Repuestos baja gama</option>';
                                                    } else if ($row['categoriaProducto'] == 'Repuestos baja gama') {
                                                        echo '<option value="Bicicletas alta gama">Bicicletas alta gama</option>';
                                                        echo '<option value="Bicicletas baja gama">Bicicletas baja gama</option>';
                                                        echo '<option value="Repuestos alta gama">Repuestos alta gama</option>';
                                                    }
                                                    ?>
                                                </select>
                                            </div>

                                            <div class="">
                                                <label for="password2" class="formulario__label">Cantidad </label>
                                                <div class="formulario__grupo-input">
                                                    <input type="text" class="form-control cantidadProductoActualizado" name="documentoCliente" value="<?php echo $row['cantidadProducto']; ?>" id="cantidadProducto" disabled>
                                                </div>
                                            </div>

                                        </div>
                                        <!-- <div class="contenedorBotones">
                                            <div class="botonGuardar">
                                                <button type="button" class="btn btn-primary guardarProductos<?php echo $i; ?>" name="guardarProductos" id='guardarProductos'> Guardar </button>
                                            </div>
                                            <div class="botonCerrar">
                                                <a href="#" class="cerrarVentana btn btn-danger cerrarVentana<?php echo $i; ?>">Cerrar</a>
                                            </div>
                                        </div> -->

                                        <div class="contenedorBotones">

                                            <div class="botonGuardar">
                                                <button type="button" class="btn btn-primary guardarProductos<?php echo $i; ?>" name="guardarProductos" id='guardarProductos'> Guardar </button>

                                            </div>

                                            <div class="botonEliminar">
                                                <button type="button" class="eliminar btn btn-danger">Eliminar </button>
                                            </div>

                                            <div class="botonCerrar">
                                                <a href="#" class="cerrarVentana btn btn-secondary cerrarVentana<?php echo $i; ?>">Cerrar</a>
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



        <h1 class="page" id="ModuloActual">productos</h1>
        <h1 class="page" id="SubModuloActual">listar</h1>
    </section>




    <script src="../../js/productos/productos.js"></script>
    <script src="../../js/_general/script.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js" integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
    </script>

    </div>
</body>

</html>
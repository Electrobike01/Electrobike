<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

//Obtenemos todos los proveedores para el filtro
$proveedores = $con->query("SELECT * FROM proveedores ");
$proveedores->execute();
$consultaProveedores = $proveedores->fetchAll(PDO::FETCH_ASSOC);

//Obtenemos todos las fechas para el filtro
$fechas = $con->query("SELECT DISTINCT  fechaCompra FROM compras ");
$fechas->execute();
$consultaFechas = $fechas->fetchAll(PDO::FETCH_ASSOC);
$fechasDisponibles = [];


foreach ($consultaFechas as $key => $value) {
    array_push($fechasDisponibles, $value['fechaCompra']);
}


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
    <link rel="stylesheet" href="../../style/compras/formulario.css">
    <link rel="stylesheet" href="../../style/compras/listar.css">
    <link rel="stylesheet" href="../../style/_general/style.css">
    <link rel="stylesheet" href="../../style/_general/sidebar.css">
    <link rel="stylesheet" href="../../style/_general/responsive.css">
    <!----===== Boxicons CSS ===== -->
    <link rel="stylesheet" href="../../dependencias/boxicons-2.1.4/css/boxicons.min.css">
    <!----===== Bootstrap ===== -->
    <link rel="stylesheet" href="../../dependencias/bootstrap-5.3.0-alpha1-dist/css/bootstrap.min.css">
    <!----===== SweetAlert ===== -->
    <script src="../../dependencias/sweetAlert/js/sweetAlert-main.js"></script>
    <!----===== Calendario ===== -->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

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
                <a href="../compras/registrar.php"><button class="vinculo btn btn-primary">Registrar</button></a>
            </div>

            <br>
            <div class="selects">

                <!-- ------ Proveedor ------ -->
                <div class="select_prov filtro" style="margin-right: 20px;">
                    <select class="formulario__input" name="" id="select_proveedor">
                        <option>Todos los proveedores</option>
                        <?php $x = 0;
                        foreach ($consultaProveedores as $row) {
                            $x += 1 ?>
                            <option value="<?php echo $row['idProveedor'] ?>"> <?php echo $row['nombreProveedor'] ?> </option><?php }
                                                                                                                            if ($x == 0) { ?><option> No se encontro ningun proveedor </option><?php } ?>
                    </select>
                </div>

                <!-- ------ Fechas ------ -->

                <h1 id="fechas" style="display: none;"><?php foreach ($fechasDisponibles as $key => $value) {echo $value . ",";} ?></h1>
                <input id="select_fechas"  class="calendario" value="Todas las fechas" type="text" readonly>
                <button style="display: none;" id="FechasTodas" class="btn btn-primary">Ver todas las fechas</button>

                <!-- ---------------------- -->



            </div>

            <br>

            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead class="table-dark">
                        <tr>
                            <th>ID Compra</th>
                            <th>Nombre Proveedor</th>
                            <th>Fecha de Compra</th>
                            <th>Nombre Producto</th>
                            <th>Cantidad</th>
                            <th>Valor Uni</th>
                            <th>Valor Total</th>
                        </tr>
                    </thead>
                    <tbody id="contenido">

                    </tbody>
                </table>

            </div>

        </div>



        <!-- ------------------------------------------------------------------------------- -->


        <h1 class="page" id="ModuloActual">compras</h1>
        <h1 class="page" id="SubModuloActual">listar</h1>
    </section>


    <script src="../../js/_general/script.js"></script>
    <script src="../../js/compras/compras.js"></script>

    <script src="../../sweetAlert/css/sweetAlert-main.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js" integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
    </script>

    </div>
</body>

</html>
<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();


if ($_POST) {

    $nombreUsuario = $_POST['nombreUsuario'];
    $tipoDocumentoUsuario = $_POST['tipoDocumentoUsuario'];
    $documentoUsuario = $_POST['documentoUsuario'];
    $correoUsuario = $_POST['correoUsuario'];
    $rolUsuario = $_POST['rolUsuario'];
    $contrasenaUsuario = $_POST['contrasenaUsuario'];
    $estadoUsuario = 'Activo';

    $registrarUsuarios = $con->prepare("INSERT INTO `usuarios`(`idUsuario`, `nombreUsuario`, `tipoDocumentoUsuario`, `documentoUsuario`, `correoUsuario`, `contrasenaUsuario`, `estadoUsuario`, `idRol`) 
    VALUES ('', :nom, :tpd, :doc, :corr, :con, :est, :idr)");
    $registrarUsuarios->execute(array(
        'nom' => $nombreUsuario, 'tpd' => $tipoDocumentoUsuario,
        'doc' => $documentoUsuario, 'corr' => $correoUsuario, 'con' => $contrasenaUsuario, 'est' => $estadoUsuario, 'idr' => $rolUsuario
    ));

}
echo json_encode($valido);

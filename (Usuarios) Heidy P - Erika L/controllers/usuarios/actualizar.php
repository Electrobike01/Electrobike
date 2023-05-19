<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => true, 'title' => "", 'mensaje' => "");

if ($_POST) {

    $idUsuario = $_POST['idUsuario'];
    $idUsuarioBusqueda = $_POST['idUsuario'];
    $nombreUsuario = $_POST['nombreUsuario'];
    $tipoDocumentoUsuario = $_POST['tipoDocumentoUsuario'];
    $documentoUsuario = $_POST['documentoUsuario'];
    $correoUsuario = $_POST['correoUsuario'];
    $contrasenaUsuario = $_POST['contrasenaUsuario'];
    $rolUsuario = $_POST['rolUsuario'];
    $estadoUsuario = $_POST['estadoUsuario'];

    $actualizarCliente = $con->prepare("UPDATE `usuarios` SET `idUsuario`= :id,`nombreUsuario`= :nom ,`tipoDocumentoUsuario`= :tpd,`documentoUsuario`= :doc,`correoUsuario`= :corr,`contraseñaUsuario`= :con,`estadoUsuario`= :est,`idRol`= :idr WHERE idUsuario = :idb");
    $actualizarCliente->execute(array('id' => $idUsuario, 'nom'=>$nombreUsuario, 'tpd'=>$tipoDocumentoUsuario, 'doc'=>$documentoUsuario, 'corr'=>$correoUsuario,'con'=>$contrasenaUsuario, 'est'=>$estadoUsuario, 'idr'=>$rolUsuario, 'idb'=>$idUsuarioBusqueda));

}
echo json_encode($valido);

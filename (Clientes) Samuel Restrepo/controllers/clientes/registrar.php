<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

if($_POST){  
    $nombreCliente = $_POST['nombreCliente'];
    $tipoDocumentoCliente = $_POST['tipoDocumentoCliente'];
    $documentoCliente = $_POST['documentoCliente'];
    $telefonoCliente = $_POST['telefonoCliente'];
    $correoCliente = $_POST['correoCliente'];
    $estadoCliente = 'Activo';

    $registrarClientes = $con->prepare("INSERT INTO `clientes`(`idCliente`, `nombreCliente`, `tipoDocumentoCliente`, `documentoCliente`, `telefonoCliente`, `correoCliente`, `estadoCliente`) 
    VALUES ('',:nom ,:tipoDoc,:doc,:tel,:corr,:est)");
    $registrarClientes->execute(array('nom'=> $nombreCliente, 'tipoDoc'=>$tipoDocumentoCliente,
    'doc'=>$documentoCliente, 'tel'=>$telefonoCliente, 'corr'=>$correoCliente, 'est'=>$estadoCliente));    
}
echo json_encode($valido);

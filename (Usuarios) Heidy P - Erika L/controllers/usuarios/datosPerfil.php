<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();


$datos_ = array('nombre' => '','tipoDocumento'=>'','documento' =>'', 'correo' => "",'rol'=>'', 'contraseña' => "","estado"=>'');


if($_POST){
    $id = $_POST['id'];
    
    // --------------- OBTENER DATOS -------------
    $datos = $con->query("SELECT * FROM `usuarios` WHERE idUsuario = $id");
    $datos->execute();

    $consultas = $datos->fetchAll(PDO::FETCH_ASSOC);
 
   
    // -------------- ENVIAR LOS DATOS ----------
   
    $datos_['nombre'] = $consultas[0]['nombreUsuario'];
    $datos_['tipoDocumento'] = $consultas[0]['tipoDocumentoUsuario'];
    $datos_['documento'] = $consultas[0]['documentoUsuario'];
    $datos_['correo'] = $consultas[0]['correoUsuario'];
    $datos_['contraseña'] = $consultas[0]['contraseñaUsuario'];
    $datos_['rol'] = $consultas[0]['idRol'];
    $datos_['estado'] = $consultas[0]['estadoUsuario'];


}

echo json_encode($datos_);

?>
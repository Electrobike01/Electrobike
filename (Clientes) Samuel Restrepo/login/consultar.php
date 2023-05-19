<?php
require_once '../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => false, 'mensaje' => '', 'id' =>'','permisos' => '', 'nombre' => '');

if ($_POST) {
    $correo = $_POST['correo'];
    $contraseña = $_POST['contraseña'];


    //VALIDOR SI EL CORREO EXISTE
    $correoExistente = $con->prepare("SELECT * FROM `usuarios` WHERE correoUsuario = :corr ");
    $correoExistente->execute(['corr' => $correo]);
    $respuestaCorreoEx = $correoExistente->rowCount();

    //VALIDOR SI EL CORREO EXISTE
    $login = $con->prepare("SELECT * FROM  usuarios WHERE correoUsuario = :corr AND contraseñaUsuario = :pass");
    $login->execute(array('corr' => $correo, 'pass' => $contraseña));
    $respuestaLogin = $login->rowCount();

    //VALIDOR SI EL CORREO Y LA CONTRASEÑA EXISTEN Y ESTA ACTIVO
    $UserActivo = $con->prepare("SELECT * FROM  usuarios WHERE correoUsuario = :corr AND contraseñaUsuario = :pass AND estadoUsuario = 'Activo' ");
    $UserActivo->execute(array('corr' => $correo, 'pass' => $contraseña));
    $respuestaActivo = $UserActivo->rowCount();




    //Si el correo no existe...
    if ($respuestaCorreoEx == 0) {
        $valido['success'] = false;
        $valido['mensaje'] = 'El correo no existe';

        //Si el correo existe...
    } else {
        //Si la contraseña es erronea...
        if ($respuestaLogin == 0) {
            $valido['success'] = false;
            $valido['mensaje'] = 'Contraseña Incorrecta';

            //Si la contraseña es correcta
        } else {
            //Si el usuario esta inactivo
            if ($respuestaActivo == 0) {
                $valido['success'] = false;
                $valido['mensaje'] = 'Su usuario se encuentra inactivo';

                //Si el usuario esta activo
            } else {

                //CONSULTAR PERMISOS DEL USUARIO
                $query = $con->query("SELECT * FROM usuarios where correoUsuario = '$correo' ");
                $query->execute();
                $consultas = $query->fetchAll(PDO::FETCH_ASSOC);

                $idRol = ($consultas[0])['idRol'];
                $nombreUsuario = ($consultas[0])['nombreUsuario'];
                $idU  = ($consultas[0])['idUsuario'];

                $sqlNombreRol = $con->query("SELECT * FROM `roles` WHERE idRol = '$idRol'");
                $sqlNombreRol->execute();
                $consultaRol = $sqlNombreRol->fetchAll(PDO::FETCH_ASSOC);

                $permisos = ($consultaRol[0])['permisosRol'];

                $valido['success'] = true;
                $valido['mensaje'] = 'Bienvenido al sistema';
                $valido['id'] = $idU;
                $valido['permisos'] = $permisos;
                $valido['nombre'] = $nombreUsuario;
            }
        }
    }
}



echo json_encode($valido);

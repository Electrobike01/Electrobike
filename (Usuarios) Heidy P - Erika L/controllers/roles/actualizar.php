<?php
require_once '../../controllers/conexion.php';



if (isset($_POST['guardarRoles'])) {

    $idBusqueda = $_POST['idRol'];
    $idRol = $_POST['idRol'];

    $nombreRol = $_POST['nombreRol'];
    $estadoRol = $_POST['estadoRol'];

    $permisoUsuarios = $_POST['permiso_usuarios'];
    $permisoRoles = $_POST['permiso_roles'];
    $permisoProveedores = $_POST['permiso_proveedores'];
    $permisoCompras = $_POST['permiso_compras'];
    $permisoProductos = $_POST['permiso_productos'];
    $permisoClientes = $_POST['permiso_clientes'];
    $permisoVentas = $_POST['permiso_ventas'];

    $permisos = [$permisoUsuarios, $permisoRoles, $permisoProveedores, $permisoCompras, $permisoProductos, $permisoClientes, $permisoVentas];
   

    $listaPermisos = "";
    foreach ($permisos as $key => $permiso) {
        if ($permiso != ""){
            $permiso = ucwords(strtolower($permiso)) ;
            $listaPermisos = " $listaPermisos  $permiso , ";
        }   
    };

    $listaPermisos = substr($listaPermisos, 0, strlen($listaPermisos)-1);
    $listaPermisos = substr($listaPermisos, 0, strlen($listaPermisos)-1);
    echo $nombreRol;
    echo $estadoRol;
    echo $listaPermisos;




     $sql = "UPDATE `roles`
      SET `idRol`='$idRol',`nombreRol`='$nombreRol',`permisosRol`='$listaPermisos',`estadoRol`='$estadoRol' WHERE idRol=$idBusqueda" ;
     $query = $con->query($sql);
      header("location:../../views/roles/listar.php");

  





}




?>
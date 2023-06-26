-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-06-2023 a las 07:21:50
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `electrobike`
--

-- Tabla roles
CREATE TABLE `roles` (
  `idRol` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nombreRol` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `permisosRol` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `estadoRol` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `roles` (`idRol`, `nombreRol`, `permisosRol`, `estadoRol`) VALUES
(1, 'Administrador', 'Usuarios ,   Roles ,   Proveedores ,   Compras ,   Productos ,   Clientes ,   Ventas', 'Activo');

-- Tabla usuarios
CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nombreUsuario` varchar(255) DEFAULT NULL,
  `tipoDocumentoUsuario` varchar(50) DEFAULT NULL,
  `documentoUsuario` varchar(50) DEFAULT NULL,
  `correoUsuario` varchar(255) DEFAULT NULL,
  `contrasenaUsuario` varchar(255) DEFAULT NULL,
  `estadoUsuario` varchar(50) DEFAULT NULL,
  `idRol` int(11) DEFAULT NULL,
   FOREIGN KEY(idRol) REFERENCES roles(idRol)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `usuarios` (`idUsuario`, `nombreUsuario`, `tipoDocumentoUsuario`, `documentoUsuario`, `correoUsuario`, `contrasenaUsuario`, `estadoUsuario`, `idRol`) VALUES
(1, 'Elkin Dario Builesd', 'Cédula', '101333641', 'elkindario@gmail.com', '12345', 'Activo', 1);



-- Tabla productos
CREATE TABLE `productos` (
  `idProducto` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nombreProducto` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `cantidadProducto` int(6) NOT NULL,
  `categoriaProducto` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `estadoProducto` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `productos` (`idProducto`, `nombreProducto`, `cantidadProducto`, `categoriaProducto`, `estadoProducto`) VALUES
(1, 'Rin 26 pulgadas', 0, 'Repuestos alta gama', 'Activo'),
(2, 'Llanta 29 pulgadas', 0, 'Repuestos baja gama', 'Activo'),
(3, 'Tensor de cambio', 0, 'Repuestos baja gama', 'Activo'),
(4, 'Cadena de bicicleta', 0, 'Repuestos alta gama', 'Activo'),
(5, 'Manubrio recto', 0, 'Repuestos baja gama', 'Activo'),
(6, 'Cuadro de carbono', 0, 'Bicicletas alta gama', 'Activo'),
(7, 'Pedales de plataforma', 0, 'Repuestos baja gama', 'Activo'),
(8, 'Horquilla de suspensión', 0, 'Repuestos alta gama', 'Activo'),
(9, 'Freno de disco hidráulico', 0, 'Repuestos alta gama', 'Activo'),
(10, 'Asiento de gel', 0, 'Repuestos baja gama', 'Activo'),
(11, 'Bicicleta Specialized', 0, 'Bicicletas baja gama', 'Activo'),
(12, 'Bicicleta Giant', 0, 'Bicicletas baja gama', 'Activo'),
(13, 'Rueda delantera', 0, 'Repuestos baja gama', 'Activo'),
(14, 'Rueda trasera', 0, 'Repuestos baja gama', 'Activo'),
(15, 'Freno de disco mecánico', 0, 'Repuestos alta gama', 'Activo'),
(16, 'Bicicleta Trek', 0, 'Bicicletas alta gama', 'Activo'),
(17, 'Cubierta para llanta', 0, 'Repuestos baja gama', 'Activo'),
(18, 'Pedalier Shimano', 0, 'Repuestos alta gama', 'Activo'),
(19, 'Cassette de 10 velocidades', 0, 'Repuestos alta gama', 'Activo'),
(20, 'Sillín de cuero', 0, 'Repuestos baja gama', 'Activo');

-- Tabla proveedores
CREATE TABLE `proveedores` (
  `idProveedor` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nombreProveedor` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `tipoDocumentoProveedor` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `documentoProveedor` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `correoProveedor` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `telefonoProveedor` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `estadoProveedor` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla compras
CREATE TABLE `compras` (
  `idCompra` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idProveedor` int(11) DEFAULT NULL,
  `valorT` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `fechaCompra` date NOT NULL,
   FOREIGN KEY(idProveedor) REFERENCES proveedores(idProveedor)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla detalleCompra
CREATE TABLE `detallecompra` (
  `idDetalleCompra` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idProducto` int(4) DEFAULT NULL,
  `idCompra` int(4) DEFAULT NULL,
  `cantidad` int(8) DEFAULT NULL,
  `valor` double DEFAULT NULL,
   FOREIGN KEY(idProducto) REFERENCES productos(idProducto),
   FOREIGN KEY(idCompra) REFERENCES compras(idCompra)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla clientes
CREATE TABLE `clientes` (
  `idCliente` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nombreCliente` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `tipoDocumentoCliente` varchar(50) NOT NULL,
  `documentoCliente` varchar(200) NOT NULL,
  `telefonoCliente` varchar(50) NOT NULL,
  `correoCliente` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `estadoCliente` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Tabla ventas
CREATE TABLE `ventas` (
  `idVenta` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idCliente` int(11) DEFAULT NULL,
  `valorT` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `fechaVenta` date NOT NULL,
   FOREIGN KEY(idCliente) REFERENCES clientes(idCliente)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Tabla detalleVenta
CREATE TABLE `detalleventa` (
  `idDetalleVenta` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idProducto` int(4) DEFAULT NULL,
  `idVenta` int(4) DEFAULT NULL,
  `cantidad` int(8) DEFAULT NULL,
  `valor` double DEFAULT NULL,
   FOREIGN KEY(idProducto) REFERENCES productos(idProducto),
   FOREIGN KEY(idVenta) REFERENCES ventas(idVenta)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;




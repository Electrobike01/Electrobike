-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-05-2023 a las 06:41:34
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `idCliente` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nombreCliente` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `tipoDocumentoCliente` varchar(50) NOT NULL,
  `documentoCliente` varchar(200) NOT NULL,
  `telefonoCliente` varchar(50) NOT NULL,
  `correoCliente` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `estadoCliente` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`idCliente`, `nombreCliente`, `tipoDocumentoCliente`, `documentoCliente`, `telefonoCliente`, `correoCliente`, `estadoCliente`) VALUES
(1, 'Daniel G', 'Cedula', '101333641', '3238066936', 'daguarin14@misena.edu.co', 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `idProveedor` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `tipoDocumentoProveedor` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `documentoProveedor` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `nombreProveedor` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `telefonoProveedor` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `estadoProveedor` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`idProveedor`, `tipoDocumentoProveedor`, `documentoProveedor`, `nombreProveedor`, `telefonoProveedor`, `estadoProveedor`) VALUES
(1, 'Tarjeta de identidad', '1013336741', 'Daniel Alejandro ', '3238066936', 'Activo'),
(2, 'Tarjeta de identidad', '1040571137', 'Juan José Suarez', '3205017961', 'Activo'),
(3, 'Tarjeta de identidad', '1013336740', 'Daniel Alejandro G', '6118820983', 'Inactivo'),

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `idRol` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nombreRol` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `permisosRol` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `estadoRol` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`idRol`, `nombreRol`, `permisosRol`, `estadoRol`) VALUES
(1, 'Administrador', 'Usuarios ,   Roles ,   Proveedores ,   Compras ,   Productos ,   Clientes ,   Ventas ', 'Activo'),
(2, 'Empleado', 'Proveedores ,   Compras ,   Productos ,   Clientes ,   Ventas ', 'Activo'),
(3, 'Cajero', 'Usuarios ,   Proveedores ,   Compras ,   Productos ,   Ventas ', 'Activo'),
(4, 'Mecanico', '        Roles ,   Proveedores ,   Compras ,   Productos ,   Clientes ,   Ventas ', 'Inactivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nombreUsuario` varchar(255) DEFAULT NULL,
  `tipoDocumentoUsuario` varchar(50) DEFAULT NULL,
  `documentoUsuario` varchar(50) DEFAULT NULL,
  `correoUsuario` varchar(255) DEFAULT NULL,
  `contraseñaUsuario` varchar(255) DEFAULT NULL,
  `estadoUsuario` varchar(50) DEFAULT NULL,
  `idRol` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombreUsuario`, `tipoDocumentoUsuario`, `documentoUsuario`, `correoUsuario`, `contraseñaUsuario`, `estadoUsuario`, `idRol`) VALUES
(1, 'Daniel Guarin Giraldo', 'Cedula', '101333641', 'alejo.guarin.0214@gmail.com', '12345', 'Activo', 1),
(2, 'Juanjo Bonolys S', 'Cedula', '101333640', 'bonolisjuanjo@gmail.com', '67890', 'Inactivo', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`idCliente`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`idProveedor`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idRol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `idRol` (`idRol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `idCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `idProveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idRol`) REFERENCES `roles` (`idRol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

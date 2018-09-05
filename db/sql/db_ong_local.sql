-- version 4.8.1
-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2018 at 03:46 AM
-- Server version: 10.1.33-MariaDB
-- PHP Version: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";



/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_ong_local`
--


-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `state` tinyint(1) NOT NULL,
  `email` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `eventos`
--


CREATE TABLE `eventos` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `id_ref` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `city` varchar(256) NOT NULL,
  `address` varchar(255) NOT NULL,
  `atachments` varchar(255) NOT NULL,
  `state` tinyint(1) NOT NULL,
  `img` varchar(255) NOT NULL,
  `estado_evento` enum('activo','suspendido') NOT NULL DEFAULT 'suspendido',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  CONSTRAINT `fk_ref_evento`
    FOREIGN KEY (id_ref) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `lineas`
--

CREATE TABLE `lineas` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nombre_linea` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `lineas`:
--

-- --------------------------------------------------------
--
-- Table structure for table `proceso`

--

CREATE TABLE `proceso` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `fk_id_linea` int(10) UNSIGNED NOT NULL,
  `nombre_proceso` varchar(256) NOT NULL,
  CONSTRAINT `fk_ref_linea`
    FOREIGN KEY (fk_id_linea) REFERENCES lineas (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- --------------------------------------------------------

--
-- Table structure for table `participantes`
--

CREATE TABLE `participantes` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `tipo_doc` varchar(255) DEFAULT NULL,
  `documento` bigint(255) UNSIGNED DEFAULT NULL,
  `lugar_exp` varchar(255) DEFAULT NULL,
  `pri_apellido` varchar(255) DEFAULT NULL,
  `seg_apellido` varchar(255) DEFAULT NULL,
  `pri_nombre` varchar(255) DEFAULT NULL,
  `seg_nombre` varchar(255) DEFAULT NULL,
  `ciud_nacimiento` varchar(255) DEFAULT NULL,
  `dep_nacimiento` varchar(255) DEFAULT NULL,
  `vereda_nacimiento` varchar(255) DEFAULT NULL,
  `fecha_nac` varchar(255) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `genero` varchar(255) DEFAULT NULL,
  `sub_genero` varchar(255) DEFAULT NULL,
  `cap_dife` varchar(255) DEFAULT NULL,
  `etnia` varchar(255) DEFAULT NULL,
  `sub_etnia` varchar(255) DEFAULT NULL,
  `zona` varchar(255) DEFAULT NULL,
  `departamento_ubi` varchar(256) DEFAULT NULL,
  `municipio` varchar(255) DEFAULT NULL,
  `vereda_ubi` varchar(256) DEFAULT NULL,
  `celular` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `escolaridad` varchar(255) DEFAULT NULL,
  `titulo_obt` varchar(255) DEFAULT NULL,
  `anio_ingreso_pdp` int(11) DEFAULT NULL,
  `cargo_poblador` varchar(256) DEFAULT NULL,
  `huella_binaria` blob,
  `state` tinyint(1) DEFAULT NULL,
  `estado_registro` enum('verificado','registrado','participando','antiguo','por_registrar') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `tipo_registro` varchar(20) DEFAULT NULL,
    KEY (`documento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `participantes`:
--

-- --------------------------------------------------------


--
-- Table structure for table `detalle_procesos`
--

CREATE TABLE `detalle_procesos` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `id_usuario` bigint(255) UNSIGNED DEFAULT NULL,
  `id_proceso` int(11) UNSIGNED DEFAULT NULL,
  `created_at` datetime NOT NULL,
   CONSTRAINT `fk_id_usuario`
    FOREIGN KEY (id_usuario) REFERENCES participantes (documento)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_id_dt_proceso`
    FOREIGN KEY (id_proceso) REFERENCES proceso (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
--
-- Table structure for table `detalle_participantes`
--

CREATE TABLE `detalle_participantes` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` bigint(255) UNSIGNED DEFAULT NULL,
  `event_id` int(10) UNSIGNED NOT NULL,
  `acepta_terminos` enum('SI','NO') NOT NULL DEFAULT 'NO',
  `acepta_terminos_foto` enum('SI','NO') NOT NULL DEFAULT 'NO',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  CONSTRAINT `fk_user_id`
    FOREIGN KEY (user_id) REFERENCES participantes (documento)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_event_id`
    FOREIGN KEY (event_id) REFERENCES eventos (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE    
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
--
-- Table structure for table `sincronizaciones`
--

CREATE TABLE `sincronizaciones` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `fecha` datetime NOT NULL,
  `usuario` int(11) UNSIGNED NOT NULL,
  `tipo` enum('preparacion','sincronizacion') NOT NULL,
   CONSTRAINT `fk_user_id_syn`
    FOREIGN KEY (usuario) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 28, 2018 at 05:43 PM
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
-- Table structure for table `detalle_participantes`
--

CREATE TABLE `detalle_participantes` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `event_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `detalle_participantes`:
--

-- --------------------------------------------------------

--
-- Table structure for table `detalle_procesos`
--

CREATE TABLE `detalle_procesos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) UNSIGNED DEFAULT NULL,
  `id_proceso` int(11) UNSIGNED DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `detalle_procesos`:
--

-- --------------------------------------------------------

--
-- Table structure for table `eventos`
--

CREATE TABLE `eventos` (
  `id` int(10) UNSIGNED NOT NULL,
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
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `eventos`:
--

-- --------------------------------------------------------

--
-- Table structure for table `lineas`
--

CREATE TABLE `lineas` (
  `id` int(11) NOT NULL,
  `nombre_linea` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `lineas`:
--

-- --------------------------------------------------------

--
-- Table structure for table `participantes`
--

CREATE TABLE `participantes` (
  `id` int(10) UNSIGNED NOT NULL,
  `tipo_doc` varchar(255) DEFAULT NULL,
  `documento` int(11) UNSIGNED DEFAULT NULL,
  `lugar_exp` varchar(255) DEFAULT NULL,
  `pri_apellido` varchar(255) DEFAULT NULL,
  `seg_apellido` varchar(255) DEFAULT NULL,
  `pri_nombre` varchar(255) DEFAULT NULL,
  `seg_nombre` varchar(255) DEFAULT NULL,
  `ciud_nacimiento` varchar(255) DEFAULT NULL,
  `dep_nacimiento` varchar(255) DEFAULT NULL,
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
  `celular` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `escolaridad` varchar(255) DEFAULT NULL,
  `titulo_obt` varchar(255) DEFAULT NULL,
  `anio_ingreso_pdp` int(11) DEFAULT NULL,
  `cargo_poblador` varchar(256) DEFAULT NULL,
  `huella_binaria` blob,
  `state` tinyint(1) DEFAULT NULL,
  `estado_registro` enum('verificado','registrado','participando','antiguo') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `tipo_registro` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `participantes`:
--

-- --------------------------------------------------------

--
-- Table structure for table `proceso`
--

CREATE TABLE `proceso` (
  `id` int(11) UNSIGNED NOT NULL,
  `fk_id_linea` int(10) UNSIGNED NOT NULL,
  `nombre_proceso` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `proceso`:
--

-- --------------------------------------------------------

--
-- Table structure for table `sincronizaciones`
--

CREATE TABLE `sincronizaciones` (
  `id` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `usuario` int(11) NOT NULL,
  `tipo` enum('preparacion','sincronizacion') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `sincronizaciones`:
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `state` tinyint(1) NOT NULL,
  `email` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `users`:
--

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detalle_participantes`
--
ALTER TABLE `detalle_participantes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `detalle_participantes_user_id_foreign` (`user_id`),
  ADD KEY `detalle_participantes_event_id_foreign` (`event_id`);

--
-- Indexes for table `detalle_procesos`
--
ALTER TABLE `detalle_procesos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_participante` (`id_usuario`),
  ADD KEY `fk_id_proceso` (`id_proceso`);

--
-- Indexes for table `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `eventos_id_ref_foreign` (`id_ref`);

--
-- Indexes for table `lineas`
--
ALTER TABLE `lineas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `participantes`
--
ALTER TABLE `participantes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `documento` (`documento`);

--
-- Indexes for table `proceso`
--
ALTER TABLE `proceso`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sincronizaciones`
--
ALTER TABLE `sincronizaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detalle_participantes`
--
ALTER TABLE `detalle_participantes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detalle_procesos`
--
ALTER TABLE `detalle_procesos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `eventos`
--
ALTER TABLE `eventos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lineas`
--
ALTER TABLE `lineas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `participantes`
--
ALTER TABLE `participantes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `proceso`
--
ALTER TABLE `proceso`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sincronizaciones`
--
ALTER TABLE `sincronizaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

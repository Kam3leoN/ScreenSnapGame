-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : Dim 12 sep. 2021 à 19:04
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `screenzone`
--

-- --------------------------------------------------------

--
-- Structure de la table `snap_settings`
--

DROP TABLE IF EXISTS `snap_settings`;
CREATE TABLE IF NOT EXISTS `snap_settings` (
  `setting_id` int(11) NOT NULL AUTO_INCREMENT,
  `setting_name` varchar(255) NOT NULL,
  `setting_time` varchar(2) NOT NULL,
  `setting_lifes` varchar(1) NOT NULL,
  `setting_choices` varchar(1) NOT NULL,
  `setting_fifty` tinyint(1) NOT NULL,
  `setting_switch` tinyint(1) NOT NULL,
  PRIMARY KEY (`setting_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `snap_settings`
--

INSERT INTO `snap_settings` (`setting_id`, `setting_name`, `setting_time`, `setting_lifes`, `setting_choices`, `setting_fifty`, `setting_switch`) VALUES
(1, 'Easy', '9', '5', '4', 1, 1),
(2, 'Medium', '8', '4', '3', 0, 1),
(3, 'Hard', '7', '3', '3', 0, 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

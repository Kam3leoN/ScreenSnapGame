-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : Dim 12 sep. 2021 à 19:03
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
-- Structure de la table `snap_scores`
--

DROP TABLE IF EXISTS `snap_scores`;
CREATE TABLE IF NOT EXISTS `snap_scores` (
  `score_id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT,
  `score_username` varchar(255) NOT NULL,
  `score_hiscore` int(11) UNSIGNED NOT NULL,
  `score_session` varchar(255) NOT NULL,
  `score_created_at` datetime NOT NULL,
  PRIMARY KEY (`score_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `snap_scores`
--

INSERT INTO `snap_scores` (`score_id`, `score_username`, `score_hiscore`, `score_session`, `score_created_at`) VALUES
(1, 'Kam3leoN', 39250, '', '2010-03-13 11:30:01'),
(2, 'DjLeChuck', 30700, '', '2020-03-14 10:57:49'),
(3, 'Clouder', 10600, '', '0000-00-00 00:00:00');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

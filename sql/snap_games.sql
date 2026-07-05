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
-- Structure de la table `snap_games`
--

DROP TABLE IF EXISTS `snap_games`;
CREATE TABLE IF NOT EXISTS `snap_games` (
  `snap_id` int(11) NOT NULL AUTO_INCREMENT,
  `snap_title` varchar(255) NOT NULL,
  `snap_image` varchar(255) NOT NULL,
  PRIMARY KEY (`snap_id`)
) ENGINE=MyISAM AUTO_INCREMENT=150 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `snap_games`
--

INSERT INTO `snap_games` (`snap_id`, `snap_title`, `snap_image`) VALUES
(2, 'Sonic the Hedgehog', 'sonic_the_hedgehog.png'),
(3, 'Street of Rage 2', 'streets_of_rage_2.png'),
(4, 'Baseball Stars 2', 'baseball_stars_2.png'),
(5, 'Killer Instinct 2', 'killer_instinct_2.png'),
(6, 'Marvel vs. Capcom 2', 'marvel_vs_capcom_2.png'),
(7, 'Final Fight 3', 'final_fight_3.png'),
(8, 'Capcom Sports Club', 'capcom_sports_club.png'),
(9, 'Street Fighter Alpha 3', 'street_fighter_alpha_3.png'),
(10, 'X-Men Vs. Street Fighter', 'x_men_vs_street_fighter.png'),
(11, 'Rezon', 'rezon.png'),
(12, 'Snow Brothers 3 Magical Adventure', 'snow_brothers_3_magical_adventure.png'),
(13, '1941 Counter Attack', '1941_counter_attack.png'),
(14, 'Captain Commando', 'captain_commando.png'),
(15, 'Mega Man the Power Battle', 'mega_man_the_power_battle.png'),
(16, 'The King of Fighters XI', 'the_king_of_fighters_XI.png'),
(17, 'The Punisher', 'the_punisher.png'),
(18, 'Three Wonders', 'three_wonders.png'),
(19, 'Warriors of Fate', 'warriors_of_fate.png'),
(20, 'Cadillacs and Dinosaurs', 'cadillacs_and_dinosaurs.png'),
(21, 'Donkey Kong Jr', 'donkey_kong_jr.png'),
(22, 'Metal Slug 3', 'metal_slug_3.png'),
(23, 'Rally Bike', 'rally_bike.png'),
(24, 'Street Fighter III 3rd Strike', 'street fighter_III_3rd_strike.png'),
(25, 'Kung Fu Master', 'kung_fu_master.png'),
(26, 'Warzard', 'warzard.png'),
(27, 'JoJo\'s Venture', 'jojos_venture.png'),
(28, 'Red Earth', 'red_earth.png'),
(29, 'Vs. Ice Climber', 'vs_ice_climber.png'),
(30, 'Samurai Shodown Special', 'samurai_shodown_special.png'),
(31, 'Garou Mark: of the Wolves.png', 'garou_mark_of_the_wolves.png'),
(32, 'Ghost Pilots', 'ghost_pilots.png'),
(33, 'Windjammers', 'windjammers.png'),
(34, 'Donkey Kong 3', 'donkey_kong_3.png'),
(35, 'Donkey Kong', 'donkey_kong.png'),
(36, 'Solomon\'s Key', 'solomons_key.png'),
(37, '\'88 Games', '88_games.png'),
(38, 'Alex Kidd : the Lost Stars', 'alex_kidd_the_lost_stars.png'),
(39, 'Alien 3 : The Gun', 'alien_3_the_gun.png'),
(40, 'Alligator Hunt', 'alligator_hunt.png'),
(41, 'Bomb Jack', 'bombjack.png'),
(42, 'Prince of Persia', 'prince_of_persia.png'),
(43, 'Virtua Racing', 'virtua_racing.png'),
(44, 'Kirby\'s Dream Land 3', 'kirbys_dreamland_3.png'),
(45, 'Cobra Triangle', 'cobra_triangle.png'),
(46, 'Mike Tyson\'s Punch-Out!!', 'mike_tysons_punch_out.png'),
(47, 'Racing Beat', 'racing_beat.png'),
(48, 'Punk Shot', 'punk_shot.png'),
(49, 'Magical Drop III', 'magical_drop_III.png'),
(50, 'Tiger Road', 'tiger_road.png'),
(51, 'Breakers Revenge', 'breakers_revenge.png'),
(52, 'Chuka Taisen', 'chuka_taisen.png'),
(53, 'Real Bout Fatal Fury Special', 'real_bout_fatal_fury_special.png'),
(54, 'Duck Hunt', 'duck_hunt.png'),
(55, 'RoboCop', 'robocop.png'),
(56, 'Double Axle', 'double_axle.png'),
(57, 'The Gladiator', 'the_gladiator.png'),
(58, 'Sokonuke Taisen Game', 'sokonuke_taisen_game.png'),
(59, 'World Heroes 2 Jet', 'world_heroes_2_jet.png'),
(60, 'Super Mario World', 'super_mario_world.png'),
(61, 'Chrono Trigger', 'chrono_trigger.png'),
(62, 'Pocket Gals V.I.P', 'pocket_gals_vip.png'),
(63, 'Megaman X ', 'megaman_x.png'),
(64, 'The Mask', 'the_mask.png'),
(65, 'Metal Max 2', 'metal_max_2.png'),
(66, 'Mickey to Donald - Magical Adventure 3', 'mickey_to_donald_magical_adventure_3.png'),
(67, 'Cool Spot', 'cool_spot.png'),
(68, 'Aladdin', 'aladdin.png'),
(69, 'ActRaiser', 'actraiser.png'),
(70, 'Asterix', 'asterix.png'),
(71, 'Batman Returns', 'batman_returns.png'),
(72, 'Battle Soccer 2', 'battle_soccer_2.png'),
(73, 'Beauty and the Beast', 'beauty_and_the_beast.png'),
(74, 'Bonkers', 'bonkers.png'),
(75, 'Breath of Fire', 'breath_of_fire.png'),
(76, 'Bust a Move', 'bust_a_move.png'),
(77, 'Castlevania - Dracula X', 'castlevania_dracula_x.png'),
(78, 'Choplifter III - Rescue Survive', 'choplifter_III_rescue_survive.png'),
(79, 'Daffy Duck - The Marvin Missions', 'daffy_duck_the_marvin_missions.png'),
(80, 'Dragon - The Bruce Lee Story', 'dragon_the_bruce_lee_story.png'),
(81, 'Dragon Ball Z - Ultime Menace', 'dragonball_z_ultime_menace.png'),
(82, 'Dragon Knight 4', 'dragon_knight_4.png'),
(83, 'Earthworm Jim', 'earthworm_jim.png'),
(84, 'F-Zero', 'fzero.png'),
(85, 'Fatal Fury', 'fatal_fury.png'),
(86, 'FIFA \'98 - Road to World Cup', 'fifa_98_road_to_world_cup.png'),
(87, 'Goof Troop', 'goof_troop.png'),
(88, 'Gradius III', 'gradius_III.png'),
(89, 'Hook', 'hook.png'),
(90, 'Samourai Shodown', 'samourai_shodown.png'),
(91, 'Final Fantasy II', 'final_fantasy_II.png'),
(92, 'Final Fight Guy', 'final_fight_guy.png'),
(93, 'Flashback', 'flashback.png'),
(94, 'Garou Densetsu Special', 'garou_densetsu_special.png'),
(95, 'Ghoul Patrol', 'ghoul_patrol.png'),
(96, 'Gunforce - Battle Fire', 'gunforce.png'),
(97, 'Harvest Moon', 'harvest_moon.png'),
(98, 'Hello! Pac-Man', 'hello_pac_man.png'),
(99, 'Hurricanes', 'hurricanes.png'),
(100, 'Illusion of Gaia', 'illusion_of_gaia.png'),
(101, 'Illusion of Time', 'illusion_of_time.png'),
(102, 'Indiana Jones : Greatest Adventures', 'indiana_jones_greatest_adventures.png'),
(103, 'Iron Commando - Koutetsu no Senshi', 'iron_commando_koutetsu_no_senshi.png'),
(104, 'Itchy & Scratchy', 'itchy_cratchy.png'),
(105, 'James Bond Jr.', 'james_bond_jr.png'),
(106, 'Joe & Mac', 'joe_mac.png'),
(107, 'Justice League Task Force', 'justice_league_task_force.png'),
(108, 'Killer Instinct', 'killer_instinct.png'),
(109, 'Knights of the Round', 'knights_of_the_round.png'),
(110, 'Legend', 'legend.png'),
(111, 'Skyblazer', 'skyblazer.png'),
(112, 'Mystic Quest', 'mystic_quest.png'),
(113, 'Bandits', 'bandits.png'),
(114, 'Shufflepuck Cafe', 'shufflepuck_cafe.png'),
(115, 'Curse of Ra', 'curse_of_ra.png'),
(116, 'Armed Police Batrider', 'armed_police_batrider.png'),
(117, 'ESP Ra.De.', 'esp_ra_de.png'),
(118, 'Change Air Blade', 'change_air_blade.png'),
(119, 'All Point Bulletin', 'all_point_bulletin.png'),
(120, 'Armored Car', 'armored_car.png'),
(121, 'Legend of Zelda - Minish Cap', 'legend_of_zelda_the_minish_cap.png'),
(122, '3 Ninjas Kick Back', '3_ninjas_kick_back.png'),
(123, '3d  Worldrunner', '3d_worldrunner.png'),
(124, '8 Eyes', '8_eyes.png'),
(125, 'Actraiser 2', 'actraiser_2.png'),
(126, 'Addams Family Values', 'addams_family_values.png'),
(127, 'Addams Family', 'addams-family.png'),
(128, 'Aero the Acro-Bat 2', 'aero_the_acro-bat_2.png'),
(129, 'Air Fortress', 'air_fortress.png'),
(130, 'Alien 3', 'alien_3.png'),
(131, 'Alien Syndrome', 'alien_syndrome.png'),
(132, 'Alpha Mission 2', 'alpha_mission_2.png'),
(133, 'American Tail an Fievel Goes West', 'american_tail_an_fievel_goes_west.png'),
(134, 'Ardy Lightfoot', 'ardy_lightfoot.png'),
(135, 'Astyanax', 'astyanax.png'),
(136, 'Back to the Future', 'back_to_the_future.png'),
(137, 'Bad Dudes', 'bad_dudes.png'),
(138, 'Batman the Video Game', 'batman_the_video_game.png'),
(139, 'Battle Chess', 'battle_chess.png'),
(140, 'Bionic Commando', 'bionic_commando.png'),
(141, 'Blades of Steel.png', 'blades_of_steel.png'),
(142, 'Blaster Master', 'blaster_master.png'),
(143, 'Blues Journey', 'blues_journey.png'),
(144, 'Bubble Bobble', 'bubble_bobble.png'),
(145, 'Chip\'n Dale: Rescue Rangers', 'chipn-dale_rescue_rangers.png'),
(146, 'Dig Dug', 'dig_dug.png'),
(147, 'Eight Man.png', 'eight_man.png'),
(148, 'Savage Reign', 'savage_reign.png'),
(149, 'Shock Troopers 2nd Squad', 'shock_troopers_2nd_squad.png');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

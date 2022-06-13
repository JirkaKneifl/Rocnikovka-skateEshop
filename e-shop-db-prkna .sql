-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Pon 13. čen 2022, 20:28
-- Verze serveru: 10.4.11-MariaDB
-- Verze PHP: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `e-shop-db-prkna`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `kategorie`
--

CREATE TABLE `kategorie` (
  `ID_kategorie` int(11) NOT NULL,
  `nazev` char(20) COLLATE utf8mb4_czech_ci NOT NULL,
  `ID_kat_nadrazene` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Vypisuji data pro tabulku `kategorie`
--

INSERT INTO `kategorie` (`ID_kategorie`, `nazev`, `ID_kat_nadrazene`) VALUES
(1, 'Desky', NULL),
(2, 'Longboard Desky', 1),
(3, 'Skateboard Desky', 1),
(4, 'Kolečka', NULL),
(5, 'Longboard Kolečka', 4),
(6, 'Skateboard Kolečka', 4),
(7, 'Trucky', NULL),
(8, 'Longboard Trucky', 7),
(9, 'Skateboard Trucky', 7);

-- --------------------------------------------------------

--
-- Struktura tabulky `objednavky`
--

CREATE TABLE `objednavky` (
  `cislo` int(11) NOT NULL,
  `dat_prijeti` datetime NOT NULL,
  `dat_expedice` datetime DEFAULT NULL,
  `zam_prijal` int(11) DEFAULT NULL,
  `zam_zpracoval` int(11) DEFAULT NULL,
  `zam_expedoval` int(11) DEFAULT NULL,
  `jmeno` char(20) COLLATE utf8mb4_czech_ci NOT NULL,
  `prijmeni` char(20) COLLATE utf8mb4_czech_ci NOT NULL,
  `telefon` int(9) UNSIGNED ZEROFILL NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_czech_ci NOT NULL,
  `ulice` varchar(50) COLLATE utf8mb4_czech_ci NOT NULL,
  `psc` int(6) NOT NULL,
  `mesto` char(50) COLLATE utf8mb4_czech_ci NOT NULL,
  `Popis` varchar(64) COLLATE utf8mb4_czech_ci DEFAULT NULL,
  `ID_stav` int(11) NOT NULL,
  `celkovaCena` decimal(10,2) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Vypisuji data pro tabulku `objednavky`
--

INSERT INTO `objednavky` (`cislo`, `dat_prijeti`, `dat_expedice`, `zam_prijal`, `zam_zpracoval`, `zam_expedoval`, `jmeno`, `prijmeni`, `telefon`, `email`, `ulice`, `psc`, `mesto`, `Popis`, `ID_stav`, `celkovaCena`) VALUES
(1, '2022-05-21 22:17:31', NULL, NULL, NULL, NULL, 'Šárka', 'Kneiflova', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120', 12345, 'Dubí', 'sfsagfsdg', 0, '0.00'),
(2, '2022-05-21 22:21:17', NULL, NULL, NULL, NULL, 'agsdg', 'Kneiflova', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120', 12345, 'Dubí', 'sgags', 0, '0.00'),
(3, '2022-05-21 22:22:03', NULL, NULL, NULL, NULL, 'aa', 'Kneiflova', 666666666, 'Jirka.kneifl@email.cz', 'Švermova 120', 12345, 'Dubí', 'asfs', 0, '0.00'),
(4, '2022-05-21 22:44:06', NULL, NULL, NULL, NULL, 'Šárka', 'Kneiflova', 086565121, 'Jirka.kneifl@email.cz', 'Švermova 120', 12345, 'Dubí', 'asfasf', 1, '0.00'),
(5, '2022-05-21 22:44:53', NULL, NULL, NULL, NULL, 'Šárka', 'Kneiflova', 086565121, 'Jirka.kneifl@email.cz', 'Švermova 120', 12345, 'Dubí', 'asfasf', 1, '0.00'),
(6, '2022-05-21 22:45:29', NULL, NULL, NULL, NULL, 'Šárka', 'Kneiflova', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120', 12345, 'Dubí', 'afdasf', 0, '0.00'),
(7, '2022-05-21 23:34:02', NULL, NULL, NULL, NULL, 'Šárka', 'sdgsdfg', 086565121, 'Jirka.kneifl@email.cz', 'Švermova 120', 12345, 'Dubí', 'sfsaf', 0, '5490.00'),
(8, '2022-05-22 18:40:10', NULL, NULL, NULL, NULL, 'Šárka', 'Kneiflova', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120', 12345, 'Dubí', 'asf', 0, '5490.00'),
(9, '2022-05-22 18:45:03', NULL, NULL, NULL, NULL, 'Šárka', 'sdafds', 666666666, 'michal@doubkovi.cz', 'Švermova 120', 12345, 'Dubí', 'afasf', 0, '5490.00'),
(10, '2022-05-22 22:37:53', NULL, NULL, NULL, NULL, 'Šárka', 'Kneiflova', 086565121, 'Jirka.kneifl@email.cz', 'Švermova 120', 12345, 'Dubí', 'asfasf', 0, '20367.00'),
(11, '2022-05-31 20:51:01', NULL, NULL, NULL, NULL, 'Jirka', 'Kneifl', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120', 12345, 'Dubí', 'neco', 0, '5490.00'),
(12, '2022-05-31 20:53:44', NULL, NULL, NULL, NULL, 'Jirka', 'Knefl', 986565121, 'Jirka.kneifl@email.cz', 'fsafsag /12', 12345, 'Dubí', 'neco', 0, '5490.00'),
(13, '2022-05-31 20:54:35', NULL, NULL, NULL, NULL, 'sfsa', 'Kneiflova', 086565121, 'Jirka.kneifl@email.cz', 'Švermova 120', 12345, 'Dubí', 'adg', 0, '5490.00'),
(14, '2022-05-31 20:55:33', NULL, NULL, NULL, NULL, 'Šárka', 'Kneiflova', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120', 41702, 'Dubí', 'asfasg', 0, '5490.00'),
(15, '2022-05-31 21:02:24', NULL, NULL, NULL, NULL, 'Šárka', 'Kneiflova', 086565121, 'Jirka.kneifl@email.cz', 'Švermova 120', 41702, 'Dubí', 'aSGADG', 0, '1690.00'),
(16, '2022-06-01 21:43:42', NULL, NULL, NULL, NULL, 'tvoje máma', 'bb', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120', 12345, 'Dubí', 'afasf', 0, '1352.00'),
(17, '2022-06-02 15:46:05', NULL, NULL, NULL, NULL, 'tvoje mamam', 'lll', 666666666, 'Jirka.kneifl@email.cz', 'Švermova 120', 12345, 'Dubí', '', 0, '7180.00'),
(18, '2022-06-02 16:07:46', NULL, NULL, NULL, NULL, 'sgdfghsdfh', 'sdhsfhsfjsfj', 666666666, 'Jirka.kneifl@email.cz', 'Švermova 120', 12345, 'Dubí', 'sgasdgsdyhsdh', 0, '5490.00'),
(19, '2022-06-02 16:11:11', NULL, NULL, NULL, NULL, 'sagdsgadsg', 'gdashsdhsdh', 666666666, 'Jirka.kneifl@email.cz', 'Švermova 120', 12345, 'Dubí', 'sdgadgadh', 0, '5490.00'),
(20, '2022-06-02 16:13:21', NULL, NULL, NULL, NULL, 'sssssssssssss', 'ssssssssssssss', 666666666, 'Jirka.kneifl@email.cz', 'Švermova 120', 12345, 'Dubí', 'asfgasgasdg', 0, '5490.00'),
(21, '2022-06-02 16:14:30', NULL, NULL, NULL, NULL, 'assssssssssssss', 'dddddddddddddd', 666666666, 'Jirka.kneifl@email.cz', 'Švermova 120', 12345, 'Dubí', 'asdfsadgsadg', 0, '5490.00'),
(22, '2022-06-02 16:16:52', NULL, NULL, NULL, NULL, 'ssssssssssssss', 'Kneiflova', 666666666, 'Jirka.kneifl@email.cz', 'Švermova 120', 12345, 'Dubí', 'ssssssssssssssss', 0, '1299.00'),
(23, '2022-06-02 16:18:28', NULL, NULL, NULL, NULL, 'neco', 'dalsi neco', 666666666, 'Jirka.kneifl@email.cz', 'Švermova 120', 41860, 'Dubí', 'ssssssssssssssssss', 0, '5490.00'),
(24, '2022-06-02 16:34:50', NULL, NULL, NULL, NULL, '', 'adadff', 086565121, 'Jirka.kneifl@email.cz', 'fsafsag /12', 12345, 'Dubí', 'asfsdg', 0, '5490.00'),
(25, '2022-06-02 17:14:18', NULL, NULL, NULL, NULL, '', 'Kneiflova', 086565121, 'Jirka.kneifl@email.cz', 'fsafsag /12', 12345, 'Dubí', 'asfsfa', 0, '5490.00'),
(26, '2022-06-02 18:04:39', NULL, NULL, NULL, NULL, 'Šárka', 'Kneiflova', 666666666, 'Jirka.kneifl@email.cz', 'fsafsag /12', 12345, 'Dubí', 'afasf', 0, '5490.00'),
(27, '2022-06-03 19:52:35', NULL, NULL, NULL, NULL, 'Pokus', 'Pokus', 666666666, 'Jirka.kneifl@email.cz', 'Švermova 120', 12345, 'Dubí', 'fasasdfsaf', 0, '1299.00'),
(28, '2022-06-03 19:54:02', NULL, NULL, NULL, NULL, 'pokusdalsi', 'Kneiflova', 666666666, 'Jirka.kneifl@email.cz', 'fsafsag /12', 12345, 'Dubí', 'pokus', 0, '5490.00'),
(29, '2022-06-03 19:54:48', NULL, NULL, NULL, NULL, 'pokusdalsidalsi', 'pokusdalsidalsi', 666666666, 'Jirka.kneifl@email.cz', 'fsafsag /12', 12345, 'Dubí', 'asfsdg', 0, '1690.00'),
(30, '2022-06-09 19:19:56', NULL, NULL, NULL, NULL, 'Šárka', 'Kneiflova', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 12345, 'Dubí', 'sfasg', 0, '5490.00'),
(31, '2022-06-09 20:47:45', NULL, NULL, NULL, NULL, 'Šárka', 'Kneiflova', 666666666, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'sdagasg', 0, '5490.00'),
(32, '2022-06-09 21:13:57', NULL, NULL, NULL, NULL, 'Jirka', 'Kneifl', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'kolecka', 0, '1690.00'),
(33, '2022-06-09 21:56:05', NULL, NULL, NULL, NULL, 'safsfsag', 'sadgsdgsadg', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'sdgasdgsad', 0, '5490.00'),
(34, '2022-06-10 19:18:04', NULL, NULL, NULL, NULL, 'Šárka', 'Kneiflova', 666666666, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'safdsag', 1, '5490.00'),
(35, '2022-06-10 19:18:06', NULL, NULL, NULL, NULL, 'Šárka', 'Kneiflova', 666666666, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'safdsag', 1, '5490.00'),
(36, '2022-06-11 20:41:35', NULL, NULL, NULL, NULL, 'Michal', 'Doubek', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'bneco ', 1, '1299.00'),
(37, '2022-06-11 20:45:14', NULL, NULL, NULL, NULL, 'Michal', 'Doubek', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'bneco ', 1, '0.00'),
(38, '2022-06-11 20:45:26', NULL, NULL, NULL, NULL, 'Michal', 'Doubek', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'bneco ', 1, '0.00'),
(39, '2022-06-11 20:46:11', NULL, NULL, NULL, NULL, 'Michal', 'Doubek', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'bneco ', 1, '0.00'),
(40, '2022-06-11 20:46:43', NULL, NULL, NULL, NULL, 'Michal', 'Doubek', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'bneco ', 1, '0.00'),
(41, '2022-06-11 20:46:55', NULL, NULL, NULL, NULL, 'Michal', 'Doubek', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'bneco ', 1, '0.00'),
(42, '2022-06-11 20:48:37', NULL, NULL, NULL, NULL, 'Michal', 'Doubek', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'bneco ', 1, '0.00'),
(43, '2022-06-11 20:50:00', NULL, NULL, NULL, NULL, 'Michal', 'Doubek', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'bneco ', 1, '0.00'),
(44, '2022-06-11 20:50:43', NULL, NULL, NULL, NULL, 'Michal', 'Doubek', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'bneco ', 1, '0.00'),
(45, '2022-06-11 20:51:12', NULL, NULL, NULL, NULL, 'Michal', 'Doubek', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'bneco ', 1, '0.00'),
(46, '2022-06-11 20:51:33', NULL, NULL, NULL, NULL, 'Michal', 'Doubek', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'bneco ', 1, '0.00'),
(47, '2022-06-11 20:51:46', NULL, NULL, NULL, NULL, 'Michal', 'Doubek', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'bneco ', 1, '0.00'),
(48, '2022-06-11 20:51:54', NULL, NULL, NULL, NULL, 'Michal', 'Doubek', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'bneco ', 1, '0.00'),
(49, '2022-06-11 20:52:13', NULL, NULL, NULL, NULL, 'Michal', 'Doubek', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'bneco ', 1, '0.00'),
(50, '2022-06-11 20:52:25', NULL, NULL, NULL, NULL, 'Michal', 'Doubek', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'bneco ', 1, '0.00'),
(51, '2022-06-11 20:52:36', NULL, NULL, NULL, NULL, 'Michal', 'Doubek', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'bneco ', 1, '0.00'),
(52, '2022-06-11 20:53:05', NULL, NULL, NULL, NULL, 'Michal', 'Doubek', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'bneco ', 1, '0.00'),
(53, '2022-06-11 20:53:24', NULL, NULL, NULL, NULL, 'Michal', 'Doubek', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'bneco ', 0, '0.00'),
(54, '2022-06-11 20:53:32', NULL, NULL, NULL, NULL, 'Michal', 'Doubek', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'bneco ', 0, '0.00'),
(55, '2022-06-11 22:20:24', NULL, NULL, NULL, NULL, 'Jirka', 'Kneifl', 666666666, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'dej to sem', 0, '14360.00'),
(56, '2022-06-11 22:45:30', NULL, NULL, NULL, NULL, 'adhsdfhfsdjhsfj', 'fsjfdjdfj', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'fgjdfjgfdjfd', 0, '5490.00'),
(57, '2022-06-12 20:35:42', NULL, NULL, NULL, NULL, 'Šárka', 'Kneiflová', 737571244, 'kneiflovi@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'Kolečka musí být úplně čistá', 0, '5070.00'),
(58, '2022-06-12 20:59:24', NULL, NULL, NULL, NULL, 'ssssssssssssssss', 'ssssssssssssssssss', 666666666, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'ssssssssssssssssssssssssssss', 1, '37590.00'),
(59, '2022-06-12 21:20:58', NULL, NULL, NULL, NULL, 'Šárka', 'bb', 666666666, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'sgdasgdasdg', 1, '5490.00'),
(60, '2022-06-12 21:22:36', NULL, NULL, NULL, NULL, 'Šárka', 'sdgsdfg', 666666666, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'sagasdgasd', 1, '1690.00'),
(61, '2022-06-12 21:23:25', NULL, NULL, NULL, NULL, 'Šárka', 'sdgsdfg', 666666666, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'sagasdgasd', 1, '0.00'),
(62, '2022-06-12 21:29:14', NULL, NULL, NULL, NULL, 'Šárka', 'dddddddddddddd', 666666666, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'sgasdgad', 1, '5490.00'),
(63, '2022-06-12 21:29:42', NULL, NULL, NULL, NULL, 'Šárka', 'dddddddddddddd', 666666666, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'sgasdgad', 1, '0.00'),
(64, '2022-06-12 21:30:05', NULL, NULL, NULL, NULL, 'Jirka', 'sdffffffffffffffffff', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'sfsdgsg', 1, '27450.00'),
(65, '2022-06-12 21:30:31', NULL, NULL, NULL, NULL, 'Jirka', 'sdffffffffffffffffff', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'sfsdgsg', 1, '0.00'),
(66, '2022-06-12 21:30:59', NULL, NULL, NULL, NULL, 'Šárka', 'sdgsdfg', 666666666, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'dfcghdsh', 1, '21960.00'),
(67, '2022-06-12 21:31:26', NULL, NULL, NULL, NULL, 'Šárka', 'sdgsdfg', 666666666, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'dfcghdsh', 1, '0.00'),
(68, '2022-06-12 21:32:19', NULL, NULL, NULL, NULL, 'Šárka', 'Kneiflova', 666666666, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', 'afsgsdgasgas', 0, '27450.00'),
(69, '2022-06-13 18:48:52', NULL, NULL, NULL, NULL, 'agadgh', 'dshdsh', 666666666, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', '', 0, '3897.00'),
(70, '2022-06-13 20:23:57', NULL, NULL, NULL, NULL, 'Jirka', 'Kneifl', 666666666, 'Jirka.kneifl@email.cz', 'Švermova 120/2', 41702, 'Dubí', '', 0, '2500.00');

-- --------------------------------------------------------

--
-- Struktura tabulky `objednavky_produkty`
--

CREATE TABLE `objednavky_produkty` (
  `ID_produktu` int(11) NOT NULL,
  `nazevProduktu` varchar(50) COLLATE utf8mb4_czech_ci NOT NULL,
  `ID_objednavky` int(11) NOT NULL,
  `CenaProduktu` decimal(8,2) UNSIGNED NOT NULL,
  `mnozstviVObjednavce` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Vypisuji data pro tabulku `objednavky_produkty`
--

INSERT INTO `objednavky_produkty` (`ID_produktu`, `nazevProduktu`, `ID_objednavky`, `CenaProduktu`, `mnozstviVObjednavce`) VALUES
(2, 'Skateboard JART Renaissance III 8.25 ', 6, '1299.00', 2),
(1, 'Longboard Deska LUCA Orion 2020 ', 6, '5490.00', 1),
(1, 'Longboard Deska LUCA Orion 2020 ', 7, '5490.00', 1),
(1, 'Longboard Deska LUCA Orion 2020 ', 8, '5490.00', 1),
(1, 'Longboard Deska LUCA Orion 2020 ', 9, '5490.00', 1),
(1, 'Longboard Deska LUCA Orion 2020 ', 10, '5490.00', 3),
(2, 'Skateboard JART Renaissance III 8.25 ', 10, '1299.00', 3),
(1, 'Longboard Deska LUCA Orion 2020 ', 11, '5490.00', 1),
(1, 'Longboard Deska LUCA Orion 2020 ', 12, '5490.00', 1),
(1, 'Longboard Deska LUCA Orion 2020 ', 13, '5490.00', 1),
(1, 'Longboard Deska LUCA Orion 2020 ', 14, '5490.00', 1),
(3, 'Longboard kolečka CULT Emperor ', 15, '1690.00', 1),
(4, 'Skateboard kolečka ORANGATANG Skiff ', 16, '1352.00', 1),
(1, 'Longboard Deska LUCA Orion 2020 ', 17, '5490.00', 1),
(3, 'Longboard kolečka CULT Emperor ', 17, '1690.00', 1),
(1, 'Longboard Deska LUCA Orion 2020 ', 18, '5490.00', 1),
(1, 'Longboard Deska LUCA Orion 2020 ', 19, '5490.00', 1),
(1, 'Longboard Deska LUCA Orion 2020 ', 20, '5490.00', 1),
(1, 'Longboard Deska LUCA Orion 2020 ', 21, '5490.00', 1),
(2, 'Skateboard JART Renaissance III 8.25 ', 22, '1299.00', 1),
(1, 'Longboard Deska LUCA Orion 2020 ', 23, '5490.00', 1),
(1, 'Longboard Deska LUCA Orion 2020 ', 24, '5490.00', 1),
(1, 'Longboard Deska LUCA Orion 2020 ', 25, '5490.00', 1),
(1, 'Longboard Deska LUCA Orion 2020 ', 26, '5490.00', 1),
(2, 'Skateboard JART Renaissance III 8.25 ', 27, '1299.00', 1),
(1, 'Longboard Deska LUCA Orion 2020 ', 28, '5490.00', 1),
(3, 'Longboard kolečka CULT Emperor ', 29, '1690.00', 1),
(1, 'Longboard Deska LUCA Orion 2020 ', 68, '5490.00', 5),
(2, 'Skateboard JART Renaissance III 8.25 ', 69, '1299.00', 3),
(13, 'Trucky PARIS 149 mm street ', 70, '1250.00', 2);

-- --------------------------------------------------------

--
-- Struktura tabulky `pozice`
--

CREATE TABLE `pozice` (
  `ID_pozice` int(11) NOT NULL,
  `nazev` char(15) COLLATE utf8mb4_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Vypisuji data pro tabulku `pozice`
--

INSERT INTO `pozice` (`ID_pozice`, `nazev`) VALUES
(1, 'admin');

-- --------------------------------------------------------

--
-- Struktura tabulky `produkty`
--

CREATE TABLE `produkty` (
  `ID_produktu` int(11) UNSIGNED NOT NULL,
  `nazev` varchar(50) COLLATE utf8mb4_czech_ci NOT NULL,
  `cena` decimal(8,2) UNSIGNED NOT NULL,
  `popis` mediumtext COLLATE utf8mb4_czech_ci DEFAULT NULL,
  `vaha` varchar(10) COLLATE utf8mb4_czech_ci DEFAULT NULL,
  `sirka` varchar(10) COLLATE utf8mb4_czech_ci DEFAULT NULL,
  `delka` varchar(10) COLLATE utf8mb4_czech_ci DEFAULT NULL,
  `ID_kategorie` int(11) NOT NULL,
  `ID_vyrobce` int(11) NOT NULL,
  `cesta_obrazekProduktu` varchar(256) COLLATE utf8mb4_czech_ci DEFAULT NULL,
  `dodatecneInfoProduktu` varchar(10000) COLLATE utf8mb4_czech_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Vypisuji data pro tabulku `produkty`
--

INSERT INTO `produkty` (`ID_produktu`, `nazev`, `cena`, `popis`, `vaha`, `sirka`, `delka`, `ID_kategorie`, `ID_vyrobce`, `cesta_obrazekProduktu`, `dodatecneInfoProduktu`) VALUES
(1, 'Longboard Deska LUCA Orion 2020', '5490.00', 'Špičková deska, volba našich týmových jezdců.\r\n\r\nJestli ve Snowpanicu něčemu opravdu věříme, tak jsou to longboard desky od našeho polského kamaráda - LUCA Longboards.\r\n\r\nOrion je perfektní deska na downhill, freeride a slajdování. Velký rocker spolu s krásně tvarovanou konkávou a mírnými mikro-dropy udrží tvoje nohy na místě v jakékoliv situaci. LUCA Orion má navíc360° urethanové sidewally (urethanové nárazníky po celém obvodu desky) a nové jádro. Deska je proto lehká a navíc odolná proti praskání nebo štípání. \r\n\r\nVyrobeno v Polsku. S maximální péčí a láskou k longboardingu.', '3', '25', NULL, 2, 1, 'static/images/ProductImages/Desky/LongboardDesky/Longboard Deska LUCA Orion 2020', 'lol neco '),
(2, 'Skateboard JART Renaissance III 8.25', '1299.00', 'Jart Skateboards založili v roce 2001 bratři Igor, Iban a Ander Iraola. Značka ze Španělska se rychle stala dobře známou v Evropě a postupně i na globální scéně. Jako jedna z mála značek, Jart vyrábí své desky v Evropě. V továrně v Baskicku zvláštní pozorn', NULL, ' 8.25\"', ' 31.85\"', 3, 2, 'static/images/ProductImages/Desky/SkateboardDesky/Skateboard JART Renaissance III 8.25', 'safsgfsadgsd'),
(3, 'Longboard kolečka CULT Emperor', '1690.00', 'Kolečka Cult Emperor jsou ideální volbou na rychlý freeride, nebo učení downhillu. Díky velkému jádru a urethanu Dopathane jsou kolečka rychlá, při gripování zatáček jim můžete důvěřovat a slajdují přesně tak, jak se nám to do rychlosti zdá ideální. Přecho', NULL, '53mm', NULL, 5, 3, 'static/images/ProductImages/Kolečka/LongboardKolečka/Longboard kolečka CULT Emperor', NULL),
(4, 'Skateboard kolečka ORANGATANG Skiff', '1352.00', 'Orangatang SKIFF jsou malá kola s velkými ambicemi. Jsou vhodná na freestyle, street i hravý freeride.﻿ Růžové trvzené jádro má obrovský vliv na rychlost kol, čistotu slide a rovnoměrné opotřebení kola. Stone-ground kontaktní plocha zajišťuje předvídatelné', NULL, '25mm', NULL, 6, 4, 'static\\images\\ProductImages\\Kolečka\\SkateboardKolečka\\Skateboard kolečka ORANGATANG Skiff', NULL),
(13, 'Trucky PARIS 149 mm street', '1250.00', 'Paris Street 149mm ti umožní triky posunout do dalšího levelu. Jednoduše ogrinduj každý patník, koping, kachli či trubku, která se ti dostane do cesty! \r\n \r\nTrucky mají vyšší profil než standartní konvenční trucky, tzn. že už nebudeš potřebovat žádné podložky. Velká kola? Žádný problém! Díky tomu se skvěle hodí i na LDP desky, hybridní nebo cruiser desky. Od teď můžeš odjíždět triky s lepší manévrovatelností a lepší točivostí. Trucky Paris 149 street si budeš užívat od rána do večera.', '1', '149mm', NULL, 9, 2, 'static\\images\\ProductImages\\Trucky\\SkateboardTrucky\\Trucky PARIS 149 mm street', 'Dobré skate trucky.'),
(15, 'Longboard trucky CALIBER III Raked 154mm 50° Black', '2250.00', 'Po 5 letech vývoje přichází na svět nové trucky od Caliber Truck Co. -> Caliber III vymazlenější než kdy dřív !!!\r\n \r\n\r\nUpraveny tak, aby uspokojily moderní jezdce s volitelným rakem, možností použití libovolné velikosti bushingů, zvýšenou pevností a zároveň přijatelnou cenou. Tým od Caliber Truck Co. vzal tyhle prototypy do pekla a zpět až z toho vzniknul tenhle masterpiece!\r\n\r\nTahle verze Raked Ti dodá lepší zatáčení a užší carve vhodný třeba pro freeride,freestyle, dancing a carving po městě. Otočením hangeru naopak (negative rake) docílíš větší stability, konzistetnějšího zatáčení, nižší výšky trucku a také ti negativní rake ulehčí vykopávání slidu. Ideální pro rychlý freeride nebo downhill.', '1', '1154mm', NULL, 8, 3, 'static\\images\\ProductImages\\Trucky\\LongboardTrucky\\Longboard trucky CALIBER III Raked 154mm 50° Black', 'Jsou to fakt super trucky.');

-- --------------------------------------------------------

--
-- Struktura tabulky `slevy`
--

CREATE TABLE `slevy` (
  `ID_produktu` int(11) NOT NULL,
  `sleva` decimal(5,4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `stavyobjednavek`
--

CREATE TABLE `stavyobjednavek` (
  `ID_stav` int(11) NOT NULL,
  `nazev` char(20) COLLATE utf8mb4_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Vypisuji data pro tabulku `stavyobjednavek`
--

INSERT INTO `stavyobjednavek` (`ID_stav`, `nazev`) VALUES
(0, 'odexpedováno'),
(1, 'přijmuto');

-- --------------------------------------------------------

--
-- Struktura tabulky `vyrobci`
--

CREATE TABLE `vyrobci` (
  `ID_vyrobce` int(11) NOT NULL,
  `nazev` char(20) COLLATE utf8mb4_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Vypisuji data pro tabulku `vyrobci`
--

INSERT INTO `vyrobci` (`ID_vyrobce`, `nazev`) VALUES
(1, 'LUCA'),
(2, 'JART'),
(3, 'CULT'),
(4, 'ORANGATANG');

-- --------------------------------------------------------

--
-- Struktura tabulky `zakaznici`
--

CREATE TABLE `zakaznici` (
  `ID_zakaznika` int(11) NOT NULL,
  `jmeno` char(20) COLLATE utf8mb4_czech_ci NOT NULL,
  `prijmeni` char(20) COLLATE utf8mb4_czech_ci NOT NULL,
  `ulice_cp` varchar(50) COLLATE utf8mb4_czech_ci NOT NULL,
  `psc` int(6) NOT NULL,
  `mesto` char(50) COLLATE utf8mb4_czech_ci NOT NULL,
  `telefon` int(9) UNSIGNED ZEROFILL NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_czech_ci NOT NULL,
  `heslo` varchar(256) COLLATE utf8mb4_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `zamestnanci`
--

CREATE TABLE `zamestnanci` (
  `ID_zamesnance` int(11) NOT NULL,
  `jmeno` char(20) COLLATE utf8mb4_czech_ci NOT NULL,
  `prijmeni` char(20) COLLATE utf8mb4_czech_ci NOT NULL,
  `dat_narozeni` date NOT NULL,
  `adresa_bydliste` varchar(50) COLLATE utf8mb4_czech_ci NOT NULL,
  `mesto` char(50) COLLATE utf8mb4_czech_ci NOT NULL,
  `telefon` int(9) UNSIGNED ZEROFILL NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_czech_ci NOT NULL,
  `dat_nastoupeni` date NOT NULL,
  `ID_pozice` int(11) NOT NULL,
  `heslo` varchar(256) COLLATE utf8mb4_czech_ci NOT NULL,
  `plat` mediumint(7) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Vypisuji data pro tabulku `zamestnanci`
--

INSERT INTO `zamestnanci` (`ID_zamesnance`, `jmeno`, `prijmeni`, `dat_narozeni`, `adresa_bydliste`, `mesto`, `telefon`, `email`, `dat_nastoupeni`, `ID_pozice`, `heslo`, `plat`) VALUES
(1, 'Jiří', 'Kneifl', '2003-08-13', 'Svermova 120/2', 'Dubí', 730183100, 'Jirka.kneifl@email.cz', '2022-05-22', 1, '$2a$10$Sz72cE4E16/jBjaseo9GLuBum3.tX5j2nWY2keUi6r3TCvhZnwUrW', 30000);

--
-- Klíče pro exportované tabulky
--

--
-- Klíče pro tabulku `kategorie`
--
ALTER TABLE `kategorie`
  ADD PRIMARY KEY (`ID_kategorie`),
  ADD KEY `ID_kat_nadrazene` (`ID_kat_nadrazene`);

--
-- Klíče pro tabulku `objednavky`
--
ALTER TABLE `objednavky`
  ADD PRIMARY KEY (`cislo`),
  ADD KEY `zam_prijal` (`zam_prijal`,`zam_zpracoval`,`zam_expedoval`),
  ADD KEY `zam_zpracoval` (`zam_zpracoval`),
  ADD KEY `zam_expedoval` (`zam_expedoval`),
  ADD KEY `ID_stav` (`ID_stav`);

--
-- Klíče pro tabulku `objednavky_produkty`
--
ALTER TABLE `objednavky_produkty`
  ADD KEY `ID_produktu` (`ID_produktu`,`ID_objednavky`),
  ADD KEY `ID_objednavky` (`ID_objednavky`);

--
-- Klíče pro tabulku `pozice`
--
ALTER TABLE `pozice`
  ADD PRIMARY KEY (`ID_pozice`);

--
-- Klíče pro tabulku `produkty`
--
ALTER TABLE `produkty`
  ADD PRIMARY KEY (`ID_produktu`),
  ADD UNIQUE KEY `nazev` (`nazev`),
  ADD KEY `ID_kategorie` (`ID_kategorie`,`ID_vyrobce`),
  ADD KEY `ID_vyrobce` (`ID_vyrobce`);

--
-- Klíče pro tabulku `slevy`
--
ALTER TABLE `slevy`
  ADD PRIMARY KEY (`ID_produktu`);

--
-- Klíče pro tabulku `stavyobjednavek`
--
ALTER TABLE `stavyobjednavek`
  ADD PRIMARY KEY (`ID_stav`);

--
-- Klíče pro tabulku `vyrobci`
--
ALTER TABLE `vyrobci`
  ADD PRIMARY KEY (`ID_vyrobce`);

--
-- Klíče pro tabulku `zakaznici`
--
ALTER TABLE `zakaznici`
  ADD PRIMARY KEY (`ID_zakaznika`);

--
-- Klíče pro tabulku `zamestnanci`
--
ALTER TABLE `zamestnanci`
  ADD PRIMARY KEY (`ID_zamesnance`),
  ADD KEY `ID_pozice` (`ID_pozice`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `kategorie`
--
ALTER TABLE `kategorie`
  MODIFY `ID_kategorie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pro tabulku `objednavky`
--
ALTER TABLE `objednavky`
  MODIFY `cislo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT pro tabulku `pozice`
--
ALTER TABLE `pozice`
  MODIFY `ID_pozice` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pro tabulku `produkty`
--
ALTER TABLE `produkty`
  MODIFY `ID_produktu` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pro tabulku `vyrobci`
--
ALTER TABLE `vyrobci`
  MODIFY `ID_vyrobce` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pro tabulku `zakaznici`
--
ALTER TABLE `zakaznici`
  MODIFY `ID_zakaznika` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pro tabulku `zamestnanci`
--
ALTER TABLE `zamestnanci`
  MODIFY `ID_zamesnance` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `kategorie`
--
ALTER TABLE `kategorie`
  ADD CONSTRAINT `kategorie_ibfk_1` FOREIGN KEY (`ID_kat_nadrazene`) REFERENCES `kategorie` (`ID_kategorie`);

--
-- Omezení pro tabulku `objednavky`
--
ALTER TABLE `objednavky`
  ADD CONSTRAINT `objednavky_ibfk_2` FOREIGN KEY (`zam_prijal`) REFERENCES `zamestnanci` (`ID_zamesnance`),
  ADD CONSTRAINT `objednavky_ibfk_3` FOREIGN KEY (`zam_zpracoval`) REFERENCES `zamestnanci` (`ID_zamesnance`),
  ADD CONSTRAINT `objednavky_ibfk_4` FOREIGN KEY (`zam_expedoval`) REFERENCES `zamestnanci` (`ID_zamesnance`),
  ADD CONSTRAINT `objednavky_ibfk_5` FOREIGN KEY (`ID_stav`) REFERENCES `stavyobjednavek` (`ID_stav`);

--
-- Omezení pro tabulku `objednavky_produkty`
--
ALTER TABLE `objednavky_produkty`
  ADD CONSTRAINT `objednavky_produkty_ibfk_2` FOREIGN KEY (`ID_objednavky`) REFERENCES `objednavky` (`cislo`);

--
-- Omezení pro tabulku `produkty`
--
ALTER TABLE `produkty`
  ADD CONSTRAINT `produkty_ibfk_1` FOREIGN KEY (`ID_vyrobce`) REFERENCES `vyrobci` (`ID_vyrobce`),
  ADD CONSTRAINT `produkty_ibfk_2` FOREIGN KEY (`ID_kategorie`) REFERENCES `kategorie` (`ID_kategorie`);

--
-- Omezení pro tabulku `zamestnanci`
--
ALTER TABLE `zamestnanci`
  ADD CONSTRAINT `zamestnanci_ibfk_1` FOREIGN KEY (`ID_pozice`) REFERENCES `pozice` (`ID_pozice`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Úte 24. kvě 2022, 07:26
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
(2, 'LongboardDesky', 1),
(3, 'SkateboardDesky', 1),
(4, 'Kolečka', NULL),
(5, 'Longboard Kolečka', 4),
(6, 'Skateboard Kolečka', 4),
(7, 'Trucky', NULL);

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
  `ulice_cp` varchar(50) COLLATE utf8mb4_czech_ci NOT NULL,
  `psc` int(6) NOT NULL,
  `mesto` char(50) COLLATE utf8mb4_czech_ci NOT NULL,
  `Popis` varchar(64) COLLATE utf8mb4_czech_ci DEFAULT NULL,
  `ID_stav` int(11) NOT NULL,
  `celkovaCena` decimal(10,2) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Vypisuji data pro tabulku `objednavky`
--

INSERT INTO `objednavky` (`cislo`, `dat_prijeti`, `dat_expedice`, `zam_prijal`, `zam_zpracoval`, `zam_expedoval`, `jmeno`, `prijmeni`, `telefon`, `email`, `ulice_cp`, `psc`, `mesto`, `Popis`, `ID_stav`, `celkovaCena`) VALUES
(1, '2022-05-21 22:17:31', NULL, NULL, NULL, NULL, 'Šárka', 'Kneiflova', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120', 12345, 'Dubí', 'sfsagfsdg', 1, '0.00'),
(2, '2022-05-21 22:21:17', NULL, NULL, NULL, NULL, 'agsdg', 'Kneiflova', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120', 12345, 'Dubí', 'sgags', 1, '0.00'),
(3, '2022-05-21 22:22:03', NULL, NULL, NULL, NULL, 'aa', 'Kneiflova', 666666666, 'Jirka.kneifl@email.cz', 'Švermova 120', 12345, 'Dubí', 'asfs', 1, '0.00'),
(4, '2022-05-21 22:44:06', NULL, NULL, NULL, NULL, 'Šárka', 'Kneiflova', 086565121, 'Jirka.kneifl@email.cz', 'Švermova 120', 12345, 'Dubí', 'asfasf', 1, '0.00'),
(5, '2022-05-21 22:44:53', NULL, NULL, NULL, NULL, 'Šárka', 'Kneiflova', 086565121, 'Jirka.kneifl@email.cz', 'Švermova 120', 12345, 'Dubí', 'asfasf', 1, '0.00'),
(6, '2022-05-21 22:45:29', NULL, NULL, NULL, NULL, 'Šárka', 'Kneiflova', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120', 12345, 'Dubí', 'afdasf', 1, '0.00'),
(7, '2022-05-21 23:34:02', NULL, NULL, NULL, NULL, 'Šárka', 'sdgsdfg', 086565121, 'Jirka.kneifl@email.cz', 'Švermova 120', 12345, 'Dubí', 'sfsaf', 0, '5490.00'),
(8, '2022-05-22 18:40:10', NULL, NULL, NULL, NULL, 'Šárka', 'Kneiflova', 986565121, 'Jirka.kneifl@email.cz', 'Švermova 120', 12345, 'Dubí', 'asf', 0, '5490.00'),
(9, '2022-05-22 18:45:03', NULL, NULL, NULL, NULL, 'Šárka', 'sdafds', 666666666, 'michal@doubkovi.cz', 'Švermova 120', 12345, 'Dubí', 'afasf', 0, '5490.00'),
(10, '2022-05-22 22:37:53', NULL, NULL, NULL, NULL, 'Šárka', 'Kneiflova', 086565121, 'Jirka.kneifl@email.cz', 'Švermova 120', 12345, 'Dubí', 'asfasf', 0, '20367.00');

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
(2, 'Skateboard JART Renaissance III 8.25 ', 10, '1299.00', 3);

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
  `ID_produktu` int(11) NOT NULL,
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
(1, 'Longboard Deska LUCA Orion 2020', '5490.00', 'Špičková deska, volba našich týmových jezdců.\r\n\r\nJestli ve Snowpanicu něčemu opravdu věříme, tak jsou to longboard desky od našeho polského kamaráda - LUCA Longboards.\r\n\r\nOrion je perfektní deska na downhill, freeride a slajdování. Velký rocker spolu s krásně tvarovanou konkávou a mírnými mikro-dropy udrží tvoje nohy na místě v jakékoliv situaci. LUCA Orion má navíc360° urethanové sidewally (urethanové nárazníky po celém obvodu desky) a nové jádro. Deska je proto lehká a navíc odolná proti praskání nebo štípání. \r\n\r\nVyrobeno v Polsku. S maximální péčí a láskou k longboardingu.', '2', '25', '86', 2, 1, 'static/images/ProductImages/Desky/LongboardDesky/Longboard Deska LUCA Orion 2020', 'lol neco '),
(2, 'Skateboard JART Renaissance III 8.25', '1299.00', 'Jart Skateboards založili v roce 2001 bratři Igor, Iban a Ander Iraola. Značka ze Španělska se rychle stala dobře známou v Evropě a postupně i na globální scéně. Jako jedna z mála značek, Jart vyrábí své desky v Evropě. V továrně v Baskicku zvláštní pozorn', NULL, ' 8.25\"', ' 31.85\"', 3, 2, 'static/images/ProductImages/Desky/SkateboardDesky/Skateboard JART Renaissance III 8.25', 'safsgfsadgsd'),
(3, 'Longboard kolečka CULT Emperor', '1690.00', 'Kolečka Cult Emperor jsou ideální volbou na rychlý freeride, nebo učení downhillu. Díky velkému jádru a urethanu Dopathane jsou kolečka rychlá, při gripování zatáček jim můžete důvěřovat a slajdují přesně tak, jak se nám to do rychlosti zdá ideální. Přecho', NULL, '53mm', NULL, 5, 3, 'static/images/ProductImages/Kolečka/LongboardKolečka/Longboard kolečka CULT Emperor', NULL),
(4, 'Skateboard kolečka ORANGATANG Skiff', '1352.00', 'Orangatang SKIFF jsou malá kola s velkými ambicemi. Jsou vhodná na freestyle, street i hravý freeride.﻿ Růžové trvzené jádro má obrovský vliv na rychlost kol, čistotu slide a rovnoměrné opotřebení kola. Stone-ground kontaktní plocha zajišťuje předvídatelné', NULL, '25mm', NULL, 6, 4, 'static\\images\\ProductImages\\Kolečka\\SkateboardKolečka\\Skateboard kolečka ORANGATANG Skiff', NULL);

-- --------------------------------------------------------

--
-- Struktura tabulky `produkty_velikosti`
--

CREATE TABLE `produkty_velikosti` (
  `ID_produktu` int(11) NOT NULL,
  `ID_velikosti` int(11) NOT NULL,
  `kusy` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

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
-- Struktura tabulky `velikosti`
--

CREATE TABLE `velikosti` (
  `ID_velikost` int(11) NOT NULL,
  `oznaceni` varchar(10) COLLATE utf8mb4_czech_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `vyrobci`
--

CREATE TABLE `vyrobci` (
  `ID_vyrobkce` int(11) NOT NULL,
  `nazev` char(20) COLLATE utf8mb4_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Vypisuji data pro tabulku `vyrobci`
--

INSERT INTO `vyrobci` (`ID_vyrobkce`, `nazev`) VALUES
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
-- Klíče pro tabulku `produkty_velikosti`
--
ALTER TABLE `produkty_velikosti`
  ADD KEY `ID_produktu` (`ID_produktu`,`ID_velikosti`),
  ADD KEY `ID_velikosti` (`ID_velikosti`);

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
-- Klíče pro tabulku `velikosti`
--
ALTER TABLE `velikosti`
  ADD PRIMARY KEY (`ID_velikost`);

--
-- Klíče pro tabulku `vyrobci`
--
ALTER TABLE `vyrobci`
  ADD PRIMARY KEY (`ID_vyrobkce`);

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
  MODIFY `ID_kategorie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pro tabulku `objednavky`
--
ALTER TABLE `objednavky`
  MODIFY `cislo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pro tabulku `pozice`
--
ALTER TABLE `pozice`
  MODIFY `ID_pozice` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pro tabulku `velikosti`
--
ALTER TABLE `velikosti`
  MODIFY `ID_velikost` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `vyrobci`
--
ALTER TABLE `vyrobci`
  MODIFY `ID_vyrobkce` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  ADD CONSTRAINT `produkty_ibfk_1` FOREIGN KEY (`ID_vyrobce`) REFERENCES `vyrobci` (`ID_vyrobkce`),
  ADD CONSTRAINT `produkty_ibfk_2` FOREIGN KEY (`ID_kategorie`) REFERENCES `kategorie` (`ID_kategorie`);

--
-- Omezení pro tabulku `produkty_velikosti`
--
ALTER TABLE `produkty_velikosti`
  ADD CONSTRAINT `produkty_velikosti_ibfk_1` FOREIGN KEY (`ID_produktu`) REFERENCES `produkty` (`ID_produktu`),
  ADD CONSTRAINT `produkty_velikosti_ibfk_2` FOREIGN KEY (`ID_velikosti`) REFERENCES `velikosti` (`ID_velikost`);

--
-- Omezení pro tabulku `zamestnanci`
--
ALTER TABLE `zamestnanci`
  ADD CONSTRAINT `zamestnanci_ibfk_1` FOREIGN KEY (`ID_pozice`) REFERENCES `pozice` (`ID_pozice`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

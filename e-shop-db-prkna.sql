-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Úte 30. lis 2021, 10:37
-- Verze serveru: 10.4.6-MariaDB
-- Verze PHP: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
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
  `ID_kat_nadrazene` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `objednavky`
--

CREATE TABLE `objednavky` (
  `cislo` int(11) NOT NULL,
  `dat_prijeti` datetime NOT NULL,
  `dat_expedice` datetime DEFAULT NULL,
  `zam_prijal` int(11) NOT NULL,
  `zam_zpracoval` int(11) NOT NULL,
  `zam_expedoval` int(11) NOT NULL,
  `ID_zakaznika` int(11) NOT NULL,
  `Popis` varchar(64) COLLATE utf8mb4_czech_ci NOT NULL,
  `stav` int(1) DEFAULT NULL,
  `celkovaCena` decimal(10,2) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `objednavky_produkty`
--

CREATE TABLE `objednavky_produkty` (
  `ID_produktu` int(11) NOT NULL,
  `ID_objednavky` int(11) NOT NULL,
  `aktualniCenaProduktu` decimal(8,2) UNSIGNED NOT NULL,
  `mnoztviVObjednavce` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `pozice`
--

CREATE TABLE `pozice` (
  `ID_pozice` int(11) NOT NULL,
  `nazev` char(15) COLLATE utf8mb4_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `produkty`
--

CREATE TABLE `produkty` (
  `ID_produktu` int(11) NOT NULL,
  `nazev` varchar(50) COLLATE utf8mb4_czech_ci NOT NULL,
  `cena` decimal(8,2) UNSIGNED NOT NULL,
  `popis` varchar(256) COLLATE utf8mb4_czech_ci DEFAULT NULL,
  `vaha` varchar(10) COLLATE utf8mb4_czech_ci DEFAULT NULL,
  `sirka` varchar(10) COLLATE utf8mb4_czech_ci DEFAULT NULL,
  `delka` varchar(10) COLLATE utf8mb4_czech_ci DEFAULT NULL,
  `ID_kategorie` int(11) NOT NULL,
  `ID_vyrobce` int(11) NOT NULL,
  `cesta_obrazekProduktu` varchar(256) COLLATE utf8mb4_czech_ci DEFAULT NULL,
  `dodatecneInfoProduktu` varchar(10000) COLLATE utf8mb4_czech_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

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

-- --------------------------------------------------------

--
-- Struktura tabulky `zakaznici`
--

CREATE TABLE `zakaznici` (
  `ID_zakaznika` int(11) NOT NULL,
  `jemno` char(15) COLLATE utf8mb4_czech_ci NOT NULL,
  `prijmeni` char(20) COLLATE utf8mb4_czech_ci NOT NULL,
  `adresa` varchar(50) COLLATE utf8mb4_czech_ci NOT NULL,
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
  `jemno` char(15) COLLATE utf8mb4_czech_ci NOT NULL,
  `prijmeni` char(20) COLLATE utf8mb4_czech_ci NOT NULL,
  `dat_narozeni` date NOT NULL,
  `adresa_bydliste` varchar(50) COLLATE utf8mb4_czech_ci NOT NULL,
  `mesto` char(50) COLLATE utf8mb4_czech_ci NOT NULL,
  `telefon` int(9) UNSIGNED ZEROFILL NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_czech_ci NOT NULL,
  `dat_nastoupeni` date NOT NULL,
  `odmena` mediumint(7) UNSIGNED NOT NULL,
  `ID_pozice` int(11) NOT NULL,
  `heslo` varchar(256) COLLATE utf8mb4_czech_ci NOT NULL,
  `plat` mediumint(7) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

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
  ADD KEY `ID_zakaznika` (`ID_zakaznika`),
  ADD KEY `zam_zpracoval` (`zam_zpracoval`),
  ADD KEY `zam_expedoval` (`zam_expedoval`);

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
  MODIFY `ID_kategorie` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `objednavky`
--
ALTER TABLE `objednavky`
  MODIFY `cislo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `pozice`
--
ALTER TABLE `pozice`
  MODIFY `ID_pozice` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `velikosti`
--
ALTER TABLE `velikosti`
  MODIFY `ID_velikost` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `vyrobci`
--
ALTER TABLE `vyrobci`
  MODIFY `ID_vyrobkce` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `zakaznici`
--
ALTER TABLE `zakaznici`
  MODIFY `ID_zakaznika` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `zamestnanci`
--
ALTER TABLE `zamestnanci`
  MODIFY `ID_zamesnance` int(11) NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `objednavky_ibfk_1` FOREIGN KEY (`ID_zakaznika`) REFERENCES `zakaznici` (`ID_zakaznika`),
  ADD CONSTRAINT `objednavky_ibfk_2` FOREIGN KEY (`zam_prijal`) REFERENCES `zamestnanci` (`ID_zamesnance`),
  ADD CONSTRAINT `objednavky_ibfk_3` FOREIGN KEY (`zam_zpracoval`) REFERENCES `zamestnanci` (`ID_zamesnance`),
  ADD CONSTRAINT `objednavky_ibfk_4` FOREIGN KEY (`zam_expedoval`) REFERENCES `zamestnanci` (`ID_zamesnance`);

--
-- Omezení pro tabulku `objednavky_produkty`
--
ALTER TABLE `objednavky_produkty`
  ADD CONSTRAINT `objednavky_produkty_ibfk_1` FOREIGN KEY (`ID_produktu`) REFERENCES `produkty` (`ID_produktu`),
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

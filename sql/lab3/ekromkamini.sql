-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema E_kromka
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema E_kromka
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `E_kromka` ;
USE `E_kromka` ;

-- -----------------------------------------------------
-- Table `E_kromka`.`Konta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E_kromka`.`Konta` (
  `id` INT NOT NULL,
  `login` VARCHAR(45) NOT NULL,
  `haslo` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `login_UNIQUE` (`login` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `E_kromka`.`Uzytkownicy`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E_kromka`.`Uzytkownicy` (
  `id` INT NULL DEFAULT NULL AUTO_INCREMENT,
  `imie` VARCHAR(40) NULL DEFAULT NULL,
  `nazwisko` VARCHAR(40) NULL DEFAULT NULL,
  `email` VARCHAR(40) NULL DEFAULT NULL,
  `telefon` VARCHAR(40) NULL DEFAULT NULL,
  `Konta_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX (`email` ASC),
  INDEX `fk_Uzytkownicy_Konta_idx` (`Konta_id` ASC),
  CONSTRAINT `fk_Uzytkownicy_Konta`
    FOREIGN KEY (`Konta_id`)
    REFERENCES `E_kromka`.`Konta` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `E_kromka`.`Adresy`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E_kromka`.`Adresy` (
  `id` INT NULL DEFAULT NULL AUTO_INCREMENT,
  `uzytkownik_id` INT NULL DEFAULT NULL,
  `adres` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX (`uzytkownik_id` ASC),
  CONSTRAINT `fk_Adresy_Uzytkownicy`
    FOREIGN KEY (`uzytkownik_id`)
    REFERENCES `E_kromka`.`Uzytkownicy` (`id`));


-- -----------------------------------------------------
-- Table `E_kromka`.`Kategorie`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E_kromka`.`Kategorie` (
  `id` INT NULL DEFAULT NULL AUTO_INCREMENT,
  `nazwa` VARCHAR(40) NULL DEFAULT NULL,
  `data_poczatku_wyswietlania` DATE NULL DEFAULT NULL,
  `data_konca_wyswietlania` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `E_kromka`.`Przepisy`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E_kromka`.`Przepisy` (
  `id` INT NULL DEFAULT NULL AUTO_INCREMENT,
  `nazwa` VARCHAR(40) NULL DEFAULT NULL,
  `opis` TEXT NULL DEFAULT NULL,
  `instrukcje` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `E_kromka`.`Produkty`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E_kromka`.`Produkty` (
  `id` INT NULL DEFAULT NULL AUTO_INCREMENT,
  `nazwa` VARCHAR(40) NULL DEFAULT NULL,
  `opis` TEXT NULL DEFAULT NULL,
  `cena` DECIMAL(10,2) NULL DEFAULT NULL,
  `ilosc_na_stanie` INT NULL DEFAULT NULL,
  `kategoria_id` INT NULL DEFAULT NULL,
  `Przepisy_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX (`kategoria_id` ASC),
  INDEX `fk_Produkty_Przepisy_idx` (`Przepisy_id` ASC),
  CONSTRAINT ``
    FOREIGN KEY (`kategoria_id`)
    REFERENCES `E_kromka`.`Kategorie` (`id`),
  CONSTRAINT `fk_Produkty_Przepisy`
    FOREIGN KEY (`Przepisy_id`)
    REFERENCES `E_kromka`.`Przepisy` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `E_kromka`.`Koszyki`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E_kromka`.`Koszyki` (
  `id` INT NULL DEFAULT NULL AUTO_INCREMENT,
  `uzytkownik_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX (`uzytkownik_id` ASC),
  CONSTRAINT `fk_Koszyki_Uzytkownicy`
    FOREIGN KEY (`uzytkownik_id`)
    REFERENCES `E_kromka`.`Uzytkownicy` (`id`));


-- -----------------------------------------------------
-- Table `E_kromka`.`PozycjeKoszyka`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E_kromka`.`PozycjeKoszyka` (
  `id` INT NULL DEFAULT NULL AUTO_INCREMENT,
  `koszyk_id` INT NULL DEFAULT NULL,
  `produkt_id` INT NULL DEFAULT NULL,
  `ilosc` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX (`koszyk_id` ASC),
  INDEX (`produkt_id` ASC),
  CONSTRAINT `fk_PozycjeKoszyka_Koszyki`
    FOREIGN KEY (`koszyk_id`)
    REFERENCES `E_kromka`.`Koszyki` (`id`),
  CONSTRAINT `fk_PozycjeKoszyka_Produkty`
    FOREIGN KEY (`produkt_id`)
    REFERENCES `E_kromka`.`Produkty` (`id`));


-- -----------------------------------------------------
-- Table `E_kromka`.`Zamowienia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E_kromka`.`Zamowienia` (
  `id` INT NULL DEFAULT NULL AUTO_INCREMENT,
  `uzytkownik_id` INT NULL DEFAULT NULL,
  `data_zamowienia` DATETIME NULL DEFAULT NULL,
  `suma` DECIMAL(10,2) NULL DEFAULT NULL,
  `kod_rabatowy` VARCHAR(40) NULL DEFAULT NULL,
  `adres_dostawy` VARCHAR(255) NULL DEFAULT NULL,
  `metoda_dostawy` VARCHAR(40) NULL DEFAULT NULL,
  `metoda_platnosci` VARCHAR(40) NULL DEFAULT NULL,
  `status` VARCHAR(40) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX (`uzytkownik_id` ASC),
  CONSTRAINT `fk_Zamowienia_Uzytkownicy`
    FOREIGN KEY (`uzytkownik_id`)
    REFERENCES `E_kromka`.`Uzytkownicy` (`id`));


-- -----------------------------------------------------
-- Table `E_kromka`.`PozycjeZamowienia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E_kromka`.`PozycjeZamowienia` (
  `id` INT NULL DEFAULT NULL AUTO_INCREMENT,
  `zamowienie_id` INT NULL DEFAULT NULL,
  `produkt_id` INT NULL DEFAULT NULL,
  `ilosc` INT NULL DEFAULT NULL,
  `cena` DECIMAL(10,2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX (`zamowienie_id` ASC),
  INDEX (`produkt_id` ASC),
  CONSTRAINT `fk_PozycjeZamowienia_Zamowienia`
    FOREIGN KEY (`zamowienie_id`)
    REFERENCES `E_kromka`.`Zamowienia` (`id`),
  CONSTRAINT `fk_PozycjeZamowienia_Produkty`
    FOREIGN KEY (`produkt_id`)
    REFERENCES `E_kromka`.`Produkty` (`id`));


-- -----------------------------------------------------
-- Table `E_kromka`.`Faktury`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E_kromka`.`Faktury` (
  `id` INT NULL DEFAULT NULL AUTO_INCREMENT,
  `zamowienie_id` INT NULL DEFAULT NULL,
  `data_faktury` DATETIME NULL DEFAULT NULL,
  `suma` DECIMAL(10,2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX (`zamowienie_id` ASC),
  CONSTRAINT `fk_Faktury_Zamowienia`
    FOREIGN KEY (`zamowienie_id`)
    REFERENCES `E_kromka`.`Zamowienia` (`id`));


-- -----------------------------------------------------
-- Table `E_kromka`.`Pracownicy`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E_kromka`.`Pracownicy` (
  `id` INT NULL DEFAULT NULL AUTO_INCREMENT,
  `imie` VARCHAR(40) NULL DEFAULT NULL,
  `nazwisko` VARCHAR(40) NULL DEFAULT NULL,
  `email` VARCHAR(40) NULL DEFAULT NULL,
  `telefon` VARCHAR(40) NULL DEFAULT NULL,
  `stanowisko` VARCHAR(40) NULL DEFAULT NULL,
  `Konta_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX (`email` ASC),
  INDEX `fk_Pracownicy_Konta_idx` (`Konta_id` ASC),
  CONSTRAINT `fk_Pracownicy_Konta`
    FOREIGN KEY (`Konta_id`)
    REFERENCES `E_kromka`.`Konta` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `E_kromka`.`StanyMagazynowe`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E_kromka`.`StanyMagazynowe` (
  `id` INT NULL DEFAULT NULL AUTO_INCREMENT,
  `produkt_id` INT NULL DEFAULT NULL,
  `ilosc` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX (`produkt_id` ASC),
  CONSTRAINT `fk_StanyMagazynowe_Produkty`
    FOREIGN KEY (`produkt_id`)
    REFERENCES `E_kromka`.`Produkty` (`id`));


-- -----------------------------------------------------
-- Table `E_kromka`.`ZamowieniaDoRealizacji`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E_kromka`.`ZamowieniaDoRealizacji` (
  `id` INT NULL DEFAULT NULL AUTO_INCREMENT,
  `zamowienie_id` INT NULL DEFAULT NULL,
  `pracownik_id` INT NULL DEFAULT NULL,
  `status` VARCHAR(40) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX (`zamowienie_id` ASC),
  INDEX (`pracownik_id` ASC),
  CONSTRAINT `fk_ZamowieniaDoRealizacji_Zamowienia`
    FOREIGN KEY (`zamowienie_id`)
    REFERENCES `E_kromka`.`Zamowienia` (`id`),
  CONSTRAINT `fk_ZamowieniaDoRealizacji_Pracownicy`
    FOREIGN KEY (`pracownik_id`)
    REFERENCES `E_kromka`.`Pracownicy` (`id`));


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

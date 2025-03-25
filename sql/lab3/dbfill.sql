-- Wypełnianie tabeli Konta
INSERT INTO `E_kromka`.`Konta` (`id`, `login`, `haslo`) VALUES
(1, 'user1', 'haslo1'),
(2, 'user2', 'haslo2'),
(3, 'admin1', 'admin1'),
(4, 'pracownik1', 'haslopracownika1');

-- Wypełnianie tabeli Uzytkownicy
INSERT INTO `E_kromka`.`Uzytkownicy` (`id`, `imie`, `nazwisko`, `email`, `telefon`, `Konta_id`) VALUES
(1, 'Jan', 'Kowalski', 'jan.kowalski@example.com', '123456789', 1),
(2, 'Anna', 'Nowak', 'anna.nowak@example.com', '987654321', 2);

-- Wypełnianie tabeli Adresy
INSERT INTO `E_kromka`.`Adresy` (`id`, `uzytkownik_id`, `adres`) VALUES
(1, 1, 'ul. Kwiatowa 1, 00-001 Warszawa'),
(2, 2, 'ul. Lipowa 2, 00-002 Kraków');

-- Wypełnianie tabeli Kategorie
INSERT INTO `E_kromka`.`Kategorie` (`id`, `nazwa`, `data_poczatku_wyswietlania`, `data_konca_wyswietlania`) VALUES
(1, 'Chleby regionalne', '2023-01-01', '2023-12-31'),
(2, 'Bułki', '2023-01-01', '2023-12-31');

-- Wypełnianie tabeli Przepisy
INSERT INTO `E_kromka`.`Przepisy` (`id`, `nazwa`, `opis`, `instrukcje`) VALUES
(1, 'Chleb pszenny', 'Tradycyjny chleb pszenny', 'Wymieszaj składniki, wyrabiaj ciasto, piecz przez 30 minut.'),
(2, 'Bułka kajzerka', 'Basic bułka', 'Wyrabiaj ciasto, formuj bułki, piecz przez 15 minut.');

-- Wypełnianie tabeli Produkty
INSERT INTO `E_kromka`.`Produkty` (`id`, `nazwa`, `opis`, `cena`, `ilosc_na_stanie`, `kategoria_id`, `Przepisy_id`) VALUES
(1, 'Chleb pszenny', 'Świeży chleb pszenny', 5.99, 50, 1, 1),
(2, 'Bułka kajzerka', 'Basic bułka', 2.50, 300, 2, 2);

-- Wypełnianie tabeli Koszyki
INSERT INTO `E_kromka`.`Koszyki` (`id`, `uzytkownik_id`) VALUES
(1, 1),
(2, 2);

-- Wypełnianie tabeli PozycjeKoszyka
INSERT INTO `E_kromka`.`PozycjeKoszyka` (`id`, `koszyk_id`, `produkt_id`, `ilosc`) VALUES
(1, 1, 1, 2),  -- Koszyk 1, Chleb pszenny, ilość 2
(2, 2, 2, 5);  -- Koszyk 2, Bułka kajzerka, ilość 5

-- Wypełnianie tabeli Zamowienia
INSERT INTO `E_kromka`.`Zamowienia` (`id`, `uzytkownik_id`, `data_zamowienia`, `suma`, `kod_rabatowy`, `adres_dostawy`, `metoda_dostawy`, `metoda_platnosci`, `status`) VALUES
(1, 1, '2023-10-01 12:00:00', 11.98, NULL, 'ul. Kwiatowa 1, 00-001 Warszawa', 'Kurier', 'Karta', 'Nowe'),  -- Zamówienie 1, Jan Kowalski
(2, 2, '2023-10-02 14:00:00', 12.50, 'RABAT10', 'ul. Lipowa 2, 00-002 Kraków', 'Poczta', 'Przelew', 'W trakcie');  -- Zamówienie 2, Anna Nowak

-- Wypełnianie tabeli PozycjeZamowienia 
INSERT INTO `E_kromka`.`PozycjeZamowienia` (`id`, `zamowienie_id`, `produkt_id`, `ilosc`, `cena`) VALUES
(1, 1, 1, 2, 5.99),  -- Zamówienie 1, Chleb pszenny, ilość 2, cena 5.99
(2, 2, 2, 5, 2.50);  -- Zamówienie 2, Bułka kajzerka, ilość 5, cena 2.50

-- Wypełnianie tabeli Faktury
INSERT INTO `E_kromka`.`Faktury` (`id`, `zamowienie_id`, `data_faktury`, `suma`) VALUES
(1, 1, '2023-10-01 12:30:00', 11.98),  -- Faktura dla zamówienia 1
(2, 2, '2023-10-02 14:30:00', 12.50);  -- Faktura dla zamówienia 2

-- Wypełnianie tabeli Pracownicy
INSERT INTO `E_kromka`.`Pracownicy` (`id`, `imie`, `nazwisko`, `email`, `telefon`, `stanowisko`, `Konta_id`) VALUES
(1, 'Piotr', 'Wiśniewski', 'piotr.wisniewski@example.com', '111222333', 'Kierownik', 3),  -- Pracownik 1, konto admin1
(2, 'Maria', 'Wójcik', 'maria.wojcik@example.com', '444555666', 'Magazynier', 4);  -- Pracownik 2, konto pracownik1

-- Wypełnianie tabeli StanyMagazynowe
INSERT INTO `E_kromka`.`StanyMagazynowe` (`id`, `produkt_id`, `ilosc`) VALUES
(1, 1, 50),  -- Stan magazynowy dla Chleba pszennego
(2, 2, 300);  -- Stan magazynowy dla Bułki kajzerki

-- Wypełnianie tabeli ZamowieniaDoRealizacji
INSERT INTO `E_kromka`.`ZamowieniaDoRealizacji` (`id`, `zamowienie_id`, `pracownik_id`, `status`) VALUES
(1, 1, 1, 'W trakcie'),  -- Zamówienie 1 przypisane do Piotra Wiśniewskiego
(2, 2, 2, 'Nowe');  -- Zamówienie 2 przypisane do Marii Wójcik
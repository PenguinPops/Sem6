// LABORATORIUM 2. PRZEGLĄD WYBRANYCH ROZWIĄZAŃ JĘZYKÓW
// PROGRAMOWANIA DO BUDOWY APLIKACJI
// INTERNETOWYCH

function zadanie2_1() {

    function sumator(...argumenty) {
        console.log("Suma liczb: " + argumenty.join(", ") + " wynosi " + argumenty.reduce((a, b) => a + b, 0));
    }

    sumator(1, 2, 3, 4, 5, 6);
}

function zadanie2_2() {

    const listaZadan = [
        {
            id: 1,
            tekst: "Zrobienie zakupów",
            zrealizowano: true
        },
        {
            id: 2,
            tekst: "Przegląd techniczny samochodu",
            zrealizowano: false
        },
        {
            id: 3,
            tekst: "Wizyta u dentysty",
            zrealizowano: false
        },
    ];

    // a)

    var str = "Lista zadań: ";
    listaZadan.forEach((zadanie) => {
        str += zadanie.tekst + ", ";
    });
    console.log(str.slice(0, -2));

    // b)

    const listaZadanTeksty = listaZadan.map((zadanie) => zadanie.tekst);
    console.log(listaZadanTeksty);

    // c)

    const listaZadanZrealizowane = listaZadan.filter((zadanie) => zadanie.zrealizowano).map((zadanie) => zadanie.tekst);
    console.log(listaZadanZrealizowane);

}

function zadanie2_3() {
    const poniedzialek = [
        {
            'nazwa': 'Przygotowania do zajęć z AI',
            'czas': 180
        },
        {
            'nazwa': 'Realizacja projektu z AI',
            'czas': 120
        }
    ];
    const wtorek = [
        {
            'nazwa': 'Rozbudowa swojego bloga',
            'czas': 240
        },
        {
            'nazwa': 'Administrowanie serwisem szkoly',
            'czas': 180
        },
        {
            'nazwa': 'Sluchanie koncertu online',
            'czas': 240
        }
    ];

    var wynik = "";
    // używając właściwości łączenia metod w łańcuch należy wykonać kolejno następujące
    // czynności:
    // 1. umieścić zadania z dwóch dni w jednej tablicy (reduce),
    // 2. pobrać czasy trwania zadania i przekonwertować je z minut na godziny (map),
    // 3. odfiltrować czasy, które są większe niż 2 godziny (filter),
    // 4. pomnożyć czasy przez stawkę godzinową wynoszącą 35 zł (map),
    // 5. zsumować wszystkie kwoty (reduce),
    // 6. sformatować kwotę poprzez dodanie 2 miejsc dziesiętnych oraz symbolu waluty PLN
    // (map),
    // 7. wyjąć wartość z tablicy (reduce).

    console.log([poniedzialek, wtorek].reduce((a, b) => a.concat(b)).map((zadanie) => (zadanie.czas) / 60).filter((czas) => czas > 2).map((czas) => czas * 35).reduce((a, b) => a + b, 0).toFixed(2) + " PLN");
}

function zadanie2_4() {
    const firmy = [
        { nazwa: "Abasco", kategoria: "IT", poczatek: 1999, koniec: 2010 },
        { nazwa: "Redis", kategoria: "IT", poczatek: 1993, koniec: 1998 },
        { nazwa: "Komp", kategoria: "IT", poczatek: 2003, koniec: 2018 },
        { nazwa: "Bosco", kategoria: "Technologie", poczatek: 2011, koniec: 2014 },
        { nazwa: "CCA", kategoria: "IT", poczatek: 1991, koniec: 1995 },
        { nazwa: "Autosan", kategoria: "Auto", poczatek: 2009, koniec: 2018 },
        { nazwa: "Broke", kategoria: "Finanse", poczatek: 1990, koniec: 1992 },
        { nazwa: "Funds", kategoria: "Finanse", poczatek: 2000, koniec: 2021 }
    ];

    // a)
    function firmaIT() {
        console.log(firmy.filter((firma) => firma.kategoria === "IT"));
    }

    // b)
    function dzialalnosc() {
        console.log(firmy.filter((firma) => firma.poczatek >= 1990 && firma.koniec < 2000));
    }

    // c)
    function dzialalnosc2() {
        console.log(firmy.filter((firma) => firma.koniec - firma.poczatek > 10));
    }

}


// Zadanie 2.5

const calc = (a, b, p) => {
    if (!(a || b || p)) {
        return "Podaj wszystkie argumenty!"
    }
    switch (p) {
        case '+': {
            return a + b
        }
        case '-': {
            return a - b
        }
        case '*': {
            return a * b
        }
        case '/': {
            return a / b
        }
        default: { return }
    }
}
// a)
// exports.calc = calc

// b)
// export { calc }

// c)
// export default calc;


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

app.get('/', (req, res) => {
    res.send('Prosty serwer oparty na szkielecie programistycznym Express!');
});

app.get('/about', (req, res) => {
    res.send('Autor strony: Jan Kowalski');
});

app.get('/name/:imie', (req, res) => {
    const { imie } = req.params;
    res.status(200).type('text/html').send(`<h1>Cześć ${imie}</h1>`);
});

app.get('/name/:imie/:imie2', (req, res) => {
    const { imie, imie2 } = req.params;
    res.status(200).type('text/html').send(`<h1>Cześć ${imie} i ${imie2}</h1>`);
});

app.get("/form", (req, res) => {
    res.sendFile(__dirname + '/public/form.html');
});

app.post("/result", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (!username || !password) {
        res.send("Uzupełnij dane!");
    } else {
        res.send("Użytkownik: " + username + "<br>Hasło: " + password);
    }
});

app.get("/form2", (req, res) => {
    res.sendFile(__dirname + '/public/form2.html');
});

app.post("/result2", (req, res) => {
    let fullname = req.body.fullname;
    let languages = req.body.languages;

    if (!fullname) {
        res.send("Uzupełnij wszystkie dane!");
    } else {
        let languageList = "";

        if (languages) {
            if (!Array.isArray(languages)) {
                languages = [languages]; // Konwertujemy pojedynczą wartość na tablicę
            }
            languageList = "<ul>" + languages.map(lang => `<li>${lang}</li>`).join("") + "</ul>";
        } else {
            languageList = "Brak";
        }

        let response = `
            <p>Imię i nazwisko: ${fullname}</p>
            <p>Znajomość języków:</p>
            ${languageList}
        `;
        res.send(response);
    }
});

const { check, validationResult } = require('express-validator')

app.get("/form3", (req, res) => {
    res.sendFile(__dirname + '/public/form3.html');
});


app.post("/form3", [
    check('nazwisko')
        .trim()
        .stripLow()
        .bail()
        .matches(/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ ]+$/).withMessage('Nazwisko może zawierać tylko litery i jedną spację')
        .isLength({ min: 3, max: 25 }).withMessage('Nazwisko musi mieć od 3 do 25 znaków')
        .customSanitizer(value => {
            let words = value.split(' ').filter(word => word.length > 0); // Usuwa nadmiarowe spacje
            return words.map(word => word.charAt(0).toUpperCase() + '.').join(' ');
        }),

    check('email')
        .trim()
        .normalizeEmail()
        .bail()
        .isEmail().withMessage('Podaj poprawny adres e-mail'),

    check('wiek')
        .trim()
        .stripLow()
        .bail()
        .isNumeric().withMessage('Wiek musi być liczbą')
        .isInt({ min: 0, max: 110 }).withMessage('Wiek musi być w przedziale 0-110 lat')

], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let errorMessages = errors.array().map(err => `<p style="color:red;">${err.msg}</p>`).join("");
        return res.status(422).send(`
            <h2>Wystąpiły błędy:</h2>
            ${errorMessages}
            <a href="/form3">Powrót do formularza</a>
        `);
    }

    const nazwisko = req.body.nazwisko; // Już przekształcone na inicjały
    const email = req.body.email;
    const wiek = req.body.wiek;

    res.send(`
        <h2>Dane użytkownika:</h2>
        <p><b>Nazwisko (inicjały):</b> ${nazwisko}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Wiek:</b> ${wiek}</p>
    `);
});

// import users from ES export from users.js

const users = require('./users.js');

app.get('/api/users', (req, res) => {
    res.json(users)
})

app.get('/api/users/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))
    if (found) {
        res.json(users.filter(user => user.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({ msg: `Użytkownik o id ${req.params.id} nie został odnaleziony` })
    }
})

app.use(express.json());

app.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        status: "aktywny"
    }
    if (!newUser.name || !newUser.email) {
        return res.status(400).json({ msg: 'Wprowadź poprawne imię i nazwisko oraz email!' })
    }
    users.push(newUser)
    res.json(users)
})

app.patch('/api/users/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))
    if (found) {
        const updUser = req.body
        users.forEach(user => {
            if (user.id === parseInt(req.params.id)) {
                user.name = updUser.name ? updUser.name : user.name
                user.email = updUser.email ? updUser.email : user.email
                res.json({ msg: 'Dane użytkownika zaktualizowane', user })
            }
        })
    } else {
        res.status(400).json({ msg: `Użytkownik o id ${req.params.id} nie istnieje!` })
    }
})

app.delete('/api/users/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))
    if (found) {
        res.json({
            msg: 'Użytkownik usunięty',
            users: users.filter(user => user.id !== parseInt(req.params.id))
        })
    } else {
        res.status(400).json({ msg: `Użytkownik o id ${req.params.id} nie istnieje!` })
    }
})

app.use(express.json());

// Middleware - obsługa metod HTTP i wyświetlanie ścieżki
const metoda = (req, res, next) => {
    let info = `
        <h2>Metoda HTTP: ${req.method}</h2>
        <h3>Ścieżka: ${req.protocol}://${req.get('host')}${req.originalUrl}</h3>
    `;

    // Wysyłamy odpowiedź tylko dla POST, PUT, DELETE
    if (["POST", "PUT", "DELETE"].includes(req.method)) {
        return res.send(info);
    }

    // Jeśli GET – przechodzimy dalej
    next();
};

app.use(metoda);

// Definiujemy testowe endpointy dla POST, PUT, DELETE
app.post('/test', (req, res) => res.send("POST - OK"));
app.put('/test', (req, res) => res.send("PUT - OK"));
app.delete('/test', (req, res) => res.send("DELETE - OK"));

// Uruchomienie serwera
app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
})


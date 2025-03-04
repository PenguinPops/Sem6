const express = require('express');
const router = express.Router();
const users = require('../app/users.js');

const metoda = require('../middleware/metoda');
const isAuthorized = require('../middleware/autoryzacja');

router.use(metoda);


router.get('/', (req, res) => {
    const bgColor = req.query.bg || 'white'; 
    res.send(`
        <html>
            <head>
                <title>Prosty serwer</title>
            </head>
            <body style="background-color: ${bgColor};">
                <h1>Prosty serwer oparty na Express</h1>
                <p>Kolor tła został ustawiony na: ${bgColor}</p>
            </body>
        </html>
    `);
});
// http://localhost:3000/?bg=blue

router.get('/about', (req, res) => {
    res.send('Autor strony: Jan Kowalski');
});

router.get('/name/:imie', (req, res) => {
    res.send(`<h1>Cześć ${req.params.imie}</h1>`);
});

router.get('/name/:imie/:imie2', (req, res) => {
    res.send(`<h1>Cześć ${req.params.imie} i ${req.params.imie2}</h1>`);
});

router.get('/api/users', (req, res) => res.json(users));

router.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) res.json(user);
    else res.status(400).json({ msg: `Użytkownik o id ${req.params.id} nie został odnaleziony` });
});

router.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ msg: 'Podaj poprawne imię i e-mail!' });
    }
    const newUser = { id: users.length + 1, name, email, status: "aktywny" };
    users.push(newUser);
    res.json(users);
});

router.patch('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        res.json({ msg: 'Dane użytkownika zaktualizowane', user });
    } else {
        res.status(400).json({ msg: `Użytkownik o id ${req.params.id} nie istnieje!` });
    }
});

router.delete('/api/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.json({ msg: 'Użytkownik usunięty', users });
    } else {
        res.status(400).json({ msg: `Użytkownik o id ${req.params.id} nie istnieje!` });
    }
});

router.get('/secure-data', isAuthorized, (req, res) => {
    res.json({ msg: 'Dostęp do chronionych danych uzyskany!', data: [1, 2, 3, 4, 5] });
});

const { check, validationResult } = require('express-validator');
const path = require('path');

router.get('/form3', (req, res) => {
    res.sendFile(path.join(__dirname, '../app/public/form3.html'));
});

router.post('/form3', [
    check('nazwisko')
        .trim()
        .stripLow()
        .bail()
        .matches(/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ ]+$/).withMessage('Nazwisko może zawierać tylko litery i jedną spację')
        .isLength({ min: 3, max: 25 }).withMessage('Nazwisko musi mieć od 3 do 25 znaków')
        .customSanitizer(value => {
            let words = value.split(' ').filter(word => word.length > 0); // Remove extra spaces
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

    const nazwisko = req.body.nazwisko;
    const email = req.body.email;
    const wiek = req.body.wiek;

    res.render('info', { nazwisko, email, wiek });
});

router.get('/form2', (req, res) => {
    res.sendFile(path.join(__dirname, '../app/public/form2.html'));
});

router.get('/form1', (req, res) => {
    res.sendFile(path.join(__dirname, '../app/public/form.html'));
});

router.get('/form4', (req, res) => {
    res.sendFile(path.join(__dirname, '../app/public/form4.html'));
});

router.get('/form5', (req, res) => {
    res.sendFile(path.join(__dirname, '../app/public/form5.html'));
});

router.get('/convert', (req, res) => {
    const { value, toRad } = req.query;

    if (!value || isNaN(value)) {
        return res.status(400).json({ error: "Podaj poprawną wartość liczbową w parametrze 'value'." });
    }

    const numericValue = parseFloat(value);
    let result;

    if (toRad === "true") {
        result = numericValue * (Math.PI / 180); 
        res.send(`${numericValue} stopni to ${result} radianów.`);
    } else {
        result = numericValue * (180 / Math.PI); 
        res.send(`${numericValue} radianów to ${result} stopni.`);
    }
});


module.exports = router;


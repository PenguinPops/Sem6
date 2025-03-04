const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../api/routes.js'); // Import tras
const app = express();
const path = require('path')
const hbs = require('hbs')


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.get('/about', (req, res) => {
    res.render('about', {name: 'Jan'})
});

// Dołącz router
app.use('/', routes);

const port = 3000;
app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
});

// 1.16

// const http = require('http');
// const fs = require('fs');
// const path = require('path');
// const getDate = require('../server-files/getDate');

// const server = http.createServer((req, res) => {
//     const filePath = req.url === '/' ? '/index.html' : req.url;
//     console.log(`${getDate()} --- Klient wysłał zapytanie o plik ${filePath}`);

//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('Serwer działa poprawnie.');
// });

// server.listen(3000, () => {
//     console.log(`${getDate()} === Serwer zostaje uruchomiony na porcie 3000.`);
// });

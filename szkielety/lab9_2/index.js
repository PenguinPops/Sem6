const path = require('path');
const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const csrf = require('csurf');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session({
    secret: 'super-secret-key',
    key: 'super-secret-cookie',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));
// app.use(csrf({ cookie: true }));
app.use(flash());
app.use('/', routes);

app.use((req, res, next) => {
    res.status(404).send("Sorry, can't find that!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000, () => {
    console.log('App running at http://localhost:3000');
});
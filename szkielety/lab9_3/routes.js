const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const nodemailer = require('nodemailer');
const { Contact } = require('./db');

// Strona główna
router.get('/', (req, res) => {
    res.render('index');
});

// Formularz kontaktowy
router.get('/contact', csrfProtection, (req, res) => {
    res.render('contact', {
        data: {},
        errors: {},
        csrfToken: req.csrfToken()
    });
});

// Obsługa wysyłania formularza
router.post('/api/contact', [
    check('message').isLength({ min: 1 }).withMessage('Message is required').trim(),
    check('email').isEmail().withMessage('That email doesn’t look right').normalizeEmail()
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // return res.render('contact', {
        //     data: req.body,
        //     errors: errors.mapped(),
        //     csrfToken: req.csrfToken()
        // });
        res.status(400).json({ errors: errors.mapped() });
    }

    const data = req.body;

    try {
        // await sendEmail(data);
        await Contact.create(data);
        res.json({ success: true, message: "Message sent and saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }

    // react frontend
    // App running at http://localhost:3000
    // Executing (default): SELECT name FROM sqlite_master WHERE type='table' AND name='Contacts';
    // Executing (default): PRAGMA INDEX_LIST(`Contacts`)
    // Executing (default): INSERT INTO `Contacts` (`id`,`email`,`message`,`createdAt`,`updatedAt`) VALUES (NULL,$1,$2,$3,$4);
});

    // try {
    //     await sendEmail(data);
    //     req.flash('success', 'Message sent successfully!');
    //     res.redirect('/');
    // } catch (err) {
    //     console.error('Email error:', err);
    //     res.render('contact', { 
    //         data, 
    //         errors: { email: { msg: 'Could not send email' } }, 
    //         csrfToken: req.csrfToken() 
    //     });
    // }


    // Contact.create(data)
    //     .then(() => {
    //         req.flash('success', 'Message saved!');
    //         res.redirect('/');
    //     })
    //     .catch(err => {
    //         console.error('DB error:', err);
    //         res.render('contact', { data, errors: { email: { msg: 'Database error' } }, csrfToken: req.csrfToken() });
    //     });


        // App running at http://localhost:3000
        // Executing (default): SELECT name FROM sqlite_master WHERE type='table' AND name='Contacts';
        // Executing (default): CREATE TABLE IF NOT EXISTS `Contacts` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `email` VARCHAR(255) NOT NULL, `message` TEXT NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
        // Executing (default): PRAGMA INDEX_LIST(`Contacts`)
        // Executing (default): INSERT INTO `Contacts` (`id`,`email`,`message`,`createdAt`,`updatedAt`) VALUES (NULL,$1,$2,$3,$4);

// });

// Funkcja wysyłająca e-mail
// async function sendEmail(data) {
//     let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS
//         }
//     });

//     let mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: 's99689@pollub.edu.pl',
//         subject: 'Nowa wiadomość',
//         text: `Message: ${data.message}\nEmail: ${data.email}`
//     };

//     await transporter.sendMail(mailOptions);
// }

module.exports = router;

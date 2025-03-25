const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/contact', csrfProtection, (req, res) => {
    res.render('contact', {
        data: {},
        errors: {},
        csrfToken: req.csrfToken()
    });
});

router.post('/contact', csrfProtection, [
    check('message').isLength({ min: 1 }).withMessage('Message is required').trim(),
    check('email').isEmail().withMessage('That email doesn’t look right').normalizeEmail()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('contact', {
            data: req.body,
            errors: errors.mapped(),
            csrfToken: req.csrfToken()
        });
    }

    const data = req.body;
    console.log('Sanitized:', data);

    req.flash('success', 'Thanks for the message! I’ll be in touch :)');
    res.redirect('/');
});

module.exports = router;
const isAuthorized = (req, res, next) => {
    if (req.headers['authorization'] === 'secretpaswd') {
        next();
    } else {
        res.status(401).send('Dostęp zabroniony');
    }
};

module.exports = isAuthorized;

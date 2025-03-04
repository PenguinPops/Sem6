const metoda = (req, res, next) => {
    console.log(`Metoda HTTP: ${req.method}, Ścieżka: ${req.originalUrl}`);
    next();
};

module.exports = metoda;

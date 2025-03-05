// StudentController.js
// Kontroler danych studenta

async function insert(req, res, Student) {
    const studentData = {
        fullName: req.body.fullName,
        email: req.body.email,
        mobile: req.body.mobile,
        city: req.body.city,
    };

    try {
        await Student.insertOne(studentData); // Używamy insertOne do dodania nowego studenta
        res.redirect("/list");
    } catch (err) {
        console.log("Błąd podczas dodawania studenta: " + err);
        res.status(500).send("Błąd serwera");
    }
}

async function update(req, res, Student) {
    const studentData = {
        fullName: req.body.fullName,
        email: req.body.email,
        mobile: req.body.mobile,
        city: req.body.city,
    };

    try {
        await Student.updateOne({ _id: req.body._id }, { $set: studentData });
        res.redirect("/list");
    } catch (err) {
        console.log("Błąd podczas aktualizowania danych: " + err);
        res.status(500).send("Błąd serwera");
    }
}

exports.insert = insert;
exports.update = update;

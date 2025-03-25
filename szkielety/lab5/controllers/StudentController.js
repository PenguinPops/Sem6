// StudentController.js
// Kontroler danych studenta

const { ObjectId } = require('mongodb');

async function insert(req, res, Student) {
    const studentData = {
        fullName: req.body.fullName,
        email: req.body.email,
        mobile: req.body.mobile,
        city: req.body.city,
    };

    try {
        await Student.insertOne(studentData);
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
        await Student.updateOne(
            { _id: new ObjectId(req.body._id) }, 
            { $set: studentData }
        );
        res.redirect("/list");
    } catch (err) {
        console.log("Błąd podczas aktualizowania danych: " + err);
        res.status(500).send("Błąd serwera");
    }
}

exports.insert = insert;
exports.update = update;
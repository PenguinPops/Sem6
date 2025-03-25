// server.js
// Serwer Express.js

const express = require("express");
const path = require("path");
const handleBars = require("handlebars");
const exphbs = require("express-handlebars");
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access");
const app = express();
const insert = require("./controllers/StudentController").insert;
const update = require("./controllers/StudentController").update;
const { ObjectId } = require('mongodb');

// Importowanie funkcji do łączenia z MongoDB
const connectDB = require("./db");

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));


app.engine(
    "hbs",
    exphbs.engine({
        handlebars: allowInsecurePrototypeAccess(handleBars),
        extname: "hbs",
        defaultLayout: "./views/layout",
        layoutsDir: __dirname,
    })
);
app.set("view engine", "hbs");

connectDB().then((db) => {
    console.log("Baza danych gotowa!");

    const Student = db.collection("students"); 

    app.listen(3000, () => {
        console.log("Serwer nasłuchuje na porcie 3000");
    });

    app.get("/", (req, res) => {
        res.send(`
            <h3 style="text-align:center">Baza danych studentów</h3>
            <h4 style="text-align:center">Kliknij <a href="/list"> tutaj</a>, aby uzyskać dostęp do bazy.</h4>`);
    });

    app.get("/list", (req, res) => {
        Student.find().toArray().then((docs) => {
            res.render("list", {
                list: docs,
            });
        }).catch((err) => {
            console.log("Błąd pobierania danych: " + err);
        });
    });

    app.get("/addOrEdit", (req, res) => {
        res.render("addOrEdit", {
            viewTitle: "Dodaj studenta"
        });
    });

    app.post("/", (req, res) => {
        if (req.body._id == "") {
            insert(req, res, Student); 
        } else {
            update(req, res, Student);
        }
    });

    app.get("/:id", (req, res) => {
        try {
            const id = new ObjectId(req.params.id);
            Student.findOne({ _id: id }).then((doc) => {
                res.render("addOrEdit", {
                    viewTitle: "Zaktualizuj dane studenta",
                    student: doc
                });
            }).catch((err) => {
                console.log("Błąd podczas aktualizowania danych: " + err);
            });
        } catch (err) {
            console.log("Nieprawidłowy format ID: " + err);
            res.status(400).send("Nieprawidłowy format ID");
        }
    });
    
    app.get("/delete/:id", (req, res) => {
        try {
            const id = new ObjectId(req.params.id);
            Student.deleteOne({ _id: id }).then(() => {
                res.redirect("/list");
            }).catch((err) => {
                console.log("Błąd podczas usuwania: " + err);
            });
        } catch (err) {
            console.log("Nieprawidłowy format ID: " + err);
            res.status(400).send("Nieprawidłowy format ID");
        }
    });

}).catch(console.error);

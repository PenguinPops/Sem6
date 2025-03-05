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

// Połączenie z MongoDB przed uruchomieniem serwera
connectDB().then((db) => {
    console.log("Baza danych gotowa!");

    const Student = db.collection("students"); // Zmieniamy na korzystanie z MongoDB Atlas

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
            insert(req, res, Student); // Przekazujemy kolekcję Student
        } else {
            update(req, res, Student); // Przekazujemy kolekcję Student
        }
    });

    app.get("/:id", (req, res) => {
        Student.findOne({ _id: req.params.id }).then((doc) => {
            res.render("addOrEdit", {
                viewTitle: "Zaktualizuj dane studenta",
                student: doc
            });
        }).catch((err) => {
            console.log("Błąd podczas aktualizowania danych: " + err);
        });
    });

    app.get("/delete/:id", (req, res) => {
        Student.deleteOne({ _id: req.params.id }).then(() => {
            res.redirect("/list");
        }).catch((err) => {
            console.log("Błąd podczas usuwania: " + err);
        });
    });

}).catch(console.error);

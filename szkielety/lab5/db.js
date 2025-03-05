// db.js
// Łączenie z bazą danych MongoDB

// const mongoose = require("mongoose")

// mongoose.connect("mongodb://localhost:27017/StudentDB", { useNewUrlParser: true })
//     .then((result) => {
//         console.log("Połączono z bazą")
//     }).catch((err) => {
//         console.log("Nie można połączyć się z MongoDB. Błąd: " + err)
//     })

// module.exports = mongoose;


// db.js
// Łączenie z bazą danych MongoDB Atlas

const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();


// Zmienna z połączeniem do MongoDB Atlas
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectDB() {
    try {
        // Łączenie z MongoDB Atlas
        await client.connect();
        console.log("✅ Połączono z MongoDB Atlas!");
        // Zwróć połączenie do bazy danych "StudentDB"
        return client.db("StudentDB");
    } catch (err) {
        console.error("❌ Błąd połączenia z MongoDB:", err);
        process.exit(1); // Zatrzymaj aplikację, jeśli połączenie się nie uda
    }
}

// Eksportuj funkcję, aby łączyć się z bazą w innych częściach aplikacji
module.exports = connectDB;

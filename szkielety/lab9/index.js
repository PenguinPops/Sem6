const express = require("express")
const https = require("https")
const helmet = require("helmet")
fs = require("fs")
const options = {
    key: fs.readFileSync("webcert/localhost-key.pem"),
    cert: fs.readFileSync("webcert/localhost.pem"),
    dhparam: fs.readFileSync("sslcert/dh-strong.pem")
}
const app = express()

app.use(helmet())

app.use((req, res) => {
    res.writeHead(200)
    res.end("hello world\n")
})
app.listen(8000, () => {
    console.log("Serwer http nasłuchuje na porcie 8000, http://localhost:8000")
})
https.createServer(options, app).listen(8080, () => {
    console.log("Serwer https nasłuchuje na porcie 8080, https://localhost:8080")
});

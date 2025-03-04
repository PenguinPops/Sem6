// Zadanie 3.4

// const http = require('http')
// const url = require('url')
// http.createServer(function (req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/html' })
//     let q = url.parse(req.url, true).query
//     let txt = q.year + " " + q.month + " " + q.day
//     res.end(txt)
// }).listen(3000)

// Zadanie 3.5

// const http = require("http")
// const hostname = "localhost"
// const port = 3000
// const server = http.createServer((req, res) => {
//     res.statusCode = 200
//     res.setHeader("Content-Type", "text/html")
//     res.end(
//         // stworz tu kod html o ponizszej tresci i strukturze
//         //         "
//         // Aplikacja w Node
//         // To jest odpowiedź HTML
//         // 1.
//         // 2.
//         // 3.
//         // "

//         `<!DOCTYPE html>
//     <html>
//         <head>
//         <title>Aplikacja w Node</title>
//         </head>
//         <body>
//         <h1>To jest odpowiedź HTML</h1>
//         <ul>
//             <li>1.</li>
//             <li>2.</li>
//             <li>3.</li>
//         </ul>
//         </body>
//     </html>`

//     )
// })
// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`)
// })

// Zadanie 3.6

// const http = require("http")
// const hostname = "localhost"
// const port = 3000
// const server = http.createServer((req, res) => {
//     res.statusCode = 200
//     res.setHeader("Content-Type", "text/html")
//     switch (req.url) {
//         case "/home":
// Strona domowa
//             break
//         case "/about":
// Strona o mnie
//             break
//         default:
// Nie znaleziono
//             break
//     }
// })
// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`)
// })

// Zadanie 3.7

const http = require('http')
let items = []

function show(res) {
    let html = '<html><head><title>Lista zadan</title></head><body>'
        + '<h1>Lista zadan</h1>'
        + '<form method="post" action="/">'
        + '<p><input type="text" name="item" />'
        + '<input type="submit" value="Dodaj" /></p>'
        + '<ul>'
        + items.map(function (item) {
            return '<li>' + item + '</li>'
        }).join('')
        + '</ul>'
        + '</form></body></html>'
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Content-Length', Buffer.byteLength(html))
    res.end(html)
}

function notFound(res) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end('Not Found')
}

function badRequest(res) {
    res.statusCode = 400
    res.setHeader('Content-Type', 'text/plain')
    res.end('Bad Request')
}

let qs = require('querystring')
function add(req, res) {
    var body = ''
    req.setEncoding('utf8')
    req.on('data', function (chunk) { body += chunk })
    req.on('end', function () {
        var obj = qs.parse(body)
        items.push(obj.item)
        show(res)
    })
}
const server = http.createServer(function (req, res) {
    if ('/' == req.url) {
        switch (req.method) {
            case 'GET':
                show(res)
                break
            case 'POST':
                add(req, res)
                break
            default:
                badRequest(res)
        }
    } else {
        notFound(res)
    }
})
server.listen(3000)
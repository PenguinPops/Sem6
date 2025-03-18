// Zadanie 3.1

// const http = require('http')
// function process_request(req, res) {
//     const body = 'Witaj na platformie Node!\n'
//     const content_length = body.length
//     res.writeHead(200, {
//         'Content-Length': content_length,
//         'Content-Type': 'text/plain'
//     });
//     res.end(body)
// }
// const server = http.createServer(process_request)
// server.listen(3000, () => console.log('Serwer działa!'));

// Zadanie 3.2

// function fibonacci(num) {
//     let a = 1, b = 0, temp, cnt = 0;
//     while (cnt <= num-1) {
//         temp = a;
//         a = a + b;
//         b = temp;
//         cnt++;
//     }
//     return b;
// }

// console.log(fibonacci(5))

// Zadanie 3.3

// const http = require('http')
// const fs = require('fs')
// const port = 3000
// function serveStaticFile(res, path, contentType, responseCode = 200) {
//     fs.readFile(__dirname + path, (err, data) => {
//         if (err) {
//             res.writeHead(500, { 'Content-Type': 'text/plain' })
//             return res.end('500 - Blad wewnetrzny')
//         }
//         res.writeHead(responseCode, { 'Content-Type': contentType })
//         res.end(data)
//     })
// }
// const server = http.createServer((req, res) => {
//     switch (req.url) {
//         case '/':
//             serveStaticFile(res, '/public/home.html', 'text/html')
//             break
//         case '/about':
//             serveStaticFile(res, '/public/about.html', 'text/html')
//             break
//         case '/img/logo.jpg':
//             serveStaticFile(res, '/public/img/logo.jpg', 'image/jpeg')
//             break
//         default:
//             serveStaticFile(res, '/public/404.html', 'text/html')
//             break
//     }
// })
// server.listen(port, () => console.log(`Server działa na porcie ${port}; ` + 'naciśnij Ctrl+C, aby zakończyć'))
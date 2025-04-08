const http = require('http');
const os = require('os');

const version = process.env.VERSION || '1.0.0';

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(`Adres IP serwera: ${getServerIp()}\n`);
    res.write(`Nazwa serwera (hostname): ${os.hostname()}\n`);
    res.write(`Wersja aplikacji: ${version}\n`);
    res.end();
});

function getServerIp() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1';
}

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
})


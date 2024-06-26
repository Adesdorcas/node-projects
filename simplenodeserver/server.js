const http = require('http')
const os = require('os')

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        // Handle preflight requests
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === '/systeminfo' && req.method === 'GET') {
        // Simulate asynchronous operation with a random delay
        const randomDelay = Math.random() * 1000;
        setTimeout(() => {
            const cpuInfo = os.cpus();
            const osInfo = {
                platform: os.platform(),
                type: os.type(),
                release: os.release(),
            };
            const systeminfo = {
                cpuInfo,
                osInfo,
            };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(systeminfo));
        }, randomDelay);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }

});
server.listen(PORT, "127.0.0.1", () => {
    console.log("listening on 127.0.0.1:3000");
});
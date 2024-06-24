const { createServer } = require('http');

let db = [
    { id: 1, title: "I knew a transsexual guy whose only ambition is to EventTarget, drink and be Mary", comedian: "George Carlin", year: 2000 },
    { id: 2, title: "Toughest job i ever had: selling doors, door to door", comedian: "Bill Bailey", year: 1964 },
    { id: 3, title: "Swear If you didn't just wash your legs and hands instead of bathing before going to school", comedian: "Prince_miraj", year: 2001 },
    { id: 4, title: "Swear If you didn't act film inside uncompleted buildings or under the bed with friends", comedian: "Prince_miraj", year: 2001 },
    { id: 5, title: "Swear if you never flew a kite", comedian: "Prince_miraj", year: 2001 },
];

const server = createServer((req, res) => {
    const { method, url } = req;

    if (method === 'GET' && url === '/') {
        handleGetRequest(req, res);
    } else if (method === 'PATCH' && url.startsWith('/jokes/')) {
        handlePatchRequest(req, res);
    } else if (method === 'DELETE' && url.startsWith('/jokes/')) {
        handleDeleteRequest(req, res);
    } else {
        sendResponse(res, 404, { error: true, message: 'Not found' });
    }
});

function handleGetRequest(req, res) {
    sendResponse(res, 200, { data: db, message: 'Data fetched successfully' });
}

function handlePatchRequest(req, res) {
    const id = +req.url.split('/')[2];
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        try {
            const updatedJoke = JSON.parse(body);
            const existingJoke = db.find(joke => joke.id === id);

            if (existingJoke) {
                Object.assign(existingJoke, updatedJoke);
                sendResponse(res, 200, { data: existingJoke, message: 'Joke updated successfully' });
            } else {
                sendResponse(res, 404, { error: true, message: 'Joke not found' });
            }
        } catch (error) {
            sendResponse(res, 400, { error: true, message: 'Invalid JSON data' });
        }
    });
}

function handleDeleteRequest(req, res) {
    const id = +req.url.split('/')[2];
    const deletedJokeIndex = db.findIndex(joke => joke.id === id);

    if (deletedJokeIndex !== -1) {
        const deletedJoke = db.splice(deletedJokeIndex, 1)[0];
        sendResponse(res, 200, { data: deletedJoke, message: 'Joke deleted successfully' });
    } else {
        sendResponse(res, 404, { error: true, message: 'Joke not found' });
    }
}

function sendResponse(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

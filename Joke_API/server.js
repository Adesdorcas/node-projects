const { createServer } = require('http');

let db = [
    {ID: 1, "title": 'I knew a transsexual guy whose only ambition is to EventTarget, drink and be Mary', comedian: 'Gearge Carlin', year: '2000'},
    {id: 2, "title": "Toughest job i ever had: selling doors, door to door", "comedian": "Bill Bailey", year: 1964},
];

// GET, POST, PUT, DELETE - CRUD
const requestHandler = (req, res) => {
    
    console.log(req.url);

    if (req.url === "/" && req.method === 'GET') {
        getjokes(req, res);

    } else if (req.url === "/jokes" && req.method === "PATCH") {
        updateJokes(req, res);
        
    } else {
        req.writeHead(404);
        res.end(JSON.stringify({ error: true, message: "Not found" }));
    }
 }


function getjokes(req, res) {
    req.writeHead(200);
    res.end(JSON.stringify({ data: db, message: "data fetched successfully" }));
}

function updateJokes(req, res) {

    req.on("data", (chunk) =>{
        body.push(chunk)
    
    });
        
    req.on('end'), () =>{
        
        const convertedBuffer = Buffer.concat(body).tostring();
        const jsonRes = JSON.parse(convertedBuffer);
        
        const updateDb = db.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    ...jsonRes,
                };
            }
            return item;
        });    
        
        db = updateDB;

    };
    res.end(JSON.stringify(db));

const server = createServer(requestHandler);
server.listen(3000, () => {
    console.log("server is listening on port 3000");
});
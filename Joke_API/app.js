const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let db = [
    { id: 1, title: "I knew a transsexual guy whose only ambition is to EventTarget, drink and be Mary", comedian: "George Carlin", year: 2000 },
    { id: 2, title: "Toughest job i ever had: selling doors, door to door", comedian: "Bill Bailey", year: 1964 },
    { id: 3, title: "Swear If you didn't just wash your legs and hands instead of bathing before going to school", comedian: "Prince_miraj", year: 2001 },
    { id: 4, title: "Swear If you didn't act film inside uncompleted buildings or under the bed with friends", comedian: "Prince_miraj", year: 2001 },
    { id: 5, title: "Swear if you never flew a kite", comedian: "Prince_miraj", year: 2001 },
];

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.status(200).json({ data: db, message: 'Data fetched successfully' });
});

app.patch('/jokes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedJoke = req.body;
    const existingJoke = db.find(joke => joke.id === id);

    if (existingJoke) {
        Object.assign(existingJoke, updatedJoke);
        res.status(200).json({ data: existingJoke, message: 'Joke updated successfully' });
    } else {
        res.status(404).json({ error: true, message: 'Joke not found' });
    }
});

app.delete('/jokes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const deletedJokeIndex = db.findIndex(joke => joke.id === id);

    if (deletedJokeIndex !== -1) {
        const deletedJoke = db.splice(deletedJokeIndex, 1)[0];
        res.status(200).json({ data: deletedJoke, message: 'Joke deleted successfully' });
    } else {
        res.status(404).json({ error: true, message: 'Joke not found' });
    }
});

// Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

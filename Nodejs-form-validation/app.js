const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Form Validation</title>
        </head>
        <body>
            <form action="/submit" method="post">
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" required><br><br>
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" required><br><br>
                <label for="otherNames">Other Names:</label>
                <input type="text" id="otherNames" name="otherNames"><br><br>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required><br><br>
                <label for="phoneNumber">Phone Number:</label>
                <input type="text" id="phoneNumber" name="phoneNumber" required><br><br>
                <label for="gender">Gender:</label>
                <select id="gender" name="gender" required>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select><br><br>
                <button type="submit">Submit</button>
            </form>
        </body>
        </html>
    `);
});

app.post('/submit', (req, res) => {
    const { firstName, lastName, otherNames, email, phoneNumber, gender } = req.body;
    const errors = [];

    // Validation
    if (!firstName || firstName.length < 1 || /\d/.test(firstName)) {
        errors.push('Invalid first name.');
    }
    if (!lastName || lastName.length < 1 || /\d/.test(lastName)) {
        errors.push('Invalid last name.');
    }
    if (otherNames && /\d/.test(otherNames)) {
        errors.push('Other names cannot contain numbers.');
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Invalid email address.');
    }
    if (!phoneNumber || phoneNumber.length !== 10 || /\D/.test(phoneNumber)) { // Assuming phone number must be 10 digits
        errors.push('Invalid phone number.');
    }
    if (!gender) {
        errors.push('Gender is required.');
    }

    if (errors.length > 0) {
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Form Validation Errors</title>
            </head>
            <body>
                <h1>Validation Errors</h1>
                <ul>
                    ${errors.map(error => `<li>${error}</li>`).join('')}
                </ul>
                <a href="/">Go back to the form</a>
            </body>
            </html>
        `);
    } else {
        const data = { firstName, lastName, otherNames, email, phoneNumber, gender };
        fs.readFile('database.json', (err, content) => {
            const jsonData = err ? [] : JSON.parse(content);
            jsonData.push(data);
            fs.writeFile('database.json', JSON.stringify(jsonData, null, 2), err => {
                if (err) {
                    res.send('Error saving data.');
                } else {
                    res.send('Data submitted successfully!');
                }
            });
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



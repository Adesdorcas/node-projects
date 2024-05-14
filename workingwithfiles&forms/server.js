const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  const { method, url: reqUrl } = req;

  if (method === 'GET' && reqUrl === '/') {
    fs.readFile('./index.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (method === 'POST' && reqUrl === '/submit') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const formData = querystring.parse(body);
      const { firstName, lastName, otherNames, email, phone, gender } = formData;
      const errors = [];

      // Validation
      if (!firstName || !lastName) {
        errors.push('First name and last name are required.');
      } else {
        if (firstName.length < 1 || lastName.length < 1) {
          errors.push('The name cannot be less than 1 character.');
        }
        if (!/^[a-zA-Z]+$/.test(firstName) || !/^[a-zA-Z]+$/.test(lastName)) {
          errors.push('The name cannot contain numbers.');
        }
      }

      if (otherNames && !/^[a-zA-Z ]+$/.test(otherNames)) {
        errors.push('Other names can only contain letters and spaces.');
      },

      if (!email || !email.includes('@') || !email.includes('.')) {
        errors.push('Please enter a valid email address.');
      }

      if (!phone || phone.length !== 10 || !/^\d+$/.test(phone)) {
        errors.push('Phone number must be 10 digits.');
      }

      if (!gender) {
        errors.push('Gender is required.');
      }

      if (errors.length > 0) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ errors }));
      } else {
        const formData = { firstName, lastName, otherNames, email, phone, gender };
        const data = JSON.stringify(formData, null, 2);
        fs.writeFile('database.json', data, err => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Form submitted successfully!' }));
          }
        });
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

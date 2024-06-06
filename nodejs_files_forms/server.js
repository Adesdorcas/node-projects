const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { parse } = require('querystring');

const port = 4000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (req.method === 'GET') {
    if (pathname === '/') {
      serveFile(res, 'index.html', 'text/html');
    } else if (pathname === '/styles.css') {
      serveFile(res, 'styles.css', 'text/css');
    } else if (pathname === '/background.jpg') {
      serveFile(res, 'background.jpg', 'image/jpeg');
    } else {
      res.statusCode = 404;
      res.end('Not Found');
    }
  } else if (req.method === 'POST' && pathname === '/submit') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const formData = parse(body);
      const { firstName, lastName, otherName, email, phoneNumber, gender } = formData;
      const errors = validateForm(formData);

      if (errors.length > 0) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.write('<html><head><title>Form Validation Errors</title><link rel="stylesheet" type="text/css" href="styles.css"></head><body><div class="container"><h2>Validation Errors</h2>');
        errors.forEach(error => res.write(`<p class="error">${error}</p>`));
        res.write('<a href="/">Go back</a></div></body></html>');
        res.end();
      } else {
        // Append form data to database.json
        fs.readFile('database.json', 'utf8', (err, data) => {
          let json = [];
          if (!err && data) {
            json = JSON.parse(data);
          }
          json.push(formData);
          fs.writeFile('database.json', JSON.stringify(json, null, 2), 'utf8', err => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'text/html' });
              res.end('Server Error');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<html><head><title>Form Submitted</title></head><body><h2>Form submitted successfully!</h2><a href="https://node-projects-jgxr.onrender.com/">Go back</a></body></html>');
          });
        });
      }
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

function serveFile(res, filePath, contentType) {
  fs.readFile(path.join(__dirname, filePath), (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end('Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

function validateForm(formData) {
  const { firstName, lastName, otherName, email, phoneNumber, gender } = formData;
  const errors = [];

  if (!firstName || firstName.length < 1) errors.push('First name is required and must be at least 1 character.');
  if (!lastName || lastName.length < 1) errors.push('Last name is required and must be at least 1 character.');

  const namePattern = /^[A-Za-z\s]+$/;
  if (firstName && !namePattern.test(firstName)) errors.push('First name cannot contain numbers.');
  if (lastName && !namePattern.test(lastName)) errors.push('Last name cannot contain numbers.');
  if (otherName && !namePattern.test(otherName)) errors.push('Other names cannot contain numbers.');

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) errors.push('Invalid email address.');

  const phonePattern = /^\d{10}$/;
  if (!phoneNumber || !phonePattern.test(phoneNumber)) errors.push('Phone number must be exactly 10 digits.');

  if (!gender) errors.push('Gender is required.');

  return errors;
}

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

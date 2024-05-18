## This repo contains projects done during my learning of Backend development with Nodejs from Zuri Training, March 2024 set 

## Project 1: Setting up a simple NodeJS Server (simplenodeserver)
Create a simple server using the core ‘node:http’ module that can handle multiple concurrent requests. Each request should respond with a message after a random delay (simulating some asynchronous operation) without blocking the server.
 
The server should be configured to handle CORS.
Provide a GET route that when hit, returns information about the user’s CPU and OS (any information you’d like to return).

## Project 2: Working with NodeJS Server API (Joke_API)
Create a node js project following the instructions below;

- The Project should have just one file server.js. This doesn't include all the auto-created files like package.json etc.
- The project should use nodemon command to run the server instead of the node command
- The server should be able to receive POST and GET requests on the home/route
- The Server should use a variable called db as it's database
- When the server receives a POST request, it should add a joke to the db and return the entire joke db to the client
- When the server receives a GET request, it should return all jokes to the client
- The server should receive PATCH and DELETE requests on a route like so (/joke/1). Note: 1 as seen in the url here represents the id.
- When the server receives a PATCH request, it should update a joke which matches the id provided in the url. The information for the update should be sent via the request body and the response sent to the client should be the updated joke only
- When the server receives a DELETE request, it should delete the joke which matches the id provided in the url and return the deleted joke to the user as response.

# TIPS:
The db variable should be an array of objects
Each object in the db should be an object and all objects should have the same structured
Each object should have the following keys: title, comedian, year, and id

PS: This is a joke API server.
# Remember that your project must only contain one file created explicitly by your server.js


## Project 3: (workingwithfiles&forms) 
# Create a Simple HTML Form containing the following fields:

- First name
- Last name
- Other names
- Email address
- Phone number
- Gender (Dropdown)
- Submit button
# Make sure to do proper validation that meets the following criteria:
- The name cannot be less than 1 character
- first name and last name are required
- other names is optional
- The name cannot contain numbers
- The email has to be a valid email with @ and .
- Phone number must be a specific number of characters
- Gender is required
# When the form is submitted, display specific validation errors if any, if no errors, submit the content of the form to a file called 'database.json'


## Project 4:



## Project 5:



## Project 6:
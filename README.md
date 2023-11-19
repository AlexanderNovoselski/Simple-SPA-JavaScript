This repository is simply for exercising DOM Manipulation, functions and asynchronously programming, featuring some unit testing with mocha and chai.


To build the server API, run the server with node server.js then you can start sending requests to the local server :/

CRUD Operations
All requests are sent to /jsonstore/:resource. Resources can be nested and have any shape. Individual properties can be accessed by appending /:propName to the endpoint as deep as you require. Supported requests are GET, POST, PUT, PATCH, DELETE
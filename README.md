<h2>This repository is simply for exercising DOM Manipulation, functions and asynchronously programming, featuring some unit testing with mocha and chai.</h2>

<p>To build the server API, run the server with <code>node server.js</code> then you can start sending requests to the local server :/</p>


<h3>CRUD Operations</h3>

<p>All requests are sent to <code>/jsonstore/:resource</code>. Resources can be nested and have any shape. Individual properties can be accessed by appending <code>/:propName</code> to the endpoint as deep as you require. Supported requests are GET, POST, PUT, PATCH, DELETE.</p>

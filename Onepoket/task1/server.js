const express = require('express');
const app = express();
const port = 3000;

//Middleware to log incoming requests 
app.use((req, res, next) => {

    console.log(`Incoming requests:${req.method} ${req.url}`);
    next();
});

// Route to respond with "hello world " for all incoming requests 
app.get('/', (req, res) => {
    res.send('HELLO WORLD');
});

// start the server // node server.js 
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

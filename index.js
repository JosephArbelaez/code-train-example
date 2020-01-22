const express = require('express');
const Datastore = require('nedb');
const app = express();

// Have the application listen to whichever port the hosting application sets or 3000.
const port = process.env.PORT || 3000;

app.listen(3000, () => console.log("Listening at 3000"));
app.use(express.static('public'));
app.use(express.json( {limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if(err) {
            response.end();
            return;
        }
        response.json(data);
    });
});

app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
});


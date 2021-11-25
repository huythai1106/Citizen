const express = require('express');
const app = express();
const Route = require('./Routers');
const db = require('./Config/db');

db.connect();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}))

Route(app);

app.listen(PORT, console.log('App listening on port ' + PORT))
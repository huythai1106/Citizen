const express = require('express');
const app = express();
const Route = require('./Routers');
const db = require('./Config/db');
const cors = require('cors');

require('dotenv').config();

db.connect();

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}))

Route(app);

app.listen(PORT, console.log('App listening on port ' + PORT))
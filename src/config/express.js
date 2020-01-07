

const express = require('express');
const app = express();
const bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({
    extended: true
}));


const routes = require('../app/routes/rotas');
routes(app);

module.exports = app;
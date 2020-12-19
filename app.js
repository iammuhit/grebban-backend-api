const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Constants
const PATH_BASE = process.env.PATH_BASE = path.resolve(__dirname);
const PATH_APP = process.env.PATH_APP = path.resolve(PATH_BASE, 'app');
const PATH_MODULE = process.env.PATH_MODULE = path.resolve(PATH_APP, 'Modules');

// Routes
const routesWeb = require(path.resolve(PATH_BASE, 'routes/web'));
const routesApi = require(path.resolve(PATH_BASE, 'routes/api'));

// Middlewares
// const middlewareVerifyToken = require(path.resolve(PATH_APP, 'Http/Middleware/ValidateToken'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routesWeb);
app.use('/api/', routesApi);

app.use(cors);

module.exports = app;
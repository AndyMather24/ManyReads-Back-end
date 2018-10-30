const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const DB_URL = process.env.DB_URL || require('./config').DB_URL;
const apiRouter = require('./router/index');
const bodyParser = require('body-parser');
const { handle400, handle404, handle500 } = require('./error-handles');

mongoose.connect(DB_URL, { useNewUrlParser: true });
app.use(cors());
app.use(bodyParser.json());
app.get('/', apiRouter);
app.use('/api', apiRouter);

// none existent routes error handler
app.use('/*', (req, res, next) => next({ status: 404, msg: 'Page Not Found' }));
// error handlers
app.use(handle400);
app.use(handle404);
app.use(handle500);

module.exports = app;

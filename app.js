const mongoose = require('mongoose');
const express = require('express');
const app = express();
const { DB_URL } = require('./config');
const router = require('./router/index.js');
const bodyParser = require('body-parser');
const { handle400, handle404, handle500 } = require('./error-handles');

mongoose.connect(
  DB_URL,
  { useNewUrlParser: true }
);
app.use(bodyParser.json());

app.use('/api', router);

// none existent routes error handler
app.use('/*', (req, res, next) => next({ status: 404, msg: 'Page Not Found' }));
// error handlers
app.use(handle400);
app.use(handle404);
app.use(handle500);

module.exports = app;

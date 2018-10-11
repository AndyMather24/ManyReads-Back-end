const express = require('express');
const app = express();
const router = require('./router/index.js');

app.use('/api', router);

app.use('/*', (req, res, next) => next({ status: 404, msg: 'Page Not Found'});

module.exports = { app };

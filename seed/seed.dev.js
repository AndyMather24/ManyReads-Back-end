//process.env.NODE_ENV = 'production';

const mongoose = require('mongoose');
const seedDb = require('../seed/seed.js');
const { DB_URL } = require('../config');

const { topicsData, userData, articlesData, commentData } = require('../seed/testData');
// connect
mongoose
  .connect(
    DB_URL,
    { useNewUrlParser: true }
  )
  // seed
  .then(() => seedDb(topicsData, userData, articlesData, commentData))
  // disconnect
  .then(() => mongoose.disconnect());

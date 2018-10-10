const mongoose = require('mongoose');
const seedDb = require('../seed/seed.js');
const DB_URL = 'mongodb://localhost:27017/Ncnews';

const { topicsData, userData, articlesData } = require('../seed/testData');
// connect
mongoose
  .connect(
    DB_URL,
    { useNewUrlParser: true }
  )
  // seed
  .then(() => seedDb(topicsData, userData, articlesData))
  // disconnect
  .then(() => mongoose.disconnect());

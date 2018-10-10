const mongoose = require('mongoose');
const { User, Article, Comment, Topic } = require('../models/index.js');
const { adjustArticles } = require('../utils');

// define seedDb function
const seedDb = (topicsData, userData, ArticleData) => {
  // drop table
  return (
    mongoose.connection
      .dropDatabase()
      .then(() => {
        // insert topics data
        return Topic.insertMany(topicsData);
      })
      // insert userdata
      .then(() => {
        return User.insertMany(userData);
        console.log(userDocs);
      })
      // add a belongs_to prop  to arts which is a slug from a topic
      .then(userDocs => {
        console.log(userDocs);
        return adjustArticles(ArticleData, userDocs);
      })
      .then(AdjustedArticleData => {
        console.log(AdjustedArticleData);
      })
  );
};
// add a created which is  a topic mongo id
//
module.exports = seedDb;

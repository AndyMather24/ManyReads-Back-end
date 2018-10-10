const mongoose = require('mongoose');
const { User, Article, Comment, Topic } = require('../models/index.js');
const { adjustArticles, adjustComments } = require('../utils');

// define seedDb function
const seedDb = (topicsData, userData, articleData, commentData) => {
  // drop table
  return (
    mongoose.connection
      .dropDatabase()
      .then(() => {
        // insert topics data
        return Topic.insertMany(topicsData);
      })
      // insert users data
      .then(() => {
        return User.insertMany(userData);
      })
      // adds a belongs_to prop to arts which is a slug from a topic and rel mongodb id
      .then(userDocs => {
        return Promise.all([adjustArticles(articleData, userDocs), userDocs]);
      })
      // inserts altered articles data
      .then(([adjustedArticleData, userDocs]) => {
        console.log(commentData);
        Article.insertMany(adjustedArticleData);
        return adjustComments(commentData, userDocs, adjustedArticleData);
      })
      .then(adjustedcoms => {
        // return console.log(adjustedcoms);
      })
  );
};

module.exports = seedDb;

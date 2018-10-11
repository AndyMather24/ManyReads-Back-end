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
        return Promise.all([userDocs, Article.insertMany(adjustedArticleData)]);
      })
      .then(([userDocs, artDocs]) => {
        return adjustComments(commentData, userDocs, artDocs);
      })
      .then(adjustedcoms => {
        return Comment.insertMany(adjustedcoms);
      })
  );
};

module.exports = seedDb;

const mongoose = require('mongoose');
const { User, Article, Comment, Topic } = require('../models/index.js');
const { formatArticles, formatComments } = require('../utils');
// define seedDb function
const seedDb = (topicsData, userData, articleData, commentData) => {
  // drop table
  return (
    mongoose.connection
      .dropDatabase()
      .then(() => {
        // insert topics data & insert users data
        const topicDocs = Topic.insertMany(topicsData);
        const userDocs = User.insertMany(userData);
        return Promise.all([topicDocs, userDocs]);
      })
      .then(([topicDocs, userDocs]) => {
        const formatedArticles = formatArticles(articleData, userDocs);
        // adjust arts data
        return Promise.all([formatedArticles, topicDocs, userDocs]);
      })
      // insert adjust arts data
      .then(([adjustedArts, topicDocs, userDocs]) => {
        return Promise.all([Article.insertMany(adjustedArts), topicDocs, userDocs]);
      })
      // adjust comments data
      .then(([artDocs, topicDocs, userDocs]) => {
        const formatedComments = formatComments(commentData, userDocs, artDocs);
        return Promise.all([formatedComments, artDocs, userDocs, topicDocs]);
      })
      // insert comments data
      .then(([adjustedcoms, artDocs, userDocs, topicDocs]) => {
        return Promise.all([Comment.insertMany(adjustedcoms), artDocs, userDocs, topicDocs]);
      })
      // return the first object in each array of docs
      .then(([commentDocs, artDocs, userDocs, topicDocs]) => {
        return [topicDocs[0], userDocs[0], artDocs[0], commentDocs[0]];
      })
  );
};

module.exports = seedDb;

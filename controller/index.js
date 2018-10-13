const { getHomepage } = require('./homepage');
const { getTopics, getArtsForTopic, addArticleToTopic } = require('./topics');
const { getArticles, getArticlesById } = require('./articles');
const { getUserByUsername } = require('./users');
const { getArticleComments, addArticleComment } = require('./comments');

module.exports = {
  getTopics,
  getHomepage,
  getArticles,
  getArtsForTopic,
  getArticlesById,
  getUserByUsername,
  getArticleComments,
  addArticleComment,
  addArticleToTopic
};

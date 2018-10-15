const { getHomepage } = require('./homepage');
const { getTopics, getArtsForTopic, addArticleToTopic } = require('./topics');
const { getArticles, getArticlesById, changeVote } = require('./articles');
const { getUserByUsername } = require('./users');
const { getArticleComments, addArticleComment, deleteComment } = require('./comments');

module.exports = {
  getTopics,
  getHomepage,
  getArticles,
  getArtsForTopic,
  getArticlesById,
  getUserByUsername,
  getArticleComments,
  addArticleComment,
  addArticleToTopic,
  deleteComment,
  changeVote
};

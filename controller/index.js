const { getHomepage } = require('./homepage');
const { getTopics, getArtsForTopic } = require('./topics');
const { getArticles, getArticlesById } = require('./articles');
const { getUserByUsername } = require('./users');
const { getArticleComments } = require('./comments');

module.exports = { getTopics, getHomepage, getArticles, getArtsForTopic, getArticlesById, getUserByUsername, getArticleComments };

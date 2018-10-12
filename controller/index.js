const { getHomepage } = require('./homepage');
const { getTopics, getArtsForTopic } = require('./topics');
const { getArticles, getArticlesById } = require('./articles');
const { getUserByUsername } = require('./users');

module.exports = { getTopics, getHomepage, getArticles, getArtsForTopic, getArticlesById, getUserByUsername };

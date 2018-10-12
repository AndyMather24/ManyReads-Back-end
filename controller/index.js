const { getHomepage } = require('./homepage');
const { getTopics, getArtsForTopic } = require('./topics');
const { getArticles, getArticlesById } = require('./articles');

module.exports = { getTopics, getHomepage, getArticles, getArtsForTopic, getArticlesById };

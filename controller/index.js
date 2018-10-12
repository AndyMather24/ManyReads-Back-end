const { getHomepage } = require('./homepage');
const { getTopics, getArtsForTopic } = require('./topics');
const { getArticles } = require('./articles');

module.exports = { getTopics, getHomepage, getArticles, getArtsForTopic };

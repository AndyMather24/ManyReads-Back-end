const apiRouter = require('express').Router();
const { getHomepage, getTopics, getArticles, getArtsForTopic } = require('../controller');

// home page
apiRouter.get('/', getHomepage);

// topics
apiRouter.get('/topics', getTopics);

apiRouter.get('/topics/:topic_slug/articles', getArtsForTopic);

// articles
apiRouter.get('/articles', getArticles);

module.exports = apiRouter;

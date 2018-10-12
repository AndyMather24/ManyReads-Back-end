const apiRouter = require('express').Router();
const { getHomepage, getTopics, getArticles, getArtsForTopic, getArticlesById, getUserByUsername } = require('../controller');

// home page
apiRouter.get('/', getHomepage);

// topics
apiRouter.get('/topics', getTopics);

apiRouter.get('/topics/:topic_slug/articles', getArtsForTopic);

// articles
apiRouter.get('/articles', getArticles);
apiRouter.get('/articles/:article_id', getArticlesById);

// users
apiRouter.get('/users/:username', getUserByUsername);

module.exports = apiRouter;

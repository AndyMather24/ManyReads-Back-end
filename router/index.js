const apiRouter = require('express').Router();
const {
  getHomepage,
  getTopics,
  getArticles,
  getArtsForTopic,
  getArticlesById,
  getUserByUsername,
  getArticleComments,
  addArticleToTopic,
  addArticleComment
} = require('../controller');

// home page
apiRouter.get('/', getHomepage);

// topics
apiRouter.get('/topics', getTopics);

apiRouter.get('/topics/:topic_slug/articles', getArtsForTopic).post('/topics/:topic_slug/articles', addArticleToTopic);

// articles
apiRouter.get('/articles', getArticles);
apiRouter.get('/articles/:article_id', getArticlesById);
// comment
apiRouter.get('/articles/:article_id/comments', getArticleComments).post('/articles/:article_id/comments', addArticleComment);

// users
apiRouter.get('/users/:username', getUserByUsername);

module.exports = apiRouter;

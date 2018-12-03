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
  addArticleComment,
  deleteComment,
  changeVote,
  changeVoteComments
} = require('../controller');

// home page
apiRouter.get('/api', getHomepage);

// topics
apiRouter.get('/topics', getTopics);

apiRouter.get('/topics/:topic_slug/articles', getArtsForTopic).post('/topics/:topic_slug/articles', addArticleToTopic);

// articles
apiRouter.get('/articles', getArticles);
apiRouter.get('/articles/:article_id', getArticlesById).patch('/articles/:article_id', changeVote);
// comment
apiRouter.get('/articles/:article_id/comments', getArticleComments).post('/articles/:article_id/comments', addArticleComment);
apiRouter.delete('/comments/:comment_id', deleteComment).patch('/comments/:comment_id', changeVoteComments)


// users
apiRouter.get('/users/:username', getUserByUsername);

module.exports = apiRouter;

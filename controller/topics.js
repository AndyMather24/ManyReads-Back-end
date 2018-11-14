const { Topic, Article, Comment } = require('../models');

exports.getTopics = (req, res, next) => {
  Topic.find()
    .then(topics => {
      res.send({ topics });
    })
    .catch(next);
};

exports.getArtsForTopic = (req, res, next) => {
  const { topic_slug } = req.params;
  return Promise.all([Article.find({ belongs_to: topic_slug }).lean(), Comment.find().lean()])
    .then(([articles, comments]) => {
      if (articles.length === 0) return Promise.reject({ status: 404, msg: 'Invalid Param' });
      const articlesComment = articles.map(article => {
        const comment_count = comments.filter(comment => comment.belongs_to.toString() === article._id.toString()).length;
        return { ...article, comment_count };
      });
      res.send(articlesComment);
    })
    .catch(next);
};

exports.addArticleToTopic = (req, res, next) => {
  const { topic_slug } = req.params;
  const article = new Article({ ...req.body, belongs_to: topic_slug });
  article
    .save()
    .then(res => {
      res.status(201);
      res.send(res);
    })
    .catch(err => {
      next({ status: 400, msg: 'invalid post request' });
    });
};

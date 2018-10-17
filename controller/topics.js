const { Topic, Article } = require('../models');

exports.getTopics = (req, res, next) => {
  Topic.find()
    .then(topics => {
      res.send({ topics });
    })
    .catch(next);
};

exports.getArtsForTopic = (req, res, next) => {
  const { topic_slug } = req.params;
  Article.find({ belongs_to: topic_slug })
    .then(articles => {
      if (articles.length === 0) return Promise.reject({ status: 404, msg: 'Invalid Param' });
      res.send({ articles });
    })
    .catch(next);
};

exports.addArticleToTopic = (req, res, next) => {
  const { topic_slug } = req.params;
  const article = new Article({ ...req.body, belongs_to: topic_slug });
  article
    .save()
    .then(art => {
      res.status(201);
      res.send(`${art.title} added successfully`);
    })
    .catch(err => {
      next({ status: 400, msg: 'invalid post request' });
    });
};

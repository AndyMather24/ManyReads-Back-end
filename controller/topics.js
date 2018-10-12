const { Topic, Article } = require('../models');

exports.getTopics = (req, res, next) => {
  Topic.find()
    .then(topics => {
      res.send({ topics });
    })
    .catch(next);
};

exports.getArtsForTopic = (req, res, next) => {
  const param = req.params.topic_slug;
  Article.find({ belongs_to: param })
    .then(articles => {
      if (articles.length === 0) return next({ status: 404, msg: 'Invalid Param' });
      res.send({ articles });
    })
    .catch(next);
};

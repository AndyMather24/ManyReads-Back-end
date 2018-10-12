const { Topic, Article } = require('../models');

exports.getTopics = (req, res, next) => {
  Topic.find()
    .then(topics => {
      res.send({ topics });
    })
    .catch(next);
};

exports.getArtsForTopic = (req, res) => {
  const param = req.params.topic_slug;
  Article.find({ belongs_to: param }).then(articles => {
    res.send({ articles });
  });
};

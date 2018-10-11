const { Topic, Article } = require('../models');

exports.getTopics = (req, res) => {
  Topic.find()
    .then(topics => {
      res.send({ topics });
    })
    .catch(console.log);
};

exports.getArticles = (req, res) => {
  Article.find()
    .then(articles => {
      res.send({ articles });
    })
    .catch(console.log);
};

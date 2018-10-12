const { Article } = require('../models');
exports.getArticles = (req, res) => {
  Article.find()
    .then(articles => {
      res.send({ articles });
    })
    .catch(console.log);
};

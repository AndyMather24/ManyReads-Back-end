const { Article } = require('../models');
exports.getArticles = (req, res, next) => {
  Article.find()
    .then(articles => {
      res.send({ articles });
    })
    .catch(next);
};

exports.getArticlesById = (req, res, next) => {
  const param = req.params.article_id;
  Article.findOne({ _id: param })
    .then(article => {
      if (article.length === 0) return next({ status: 404, msg: 'Invalid Param' });
      res.send({ article });
    })
    .catch(next);
};

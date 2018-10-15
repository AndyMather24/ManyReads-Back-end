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
      if (!article) return Promise.reject({ status: 404, msg: 'Invalid Param' });
      res.send({ article });
    })
    .catch(err => {
      if (err.name === 'CastError') next({ status: 400, msg: `${param} is not a valid id` });
      else {
        next(err);
      }
    });
};

exports.changeVote = (req, res, next) => {
  console.log('hi');
};

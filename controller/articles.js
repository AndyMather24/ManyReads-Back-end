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
  const article_id = req.params.article_id;
  const vote = req.query.vote;
  let difference = vote === 'up' ? 1 : -1;
  Article.findOneAndUpdate({ _id: article_id }, { $inc: { votes: difference } }, { new: true }).then(article => {
    res.send(article);
  });
};

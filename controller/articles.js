const { Article, Comment } = require('../models');

exports.getArticles = (req, res, next) => {
  Article.find()
    .then(articles => {
      res.send({ articles });
    })
    .catch(next);
};

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  console.log(article_id);
  return Promise.all([Article.findById({ _id: article_id }), Comment.count({ belongs_to: article_id })])
    .then(([article, comment_Count]) => {
      if (!article) return Promise.reject({ status: 404, msg: 'Invalid Param' });
      res.send({ article, comment_Count });
    })
    .catch(err => {
      if (err.name === 'CastError') next({ status: 400, msg: `${param} is not a valid id` });
      else {
        next(err);
      }
    });
};

exports.changeVote = (req, res, next) => {
  const { article_id } = req.params;
  const { vote } = req.query;
  let difference = vote === 'up' ? 1 : -1;
  Article.findOneAndUpdate({ _id: article_id }, { $inc: { votes: difference } }, { new: true }).then(article => {
    res.send(article);
  });
};

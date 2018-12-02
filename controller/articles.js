const { Article, Comment } = require('../models');

exports.getArticles = (req, res, next) => {
  return Promise.all([Article.find().lean(), Comment.find().lean()])
    .then(([articles, comments]) => {
      const articlesComment = articles.map(article => {
        const comment_count = comments.filter(comment => comment.belongs_to.toString() === article._id.toString()).length;
        return { ...article, comment_count };
      });
      res.send(articlesComment);
    })
    .catch(next);
};

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  Article.findById(article_id)
    .lean()
    .populate('created_by')
    .then(article => {
      if (!article) return Promise.reject({ status: 404, msg: 'Invalid Param' });
      return Promise.all([Comment.find({ belongs_to: article._id }), article]);
    })
    .then(([comments, articles]) => {
      const comment_count = comments.length;
      res.send({ ...articles, comment_count });
    })
    .catch(next);
};

exports.changeVote = (req, res, next) => {
  const { article_id } = req.params;
  const { vote } = req.query;
  let difference = vote === 'up' ? 1 : -1;
  Article.findOneAndUpdate({ _id: article_id }, { $inc: { votes: difference } }, { new: true }).then(article => {
    res.send(article);
  });
};

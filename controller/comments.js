const { Comment } = require('../models');
exports.getArticleComments = (req, res, next) => {
  const param = req.params.article_id;
  Comment.find({ belongs_to: param }).then(comments => {
    res.send({ comments });
  });
};

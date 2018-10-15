const { Comment } = require('../models');
exports.getArticleComments = (req, res, next) => {
  const param = req.params.article_id;
  Comment.find({ belongs_to: param }).then(comments => {
    res.send({ comments });
  });
};
exports.addArticleComment = (req, res, next) => {
  const article_id = req.params.article_id;
  const comment = new Comment({ ...req.body, belongs_to: `${article_id}` });
  comment
    .save()
    .then(comment => {
      res.status(201);
      res.send(`${comment}`);
    })
    .catch(err => {
      next({ status: 400, msg: 'invalid post request' });
    });
};

exports.deleteComment = (req, res, next) => {
  const comment_id = req.params.comment_id;
  Comment.findByIdAndDelete(comment_id)
    .then(comment => {
      if (!comment) return Promise.reject({ status: 404, msg: 'Comment not found with id ' + comment_id });
      else {
        res.send({ msg: `comment ${comment_id} deleted ` });
      }
    })
    .catch(err => {
      next(err);
    });
};
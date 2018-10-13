const { Comment } = require('../models');
exports.getArticleComments = (req, res, next) => {
  const param = req.params.article_id;
  Comment.find({ belongs_to: param }).then(comments => {
    res.send({ comments });
  });
};
exports.addArticleComment = (req, res, next) => {
  const article_id = req.params.article_id;
  console.log(req.body);
  const comment = new Comment({ ...req.body, belongs_to: `${article_id}` });
  comment
    .save()
    .then(comment => {
      console.log(comment);
      res.json(`comment ${comment._id} added successfully`);
    })
    .catch(err => {
      next({ status: 400, msg: 'invalid post request' });
    });
};

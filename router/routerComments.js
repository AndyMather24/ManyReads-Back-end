const routerComments = require('express').Router();
const { changeVoteComments, deleteComment } = require('../controller/.')


routerComments
    .route('/:comment_id')
    .patch(changeVoteComments)
    .delete(deleteComment)

module.exports = routerComments;


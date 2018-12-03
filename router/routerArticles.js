const routerArticles = require('express').Router();
const {
    getArticles,
    getArticlesById,
    changeVote,
    getArticleComments,
    addArticleComment

} = require('../controller/index');
routerArticles
    .route('/')
    .get(getArticles)

routerArticles
    .route('/:article_id')
    .get(getArticlesById)
    .patch(changeVote)

routerArticles
    .route('/:article_id/comments')
    .get(getArticleComments)
    .post(addArticleComment)

module.exports = routerArticles;
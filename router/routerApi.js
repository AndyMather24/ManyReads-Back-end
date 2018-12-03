const routerApi = require('express').Router();
const { routerArticles, routerComments, routerUser, routerTopic } = require('./index')
const { getHomepage } = require('../controller/index')

// home page
routerApi.get('/', getHomepage);

routerApi
    .use('/articles', routerArticles)
    .use('/comments', routerComments)
    .use('/topics', routerTopic)
    .use('/users', routerUser)

module.exports = routerApi;

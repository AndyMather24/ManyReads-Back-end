
const routerTopic = require('express').Router();
const { getTopics, getArtsForTopic, addArticleToTopic } = require('../controller/.')

routerTopic.get('/', getTopics)

routerTopic
    .route('/:topic_slug/articles')
    .get(getArtsForTopic)
    .post(addArticleToTopic)

module.exports = routerTopic;



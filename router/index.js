const router = require('express').Router();

const { getTopics, getArticles } = require('../controller');

router.route('/topics').get(getTopics);
router.route('/articles').get(getArticles);

module.exports = router;

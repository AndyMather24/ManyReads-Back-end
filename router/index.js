const router = require('express').Router();

const { getTopics } = require('../controller');

router.route('/topics').get(getTopics);

module.exports = router;

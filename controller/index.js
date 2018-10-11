const { Topic } = require('../models');

exports.getTopics = (req, res) => {
  Topic.find()
    .then(topics => {
      res.send({ topics });
    })
    .catch(console.log);
};

const { User } = require('../models');

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  User.findOne({ username }).then(user => {
    res.send({ user });
  });
};

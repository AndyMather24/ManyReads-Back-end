const { User } = require('../models');

exports.getUserByUsername = (req, res, next) => {
  const param = req.params.username;
  User.findOne({ username: param }).then(user => {
    res.send({ user });
  });
};

const routerUser = require('express').Router();
const { getUserByUsername } = require('../controller/index')

routerUser.get('/:username', getUserByUsername)

module.exports = routerUser;


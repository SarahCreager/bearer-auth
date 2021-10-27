'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js')
// const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { next('No auth header in POST request'); }

  let encodedUserPass = req.headers.authorization.split(' ')[1];
  let decodedUserPass = base64.decode(encodedUserPass);
  let [username, password] = decodedUserPass.split(':');
  try {
    req.user = await users.authenticateBasic(username, password)
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }

}


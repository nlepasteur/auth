const express = require('express');
const Joi = require('@hapi/joi');

const db = require('../db/connection');
const users = db.get('users');
// const users = client.db('auth-for-noobs').collection('users');
users.createIndex('username', { unique: true });
// (async function () {
//   await users.createIndex('username');
// })();

const schema = Joi.object({
  username: Joi.string()
    .regex(/(^[a-zA-Z0-9_]*$)/)
    .min(2)
    .max(30)
    .required(),
  password: Joi.string().min(6).required(),
});

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'res from auth router',
  });
});

router.post('/signup', (req, res) => {
  createIndexes('usernames');
  console.log('enter post signup middleware');
  const result = schema.validate(req.body);
  //const { error, value } = schema.validate(req.body);

  res.json(result);
});

module.exports = router;

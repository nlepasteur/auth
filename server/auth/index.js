const express = require('express');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');

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
  password: Joi.string().trim().min(6).required(),
});

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'res from auth router',
  });
});

router.post('/signup', async (req, res, next) => {
  console.log('enter post signup middleware');
  const result = schema.validate(req.body);
  //const { error, value } = schema.validate(req.body);
  if (Object.keys(result).length == 1) {
    const user = await users.findOne({ username: req.body.username });
    if (!user) {
      const hashedPassword = await bcrypt.hash(req.body.password, 12);

      const newUser = {
        username: req.body.username,
        password: hashedPassword,
      };

      const insertedUser = await users.insert(newUser);
      delete newUser.password;
      res.json(insertedUser);

      // res.json({ hashedPassword }); // res.json({ hashedPassword }); // retenir cette syntaxe qui revient à écrire { hashedPassword: hashedPassword }
    } else {
      const error = new Error('This username already exists');
      next(error);
    }
    // res.json({ user }); // retenir cette syntaxe qui revient à écrire { user: user }
    // res.json(result);
  } else {
    next(result.error);
  }
});

module.exports = router;

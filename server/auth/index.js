const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'res from auth router',
  });
});

router.post('/signup', (req, res) => {
  console.log('body: ', req.body);
  res.json({
    message: 'res from auth signup',
  });
});

module.exports = router;

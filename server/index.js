const express = require('express');
const morgan = require('morgan');
// const volleyball = require("volleyball")

const app = express();
const auth = require('./auth');

app.use(morgan('dev'));
app.use(express.json());
// app.use(volleyball());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello everybody!!!',
  });
});

app.use('/auth', auth);

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`Not found - ${req.originalUrl}`);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack,
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

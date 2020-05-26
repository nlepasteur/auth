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
  console.log('enter notFound middleware');
  res.status(404); // peut-être intérêt de mettre en paras res alors que peut retourner res sans indication venant e la requête réside dans le faitde passer ce res lors des next() et / ou car implémentation est comme ça point
  const error = new Error(`Not found - ${req.originalUrl}`);
  console.log('error created just before next(error) :', error);
  next(error);
}

function errorHandler(err, req, res, next) {
  console.log('enter errorHandler middleware, error is :', err);
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

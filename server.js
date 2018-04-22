const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

// initialize express app
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// configure passport
const passport = require('passport');
const expressSession = require('express-session');
app.use(expressSession({
  secret: 'abc123',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// initialize passport
const initPassport = require('./passport');
initPassport(passport);

// routes
const index = express.Router();
require('./routes/index')(index, passport)
app.use('/', index);

const user = express.Router();
require('./routes/user')(user)
app.use('/user', user);

// port config
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;

// SAMPLE PG QUERY
// const { Pool, Client } = require('pg')
// const PGUSER = 'alan'
// const PGDATABASE = 'example'
// const age = 732
//
// const config = {
//   user: PGUSER, // name of the user account
//   database: PGDATABASE, // name of the database
//   max: 10, // max number of clients in the pool
//   idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
// }
//
// const pool = new Pool(config)
//
// app.get('/', (req, res, next) => {
//   pool.connect(function (err, client, done) {
//     if (err) console.log(err)
//
//     // example query
//     client.query('SELECT * from numbers WHERE age = 732', function (err, result) {
//       if (err) {
//         console.log(err)
//       }
//       res.send(result.rows[0])
//     })
//   })
// });

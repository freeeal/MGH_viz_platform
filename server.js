const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

// const db = require('./db/index');

// const mountRoutes = require('./routes');
// mountRoutes(app);

app.get('/api/hello', (req, res) => {
  res.send({ express: 'this is the app' });
});

const { Pool, Client } = require('pg')
const PGUSER = 'alan'
const PGDATABASE = 'example'
const age = 732

const config = {
  user: PGUSER, // name of the user account
  database: PGDATABASE, // name of the database
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
}

const pool = new Pool(config)

app.get('/', (req, res, next) => {
  pool.connect(function (err, client, done) {
    if (err) console.log(err)

    // example query
    client.query('SELECT * from numbers WHERE age = 732', function (err, result) {
      if (err) {
        console.log(err)
      }
      res.send(result.rows[0])
    })
  })
});

app.listen(port, () => console.log(`Listening on port ${port}`));

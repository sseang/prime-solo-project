const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// Setup a GET route to get all the creatures from the database
router.get('/', (req, res) => {
  // When you fetch all things in these GET routes, strongly encourage ORDER BY
  // so that things always come back in a consistent order
  const sqlText = `SELECT * FROM "images" ORDER BY "path" DESC;`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500); // Good server always responds
    });
});

// Setup a POST route to add a new creature to the database
router.post('/', (req, res) => {
  const { path } = req.body;
  const sqlText = `INSERT INTO "images" ("path")
                     VALUES ($1)`;
  // Let sql sanitize your inputs (NO Bobby Drop Tables here!)
  // the $1, $2, etc get substituted with the values from the array below
  pool
    .query(sqlText, [path])
    .then((result) => {
      console.log(`Added image to the database`, path);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500); // Good server always responds
    });
});

module.exports = router;

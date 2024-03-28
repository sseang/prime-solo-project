const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const axios = require('axios');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
/**
 * GET route template
 */
router.get('/:id', rejectUnauthenticated, (req, res) => {
  //confirm in the function
  console.log('In the GET GENRES function!');

  const genresId = req.params.id;
  //confirm data
  console.log('GENRES ID!:', genresId);
  // GET route code here
  const queryText = `SELECT "genres"."name" AS "Genre", "anime"."id", "anime"."title", "anime"."poster" FROM "genres"
  JOIN "anime_genres" ON "genres"."id"= "anime_genres"."genre_id"
  JOIN "anime" ON "anime_genres"."anime_id" = "anime"."id"
  WHERE "genres"."id" = $1
  ORDER BY "anime"."title" ASC;
  ;`;
  //needed to specify "genres" above
  pool
    //pass params
    .query(queryText, [genresId])
    //able to get genre data
    //.query(queryText)

    //success and return

    .then((result) => {
      //confirm and label data
      console.log('Genres RESULTS:', result);
      res.send(result.rows);
    })
    //catch errors

    .catch((err) => {
      console.log('Error in GET /api/GENRES/:id', err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;

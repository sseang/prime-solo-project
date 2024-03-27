const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
  // GET route code here
  const queryText = `SELECT  "watchlist"."user_id", "user"."username", "anime"."title", "anime"."poster", "watchlist"."isWatched", "watchlist"."isLiked" FROM "anime"
  JOIN "watchlist" ON "anime"."id" = "watchlist"."animeList_id"
  JOIN "user" ON "watchlist"."user_id" = "user"."id"
  WHERE "user"."id" = $1
  ORDER BY "user_id";
  ;`;
  //needed to specify "anime" above
  pool
    //pass params
    .query(queryText, [req.params.id])
    //able to get genre data
    //.query(queryText)

    //success and return

    .then((result) => {
      res.send(result.rows);
    })
    //catch errors

    .catch((err) => {
      console.log('Error in GET /api/WATCHLIST/:id', err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

//TODO- DELETE route
router.delete('/:id', (req, res) => {
  //confirm in the function
  console.log('In the DELETE watchlist!');

  const watchlistId = req.params.id;
  //confirm data
  console.log('WATCHLIST ID!:', watchlistId);

  const queryText = `DELETE FROM "watchlist" WHERE "id" = $1;`;

  pool
    .query(queryText, [watchlistId])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});
//TODO- PUT route

module.exports = router;

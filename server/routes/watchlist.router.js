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
  console.log('In the GET watchList function!');
  console.log('REQ', req.params);

  // GET route code here
  const queryText = `SELECT  "watchlist"."id", "watchlist"."user_id", "user"."username", "anime"."title", "anime"."poster", "watchlist"."isWatched", "watchlist"."isLiked" FROM "anime"
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

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  //confirm in the function
  console.log('In the DELETE watchlist function!');

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
router.put('/:id', rejectUnauthenticated, (req, res, next) => {
  //confirm in the function
  console.log('In the UPDATE watchlist function!');
  const watchlistId = req.params.id;
  const sqlData = req.body;
  //comfirm data
  console.log(watchlistId);
  console.log(sqlData);

  const queryText = `UPDATE "watchlist" SET "isWatched" = TRUE WHERE "id" = $1;`;
  const queryText2 = `UPDATE "watchlist" SET "isLiked" = TRUE WHERE "id" = $1;`;

  pool
    .query(queryText, [watchlistId])
    .then((isWatchedResponse) => {
      //confirm and label data
      console.log('isWatched RESULTS:', sqlData);
      pool
        .query(queryText2, [watchlistId])
        .then((isLikedResponse) => {
          //confirm and label data
          console.log('isliked RESULTS:', watchlistId);
          res.sendStatus(201);
        })
        .catch((err) => {
          console.log('OH NO!!! isWatched failed!: ', err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log('OH NO!!! isLiked failed!: ', err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res, next) => {
  // POST route code here
  //confirm in the function
  console.log('In the POST watchlist function!');
  //const userId = req.params.id;
  const sqlData = req.body;
  //comfirm data
  //console.log('USER', userId);
  console.log('Body', sqlData);

  const queryText = `INSERT INTO "watchlist" ("user_id", "animeList_id")
  VALUES ($1, $2)
  RETURNING "id";`;

  const queryArgs = [sqlData.user_id, sqlData.animeList_id];

  pool
    .query(queryText, [req.body.user_id, req.body.animeList_id])
    .then((isWatchedResponse) => {
      //confirm and label data
      console.log('POSTED Watchlist:', isWatchedResponse);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('OH NO!!! POST failed!: ', err);
      res.sendStatus(500);
    });
});

module.exports = router;

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
//TODO-STRETCH 3rd party API
// const clientData = require('../modules/clientData');

const axios = require('axios');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const queryText = `
  SELECT * FROM "anime"
  ORDER BY "title" ASC;
`;
  pool
    .query(queryText)
    .then((result) => {
      //confirm and label data
      console.log('ALL ANIME RESULTS:', result);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('ERROR: Get ALL anime', err);
      res.sendStatus(500);
    });
});

//GET for SEARCH anime
router.get('/search', rejectUnauthenticated, (req, res) => {
  // GET route code here

  //confirm in the function
  console.log('In the GET search function!');
  const sqlData = req.body;
  console.log('DATA', sqlData);
  console.log(req.query);
  console.log(req.query.q);
  console.log(req.query.p);
  let queryText;
  if (!req.query.q) {
    queryText = `SELECT * FROM "anime"
 `;
  } else {
    // queryText = `SELECT * FROM "anime"
    // ;`;
    queryText = `SELECT * FROM "anime"
     WHERE "title" = $1;`;
    console.log('query text:', queryText);
  }

  pool
    //.query(queryText)
    .query(queryText, [req.query.q])

    .then((result) => {
      //confirm and label data
      console.log('ANIME RESULTS:', result);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('ERROR: Get SEARCH anime', err);
      res.sendStatus(500);
    });
});

//GET route for TOP Rated Anime
router.get('/top', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const queryText = `
  SELECT COUNT("watchlist"."isLiked") AS "TOP Rated Anime", "anime"."id", "anime"."title", "anime"."poster" FROM "anime"
  JOIN "watchlist" ON "anime"."id" = "watchlist"."animeList_id"
  GROUP BY "anime"."id" 
  ORDER BY "TOP Rated Anime" DESC LIMIT 5
`;
  pool
    .query(queryText)
    .then((result) => {
      //confirm and label data
      console.log('TOP Rated ANIME RESULTS:', result);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('ERROR: Get TOP anime', err);
      res.sendStatus(500);
    });
});

//GET route for DetailPage SAGA
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT "anime"."title", string_agg("genres"."name", ', ') AS "Genres", "anime"."description", "anime"."poster", "anime"."director", "anime"."year_published"  
  FROM "genres"
  JOIN "anime_genres" ON "genres"."id"= "anime_genres"."genre_id"
  JOIN "anime" ON "anime_genres"."anime_id" = "anime"."id"
  WHERE "anime"."id" =$1
  GROUP BY "anime"."id";
  ;`;
  //needed to specify "anime" above
  pool
    //pass params
    .query(queryText, [req.params.id])
    //able to get genre data
    //.query(queryText)

    //success and return

    .then((result) => {
      res.send(result.rows[0]);
    })
    //catch errors

    .catch((err) => {
      console.log('Error in GET /api/anime/:id', err);
      res.sendStatus(500);
    });
});

//POST route template

router.post('/', (req, res) => {});

//TODO: STRETCH Goal incorporate API in to solo
// router.post('/', (req, res) => {
//   var query = `

//   query ($id: Int, $page: Int, $perPage: Int) {
//     Page (page: $page, perPage: $perPage) {
//       pageInfo {
//          total
//           perPage
//           currentPage
//           lastPage
//           hasNextPage
//       }
//     media (id: $id,  type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
//      id
//       title {
//         romaji
//         english}
//       }
//     }
//   }

//   `;

//   // Define our query variables and values that will be used in the query request
//   var variables = {
//     id: 15125,
//   };

//   // Define the config we'll need for our Api request
//   var url = 'https://graphql.anilist.co',
//     options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//       },
//       body: JSON.stringify({
//         query: query,
//         variables: variables,
//       }),
//     };

//   // Make the HTTP Api request
//   fetch(url, options).then(handleResponse).then(handleData).catch(handleError);

//   function handleResponse(response) {
//     return response.json().then(function (json) {
//       return response.ok ? json : Promise.reject(json);
//     });
//   }

//   function handleData(data) {
//     console.log(data);
//     res.send(data);
//   }

//   function handleError(error) {
//     alert('Error, check console');
//     console.error(error);
//     res.sendStatus(500);
//   }
// });
module.exports = router;

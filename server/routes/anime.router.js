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
router.get('/', (req, res) => {
  // GET route code here
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

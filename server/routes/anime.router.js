const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  // Here we define our query as a multi-line string
  // Storing it in a separate .graphql/.gql file is also possible
  //{ # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
  //{ # Define which variables will be used in the query (id)
  var query = `
  query ($id: Int) 
    Media (id: $id, type: ANIME) 
    id
    title {
      romaji
      english
      native
    }
  }
}
`;

  // Define our query variables and values that will be used in the query request
  var variables = {
    id: 15125,
  };

  // Define the config we'll need for our Api request
  var url = 'https://graphql.anilist.co',
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

  // Make the HTTP Api request
  fetch(url, options).then(handleResponse).then(handleData).catch(handleError);

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  function handleData(data) {
    console.log(data);
  }

  function handleError(error) {
    alert('Error, check console');
    console.error(error);
  }
});

module.exports = router;

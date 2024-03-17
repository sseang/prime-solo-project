const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const clientData = require('../modules/clientData');
const axios = require('axios');
/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

const BASE_URL_ANIME = 'anilist.co/api/v2/oauth/authorize';

/**
 * POST route template
 */
router.post('/', (req, res) => {
  const { searchTerm } = req.body;
  // What to do???
  axios
    .get(
      'https://anilist.co/api/v2/oauth/authorize?client_id=' +
        clientData.clientId +
        '&redirect_uri=' +
        clientData.redirectUri +
        '&response_type=code'
    )
    .then((aniListResponse) => {
      console.log('SUCCESS', aniListResponse.data);
      const simpleResults = aniListResponse.data.data;
      //   return {
      //     id: animeData.id,
      //     url: animeData.images.original.url,
      //     alt: animeData.title,
      //   };
      // });
      res.send(simpleResults);
    })
    .catch((error) => {
      console.log('ERROR:', error);
      res.sendStatus(500);
    });
});

module.exports = router;

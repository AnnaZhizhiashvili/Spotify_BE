const express = require('express');
const router = express.Router();
const {getArtists, search, getGenres, getArtistsTracks, searchTrack } = require('../controllers/controllers');


router.get('/artist/:id/tracks', getArtistsTracks);

router.get('/artists', getArtists)

router.get('/search', search);


router.get('/genres', getGenres);

router.get('/track/:id', searchTrack);


module.exports = router;
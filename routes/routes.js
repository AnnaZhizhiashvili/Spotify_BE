const express = require('express');
const router = express.Router();
const {getArtists, search, getGenres, getArtistsTracks, searchTrack, getArtist, getTrack } = require('../controllers/controllers');


router.get('/artist/:id/tracks', getArtistsTracks);

router.get('/artists', getArtists)

router.get('/search', search);


router.get('/genres', getGenres);

// router.get('/track/:id', searchTrack);
router.get('/track/:id', getTrack);


// Deezer
router.get('/artist/:id', getArtist)


module.exports = router;
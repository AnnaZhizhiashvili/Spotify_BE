const express = require('express');
const router = express.Router();
const {getArtists, search, getGenres } = require('../controllers/controllers');



router.get('/artists', getArtists)

router.get('/search', search);


router.get('/genres', getGenres);

module.exports = router;
const express = require('express');
const router = express.Router();
const {getArtists, search} = require('../controllers/controllers');



router.get('/artists', getArtists)

router.get('/search', search);

module.exports = router;
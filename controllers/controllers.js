const axios = require('axios');
const AppError = require('../utils/appError');


exports.getArtists = async (req, res, next) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/artists?ids=1Xyo4u8uXC1ZmMpatF05PJ,7Ln80lUS6He07XvHI8qqHH,5K4W6rqBFWDnAN6FQUkS6x,00FQb4jTyendYWaN8pK0wa,7dGJo4pcD2V6oG8kP0tJRR,2YZyLoL8N0Wb9xBt1NhZWg', {
            headers: {
                'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
            }
        })
        res.json(response.data.artists)
    } catch (error) {
        next(new AppError('Could not get artists', 400))
    }
}

exports.search = async (req, res, next) => {
    try {
        let url = `https://api.spotify.com/v1/search?q=${req.query.q}&limit=9`
        if (req.query.type !== undefined) {
            url += `&type=${req.query.type}`
        } else {
            url += `&type=track,playlist,artist,show,episode,audiobook,album`
        }
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
            }
        })
        res.json(response.data)
    } catch (error) {
        next(new AppError('Could not get searched items', 400))
    }
}

exports.getGenres = async (req, res, next) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
            headers: {
                'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
            }
        })
        res.json(response.data)
    } catch (error) {
        next(new AppError('Could not get categories', 400))
    }
}

exports.getArtistsTracks = async (req, res, next) => {
    const  url = `https://api.spotify.com/v1/artists/${req.params.id}/top-tracks?market=GE&limit=1`
    try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
                }
            })
            res.json(response.data)
        } catch (error) {
            next(new AppError('Could not get categories', 400))
        }
}


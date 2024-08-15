const axios = require('axios');
const AppError = require('../utils/appError');


// exports.getArtists = async (req, res, next) => {
//     try {
//         const response = await axios.get('https://api.spotify.com/v1/artists?ids=1Xyo4u8uXC1ZmMpatF05PJ,7Ln80lUS6He07XvHI8qqHH,5K4W6rqBFWDnAN6FQUkS6x,00FQb4jTyendYWaN8pK0wa,7dGJo4pcD2V6oG8kP0tJRR,2YZyLoL8N0Wb9xBt1NhZWg', {
//             headers: {
//                 'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
//             }
//         })
//         res.json(response.data.artists)
//     } catch (error) {
//         next(new AppError('Could not get artists', 400))
//     }
// }


exports.getArtists = async (req, res, next) => {
    try {
        const [res1, res2] = await Promise.all([
            axios.get(`https://api.deezer.com/artist/1424821`, {
                headers: {
                    'x-rapidapi-key': 'fe03870554msh30967ab49123fe4p143301jsn5cd2b123806b',
                    'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
                }
            }),
            axios.get(`https://api.deezer.com/artist/997 `, {
                headers: {
                    'x-rapidapi-key': 'fe03870554msh30967ab49123fe4p143301jsn5cd2b123806b',
                    'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
                }
            })
        ]

    )
        res.json([
            { artistData: res1.data },
            { artistData: res2.data }
            ]);
    } catch (error) {
        next(new AppError('Could not get artist from Deezer', 400));
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

// exports.searchTrack = async (req, res, next) => {
//     try {
//         let url = `https://api.spotify.com/v1/search?q=${req.params.id}&limit=1&type=track&market=GE`
//         const response = await axios.get(url, {
//             headers: {
//                 'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
//             }
//         })
//         console.log(response.data.tracks.items[0])
//         res.json(response.data)
//     } catch (error) {
//         next(new AppError('Could not get searched items', 400))
//     }
// }

exports.getTrack = async (req, res, next) => {
    try {
        const response = await axios.get(`https://api.deezer.com/track/${req.params.id}`, {
            headers: {
                'x-rapidapi-key': 'fe03870554msh30967ab49123fe4p143301jsn5cd2b123806b',
                'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
            }
        })
        res.json(response.data);
    } catch (error) {
        next(new AppError('Could not get track from Deezer', 400));
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

// exports.getArtistsTracks = async (req, res, next) => {
//     const  url = `https://api.spotify.com/v1/artists/${req.params.id}/top-tracks?market=GE&limit=1`
//     try {
//             const response = await axios.get(url, {
//                 headers: {
//                     'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
//                 }
//             })
//             res.json(response.data)
//         } catch (error) {
//             next(new AppError('Could not get categories', 400))
//         }
// }

exports.getArtistsTracks = async (req, res, next) => {
    const url = `https://api.deezer.com/artist/${req.params.id}/top?limit=50`
        try {
            const response = await axios.get(url)
            res.json(response.data)
        } catch (error) {
            next(new AppError('Could not get categories', 400))
        }
}

// exports.getTrack = async (req, res, next) => {
//     const  url = `https://api.spotify.com/v1/tracks/${req.params.id}`
//     try {
//             const response = await axios.get(url, {
//                 headers: {
//                     'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
//                 }
//             })
//             res.json(response.data)
//         } catch (error) {
//             next(new AppError('Could not get categories', 400))
//         }
// }

exports.getTrack = async (req, res, next) => {
    const url = `https://api.deezer.com/track/${req.params.id}`
        try {
            const response = await axios.get(url)
            res.json(response.data)
        } catch (error) {
            next(new AppError('Could not get categories', 400))
        }
}

// Deezer

exports.getArtist = async (req, res, next) => {
    try {
        const response = await axios.get(`https://api.deezer.com/artist/${req.params.id}/top?limit=50`, {
            headers: {
                'x-rapidapi-key': 'fe03870554msh30967ab49123fe4p143301jsn5cd2b123806b',
                'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
            }
        });
        res.json(response.data);
    } catch (error) {
        next(new AppError('Could not get artist from Deezer', 400));
    }
};
const express = require('express')
const dotenv = require('dotenv')
const app = express()
const axios = require('axios');
const cors = require('cors');
app.use(cors());
const CLIENT_ID = '5382c98f2fdc4881be8756724464705d'
const CLIENT_SECRET = 'b029ec4fa552484da923c88dd288766f'
let access_token = undefined;

const http = require('http');

app.use(express.json());

const authenticateToken  = function (req, res, next) {
    req.headers['Authorization'] = `Bearer ${access_token}`;
    next()
}
app.use(authenticateToken);

const getAccessToken = async() => {
    const requestBody = `grant_type=client_credentials&client_id=${encodeURIComponent(CLIENT_ID)}&client_secret=${encodeURIComponent(CLIENT_SECRET)}`;
    const response = await axios.post('https://accounts.spotify.com/api/token',
        requestBody, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        access_token = response.data.access_token;
    console.log(access_token)
}

getAccessToken().then().catch(err => console.log(err))

setInterval(async () => {
    try {
        getAccessToken().then()
    } catch (error) {
        console.error('Error while requesting access token:', error);
    }

}, 3600000 )
    app.get('/get-access-token', async (req, res) => {
        try {
            console.log("jeree")
            const resp = await axios.get('https://api.spotify.com/v1/me/shows?offset=0&limit=20')
            console.log(resp)
        } catch (error) {
            console.log(error)

        }
});

app.get('/artists', async (req, res) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/artists?ids=1Xyo4u8uXC1ZmMpatF05PJ,7Ln80lUS6He07XvHI8qqHH,5K4W6rqBFWDnAN6FQUkS6x,00FQb4jTyendYWaN8pK0wa,7dGJo4pcD2V6oG8kP0tJRR,2YZyLoL8N0Wb9xBt1NhZWg', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        console.log(response)
        res.json(response.data.artists)
    } catch (error) {
        console.log(error)
    }
})

app.get('/search', async (req, res) => {
    try {
        let url = `https://api.spotify.com/v1/search?q=${req.query.q}&limit=9`
        console.log(typeof req.query.type,req.query.type )
        if (req.query.type !== undefined) {
            console.log('if')
            url += `&type=${req.query.type}`
        } else {
            url += `&type=track,playlist,artist,show,episode,audiobook,album`
            console.log('else', url)

        }
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        res.json(response.data)
    } catch (error) {
        console.log(error)
    }
})


app.listen(3200, () => {
    console.log('runnig')
})
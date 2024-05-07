const axios = require('axios');

const getAccessToken = async() => {
    const requestBody = `grant_type=client_credentials&client_id=${encodeURIComponent(process.env.CLIENT_ID)}&client_secret=${encodeURIComponent(process.env.CLIENT_SECRET)}`;
    console.log(requestBody)
    const response = await axios.post('https://accounts.spotify.com/api/token',
        requestBody, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    process.env.ACCESS_TOKEN = response.data.access_token;
    console.log(process.env.ACCESS_TOKEN)
}
 module.exports = getAccessToken;
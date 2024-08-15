const express = require('express')
const app = express();
const globalErrorHandler = require('./controllers/errorController');
require('dotenv').config()
const cors = require('cors');
app.use(cors());
const router = require('./routes/routes')
// const getAccessToken  = require('./utils/spotifyAuth')

app.use(express.json());

const authenticateToken  = function (req, res, next) {
    req.headers['Authorization'] = `Bearer ${process.env.ACCESS_TOKEN}`;
    next()
}
app.use(authenticateToken);



// getAccessToken().then().catch(err => console.log(err))

// setInterval(async () => {
//     try {
//         getAccessToken().then()
//     } catch (error) {
//         console.error('Error while requesting access token:', error);
//     }
//
// }, 3600000 )


app.use('/api/v1', router);


app.all('*', (req, res, next) => {
    next() // when Express receives an argument in next, it assumes it's an error'
})

app.use(globalErrorHandler)

app.listen(3200, () => {
    console.log('running on port 3200')
})
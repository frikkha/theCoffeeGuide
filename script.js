const https = require('https');
const searchWord= 'Espresso%20Martini';
const APP_ID = '5ce99567';
const APP_KEY = '0a1c299d062681dae9525e3ac678ccd6';

// https://￿￿api.edamam.com/search?q=${searchWord}&app_id=${APP_ID}&app_key=${APP_KEY}
// https://￿￿api.edamam.com/search?q=Espresso+Martini&app_id=5ce99567&app_key=0a1c299d062681dae9525e3ac678ccd6

/*
https.get(`https://￿￿api.edamam.com/search?q=${searchWord}&app_id=${APP_ID}&app_key=${APP_KEY}`, (res) => {
    let data = [];
    // A chunk of data has been recieved.
    res.on('data', (chunk) => {
        data.push(chunk);
    });

    // The whole response has been received. Print out the result.
    res.on('end', () => {
        let body = Buffer.concat(data);
        console.log(body.toString());
    });
}).on("error", (err) => {
    console.log("Error: " + err);
});

const req = https.request({
    method: 'GET',
    hostname: '￿￿api.edamam.com',
    port: 80,
    path: '/search?q=Espresso+Martini&app_id=5ce99567&app_key=0a1c299d062681dae9525e3ac678ccd6',

}, function (res) {
    let data = [];

    res.on('data', function (d) {
        data.push(d);
    });

    res.once('end', function () {
        console.log('data => ', data);
    });
});

req.end();

 */

const bodyParser = require('body-parser');
const express = require('express');
const router = express();
router.use(bodyParser.json());
const port = process.env.PORT || 5000;
router.listen(port, () => console.log(`Server started on port ${port}`));

// Coffee Model
router.get('https://￿￿api.edamam.com/search?q=Espresso+Martini&app_id=5ce99567&app_key=0a1c299d062681dae9525e3ac678ccd6', (req, res) => {
    console.log('Request sent');
    console.log(res);
});



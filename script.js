// ************ Create server and connect to the database **************

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(function (req, res, next) {
    res.header("Content-Type",'application/json');
    next();
});
// Add headers
app.use(function (req, res, next) {

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

    res.header("content-type",'x-www-form-urlencoded');
    // Pass to next layer of middleware
    next();
});

//Bodyparser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = require('./config/keys').mongoURI;

// Connect to MongoDB

mongoose
    .connect(db)
    .then( () => {console.log('MongoDB Connected...')})
    .catch( err => console.log(err + ' :('));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));



// *********** Retrieve items from the API ******************

const apiURL = "https://api.edamam.com/search?q=";
const apiKey = "&app_key=0a1c299d062681dae9525e3ac678ccd6";
const apiId = "&app_id=5ce99567";
const word = 'Espresso Martini';
const axios = require('axios');

// https://￿￿api.edamam.com/search?q=${searchWord}&app_id=${APP_ID}&app_key=${APP_KEY}
// https://￿￿api.edamam.com/search?q=Espresso+Martini&app_id=5ce99567&app_key=0a1c299d062681dae9525e3ac678ccd6


// This function is working as it should.
const fetchCoffee = async (searchWord) => {
    const url = `${apiURL}${searchWord}${apiId}${apiKey}`;
    const result = await axios.get(url).then((res) => {
        let matches = res.data;
        let exactMatch = ':(';
        for (let i = 0; i < matches.hits.length; i++) {
            let label = matches.hits[i].recipe.label;
            if (searchWord.match(label)) {
                exactMatch = formatItem(matches.hits[i]);
                break
            }
        }
        return exactMatch
    }).catch(err => {console.log(err)});
    console.log('From Edamam: ' + result);
    return result
};

const formatItem = (item) => {
    let formattedItem = {
        Name: item.recipe.label,
        ImagePath: item.recipe.image,
        Content: item.recipe.ingredientLines
    };
    return formattedItem
};

// ************* Post to MongoDB after retrieving from API *****************
const Coffee = require('./models/Coffee.js');

const postItem = async (search) => {
    const item = await fetchCoffee(search);
    console.log('The fetchedItem is :', item);
    const post =  await axios.post('http://localhost:5000/', item)
        .then(res => {
            console.log(res)
        })
        .catch(err => { console.log("Error i Axios: " + err)});
};

app.post('/', (req, res) => {
    const newCoffee = new Coffee({
        Name: req.body.Name,
        ImagePath: req.body.ImagePath,
        Content: req.body.Content,
        Hits: 0
    });
    console.log(' The new Item is: ' +newCoffee);
    newCoffee.save().then(coffee => res.json('The item added successfully: ' + coffee)).catch(err => {console.log('Error: ' +err)});
});

items = ['Vietnamese Ice Coffee',
'Thai Iced Coffee',
'Mocha Latte',
'Hot Peppermint Mocha',
'Espresso Frappe',
'Vanilla Bean Iced Coffee',
'Chocolate Espresso Bellini',
'Baileys Espresso Martini',
'Baileys Spiced Coffee',
'Mocha Latte',
'Irish Coffee',
'Espresso Martini']

for ( let i = 0; i < items.length; i++) {
    postItem(items[i]).then(() => console.log("Made it ")).catch(err => {
        console.log("Erroreruuuud: " + err)
    });
}
const express = require('express');
const router = express.Router();

// Coffee Model
const Coffee = require('../../models/coffee.js');

// @route GET api/coffee
// @desc Get all coffees

router.get('/', (req, res) => {
    Coffee.find()
        .then( coffees =>
        {   console.log('Request sent');
            res.json(coffees);
        })
});


// @route GET api/coffee/q=name
// @desc Get all coffees that matches the  string

router.get('/q=name', (req, res) => {
    Coffee.find({Name : new RegExp(req.params.name, 'i')})
        .then(player => res.json(player))
        .catch(err => res.status(404).json())
});


// @route GET api/coffee/:id
// @desc Get coffee that matches id

router.get('/q=id');

// @route GET api/coffee/:i
// @desc Get all coffees that has i as ingredient

router.get('/q=i');

module.exports = router;
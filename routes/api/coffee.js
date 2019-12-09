const express = require('express');
const router = express.Router();

// Coffee Model
const Coffee = require('../../models/Coffee.js');

// @route GET api/coffee
// @desc Get all coffees

router.get('/', (req, res) => {
    Coffee.find()
        .then( coffees =>
        {   console.log('Get all');
            res.json(coffees);
        })
        .catch(err => res.status(400).json())
});

// @route GET api/coffee/q=name
// @desc Get all coffees that matches the  string

router.get('/q=name&name=:name', (req, res) => {
    Coffee.find({Name : new RegExp(req.params.name, 'i')})
        .then(coffees => {
            console.log('Name search');
            res.json(coffees)
        })
        .catch(err => res.status(404).json())
});

// @route GET api/ coffee/:ingredient
// @desc Get all coffees that has 'ingredient' as ingredient

router.get('/q=content&content=:content', (req, res) => {
    Coffee.find({Content : new RegExp(req.params.content, 'i')})
        .then(coffees => {
            console.log('Ingredient search');
            res.json(coffees)
        })
        .catch(err => res.status(404).json())
});

// @route GET api/coffee/:id
// @desc Get coffee that matches id

router.get('/:id', (req, res) => {
    Coffee.findById(req.params.id)
        .then(coffees => {
            console.log('Id search');
            res.json(coffees)
        })
        .catch(err => res.status(404).json())
});

module.exports = router;
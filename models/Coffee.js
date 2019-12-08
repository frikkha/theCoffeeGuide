const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create coffee-schema
const CoffeeSchema = new Schema ({
    Name: {
        type: String,
        required: true
    },
    ImagePath: {
        type: String,
        required: true
    },
    Content: {
        type: Array,
        required: true
    },
    Hits: {
        type: Number,
        required: true
    }
});

module.exports = Coffee =  mongoose.model('Coffee', CoffeeSchema);
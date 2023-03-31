const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: {type: String, required: true},
    joined:{type: Date, required: true},
    
})
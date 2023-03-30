const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: false},
    category: {type: String, required: true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: false},
    added: {type: Date, required: true},
    updated: {type: Date, required: false},
    image: {data: Buffer, contentType: String}
})
// Virtual URL
// InventorySchema.virtual('url').get(function() {
//     return `/inventory/${this._id}`;
// })


module.exports = mongoose.model("Inventory", InventorySchema);
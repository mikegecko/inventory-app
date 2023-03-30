const Inventory = require('../models/inventory');

// List entire inventory
exports.inventory_list = (req,res,next) => {
    Inventory.find()
    .then((inventory) => res.json(inventory))
    .catch((err) => next(err));
}
// Gets a specific item from inventory
exports.inventory_detail = (req,res,next) => {
    Inventory.findById(req.params.id)
    .exec((err, item) => {
        if(err){
            return next(err);
        }
        if(!item){
            return res.status(404).json({
                message: 'Item not found'
            });
        }
        res.json(item);
    });
}
// Add new item to inventory
exports.inventory_create = (req,res,next) => {
    const newItem = new Inventory(req.body);
    newItem.save().then((item) => res.json(item)).catch((err) => next(err));
}
// Update an item in inventory
exports.inventory_update = (req,res,next) => {
    Inventory.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((updatedItem) => res.json(updatedItem)).catch((err) => next(err));
}
// Delete an item from inventory
exports.inventory_delete = (req,res,next) => {
    Inventory.findByIdAndDelete(req.params.id)
    .then((deletedItem) => res.json(deletedItem)).catch((err) => next(err));
}
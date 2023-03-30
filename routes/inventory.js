const express = require('express');
const router = express.Router();

//Controllers
const inventory_controller = require('../controllers/inventoryController');

// GET all inventory items
router.get('/inventory', inventory_controller.inventory_list);

// GET a specific inventory item by ID
router.get('/inventory/:id', inventory_controller.inventory_detail);

//POST a new inventory item
router.post('/inventory/:id', inventory_controller.inventory_create);

// PUT update an exisiting inventory item by ID
router.put('/inventory/:id', inventory_controller.inventory_update);

// DELETE an inventory item by ID
router.delete('/inventory/:id', inventory_controller.inventory_delete);

module.exports = router;
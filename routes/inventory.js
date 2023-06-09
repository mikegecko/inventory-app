const express = require('express');
const router = express.Router();
const auth_controller = require('../controllers/authController')
//Controllers
const inventory_controller = require('../controllers/inventoryController');

// GET all inventory items
router.get('/', inventory_controller.inventory_list);

// GET a specific inventory item by ID
router.get('/:id', inventory_controller.inventory_detail);

//POST a new inventory item
router.post('/', inventory_controller.inventory_create);

// PUT update an exisiting inventory item by ID
router.put('/:id', inventory_controller.inventory_update);

// DELETE an inventory item by ID
router.delete('/:id', auth_controller.requireAuth, inventory_controller.inventory_delete);

module.exports = router;
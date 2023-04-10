const express = require('express');
const router = express.Router();

//Controller
const auth_controller = require('../controllers/authController');

//Api Endpoints

//POST Login
router.post('/login', auth_controller.login);

//POST Logout
router.post('/logout', auth_controller.logout);

//PUT Update password
router.put('/password', auth_controller.update_password);

module.exports = router;
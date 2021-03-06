const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

router.post('/add_user', UserController.add_user);
router.post('/login', UserController.login);
router.get('/get_user', UserController.get_user);

module.exports = router;

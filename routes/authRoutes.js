const express = require('express');
const router = express.Router();
const { test, register, login, logout } = require('../controllers/authController');

router.get('/', test);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
const express = require('express');
const router = express.Router();
const { test, register, login } = require('../controllers/authController');

router.get('/', test);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const test = (req, res) => {
  res.send('Hello from auth controller');
};

const register = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;
        const user = await User.create({ name, email, password, isAdmin });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ message: 'User login successfully', token: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { test, register, login };
const express = require('express');
const { getCategories, deleteCategory, updateCategory, createCategory } = require('../controllers/categoryController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getCategories);
router.post('/', protect, admin, createCategory);
router.patch('/:id', protect, admin, updateCategory);
router.delete('/:id', protect, admin, deleteCategory);

module.exports = router;
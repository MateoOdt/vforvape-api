const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct, markAsFavorite, getFavorites } = require('../controllers/productController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getProducts);
router.post('/', protect, admin, createProduct);
router.patch('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);
router.patch('/:id/favorite', protect, admin, markAsFavorite);
router.get('/favorites', getFavorites);

module.exports = router;
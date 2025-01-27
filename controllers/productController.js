const Product = require('../models/productModel');

const getProducts = async (req, res) => {
    try {
      const { category } = req.query;
  
      const query = category ? { category } : {};
  
        const options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10
        };

    const products = await Product.paginate(query, options);
  
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  };

const createProduct = async (req, res) => {
    try {
        const { name, description, category, price, image } = req.body;

        if (!name || !description || !category || !image) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const product = await Product.create({
            name,
            description,
            category,
            price,
            image,
            isFavorite: false
        });

        res.status(201).json(product);
    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const markAsFavorite = async (req, res) => {
    try {
      const { id } = req.params;
  
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      if (product.isFavorite) {
        return res.status(400).json({ error: "Product is already marked as favorite" });
      }
  
      const favoriteCount = await Product.countDocuments({ isFavorite: true });
  
      if (favoriteCount >= 10) {
        const oldestFavorite = await Product.findOne({ isFavorite: true }).sort({ updatedAt: 1 });
        if (oldestFavorite) {
          oldestFavorite.isFavorite = false;
          await oldestFavorite.save();
        }
      }
  
      product.isFavorite = true;
      await product.save();
  
      res.json({ message: "Product marked as favorite", product });
    } catch (error) {
      console.error("Error marking product as favorite:", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  
  const getFavorites = async (req, res) => {
    try {
      const favorites = await Product.find({ isFavorite: true });
      res.json(favorites);
    } catch (error) {
      console.error("Error fetching favorite products:", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  

module.exports = { getProducts, createProduct, updateProduct, deleteProduct, markAsFavorite, getFavorites };
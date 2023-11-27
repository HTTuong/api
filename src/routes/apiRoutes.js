const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Product = require('../models/Product');
const Category = require('../models/Category')

router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll({
      where: req.query,
      include: Category
    });
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/products', async (req, res) => {

  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/products/add-category', async (req, res) => {
  // {
  //     "productId": 1,
  //     "categoryId": 2
  // }

  const productId = req.body.productId
  const categoryId = req.body.categoryId
  try {
    const product = await Product.findByPk(productId);
    const category = await Category.findByPk(categoryId);
    const result = await product.addCategory(category)
    if (result) {
      res.status(200).json({ message: "Add category successfully !" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const [updatedRows] = await Product.update(req.body, {
      where: { id: productId },
    });
    if (updatedRows > 0) {
      res.status(201).json({ message: 'Product updated successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET all categories 
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: req.query,
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST a new category
router.post('/categories', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT (update) category information
router.put('/categories/:id', async (req, res) => {
  const categoryId = req.params.id;
  try {
    const [updatedRows] = await Category.update(req.body, {
      where: { id: categoryId },
    });
    if (updatedRows > 0) {
      res.status(201).json({ message: 'Category updated successfully' });
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;
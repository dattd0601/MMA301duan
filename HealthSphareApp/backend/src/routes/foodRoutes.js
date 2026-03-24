const express = require('express');
const router = express.Router();
const Food = require('../models/Food');

// Get all foods
router.get('/', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get foods by category
router.get('/category/:category', async (req, res) => {
  try {
    const foods = await Food.find({ category: req.params.category });
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get foods by tag
router.get('/tag/:tag', async (req, res) => {
  try {
    const foods = await Food.find({ tags: req.params.tag });
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get foods by goal (gain or lose)
router.get('/goal/:goal', async (req, res) => {
  try {
    let filter = {};
    if (req.params.goal === 'gain') filter.isForWeightGain = true;
    if (req.params.goal === 'lose') filter.isForWeightLoss = true;
    
    const foods = await Food.find(filter);
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new food
router.post('/', async (req, res) => {
  const food = new Food(req.body);
  try {
    const newFood = await food.save();
    res.status(201).json(newFood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

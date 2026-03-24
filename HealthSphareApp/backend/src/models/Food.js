const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fat: { type: Number, required: true },
  servingSize: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, enum: ["breakfast", "lunch", "dinner", "snack"], required: true },
  tags: [{ type: String }],
  isForWeightGain: { type: Boolean, default: false },
  isForWeightLoss: { type: Boolean, default: false }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Food', FoodSchema);

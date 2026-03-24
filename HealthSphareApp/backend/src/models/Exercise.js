const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema({
  type: String
}, { _id: false });

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  difficulty: { type: String, enum: ["beginner", "intermediate", "advanced"], required: true },
  imageUrl: { type: String, required: true },
  linkYtb: { type: String, required: true },
  videoUrl: { type: String },
  steps: [{ type: String }],
  equipment: [{ type: String }],
  muscleGroups: [{ type: String }],
  isForWeightGain: { type: Boolean, default: false },
  isForWeightLoss: { type: Boolean, default: false }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Exercise', ExerciseSchema);

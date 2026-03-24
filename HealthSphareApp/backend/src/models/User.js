const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  age: { type: Number },
  gender: { type: String, enum: ["male", "female", "other"] },
  height: { type: Number },
  weight: { type: Number },
  activityLevel: { type: String, enum: ["sedentary", "light", "moderate", "active", "very_active"] },
  goal: { type: String, enum: ["lose", "maintain", "gain"] },
  waterGoal: { type: Number },
  waterIntake: [{ type: Date }],
  isPremium: { type: Boolean, default: false },
  premiumUntil: { type: String },
  hasCompletedOnboarding: { type: Boolean, default: false }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('User', UserSchema);

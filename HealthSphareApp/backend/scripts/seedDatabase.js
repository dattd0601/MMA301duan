require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const Exercise = require('../src/models/Exercise');
const Food = require('../src/models/Food');
const User = require('../src/models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/healthsphare';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB. Starting database seed...');
    seedDatabase();
  })
  .catch(err => {
    console.error('Connection error:', err);
    process.exit(1);
  });

async function seedDatabase() {
  try {
    // Clear existing data
    await Exercise.deleteMany({});
    await Food.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data.');

    // 1. Seed Users
    const usersPath = path.join(__dirname, '../../mocks/users.json');
    if (fs.existsSync(usersPath)) {
      const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
      await User.insertMany(usersData.users);
      console.log('Users seeded successfully.');
    }

    // 2. Seed Exercises (Extract from TS)
    const exercisesPath = path.join(__dirname, '../../mocks/exercises.ts');
    if (fs.existsSync(exercisesPath)) {
      let content = fs.readFileSync(exercisesPath, 'utf8');
      // Extract the array contents
      const match = content.match(/export const exercises: Exercise\[\] = (\[[\s\S]*?\]);/);
      if (match && match[1]) {
        // Evaluate the array string into a JS object
        const exercises = eval(`(${match[1]})`);
        // The mock uses 'id', but Mongoose maps 'id' to '_id' automatically or we can just omit it and let Mongoose create new ObjectIds. 
        // We will remove id to avoid cast errors, or we can keep it as a string id.
        // Actually Mongoose will add _id. The schema does not define 'id'. So we should omit it.
        const cleanedExercises = exercises.map(ex => {
          const { id, ...rest } = ex;
          return rest;
        });
        await Exercise.insertMany(cleanedExercises);
        console.log('Exercises seeded successfully.');
      }
    }

    // 3. Seed Foods (Extract from TS)
    const foodsPath = path.join(__dirname, '../../mocks/vietnameseFoods.ts');
    if (fs.existsSync(foodsPath)) {
      let content = fs.readFileSync(foodsPath, 'utf8');
      const match = content.match(/export const vietnameseFoods: FoodItem\[\] = (\[[\s\S]*?\]);/);
      if (match && match[1]) {
        const foods = eval(`(${match[1]})`);
        const cleanedFoods = foods.map(fd => {
          const { id, ...rest } = fd;
          return rest;
        });
        await Food.insertMany(cleanedFoods);
        console.log('Foods seeded successfully.');
      }
    }

    console.log('Database seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}


const mongoose = require('mongoose');

const uri = "mongodb+srv://XIN-McMaster:de8cPja9tL5K4MDO@cluster0.bf5hx8j.mongodb.net/nutrition_plan?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

process.on('SIGINT', () => {
  db.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

module.exports = db; 

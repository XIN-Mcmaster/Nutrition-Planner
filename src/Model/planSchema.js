const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  breakfast: {
    type :Array,
    default: [],
  }, 
  lunch: {
    type :Array,
    default: [],
  },     
  dinner: {
    type :Array,
    default: [],
  },   
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;

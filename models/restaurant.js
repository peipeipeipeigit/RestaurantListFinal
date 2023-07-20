const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String, 
    required: true 
  },
  name_en: {
    type: String, 
    required: true 
  },
  category: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  // 建立關聯
})

module.exports = mongoose.model('Restaurant', restaurantSchema)
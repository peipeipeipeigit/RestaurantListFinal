const express = require('express')
const router = express.Router()
require('../../config/mongoose')

const Restaurant = require('../../models/restaurant')
const restaurantData = require('../../restaurant.json')

// get all the restaurants
router.get('/', (req, res) => {
  res.render('index')
  // Restaurant.find({})
  //   .lean()
  //   .then(restaurants => res.render('index', { restaurants: restaurantData.results }))
  //   .catch(err => console.log(err))
})

// // get specific restaurant
// router.get('/restaurants/:restaurant_id', (req, res) => {
//   console.log(req.params.restaurant_id)
//   const restaurant = restaurants.results.find(
//     restaurant => restaurant.id.toString() === req.params.restaurant_id
//   )
//   res.render('show', { restaurants: restaurant })
// })

// // search
// router.get('/search', (req, res) => {
//   console.log('正確導向/search')
//   const keyword = req.query.keyword
//   const restaurants = restaurants.results.filter(
//     restaurant => { return restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) || restaurant.name.includes(keyword) }
//   )
//   res.render('index', { restaurants, keyword })
// })

module.exports = router
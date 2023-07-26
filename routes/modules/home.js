const express = require('express')
const router = express.Router()
require('../../config/mongoose')

const Restaurant = require('../../models/restaurant')
const restaurantData = require('../../models/seeds/restaurant.json')

// get all the restaurants
router.get('/', (req, res) => {
  Restaurant.find({})
    .lean()
    .then(restaurants => res.render('index', { restaurants: restaurantData.results }))
    .catch(err => console.log(err))
})



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
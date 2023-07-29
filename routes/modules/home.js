const express = require('express')
const router = express.Router()
require('../../config/mongoose')

const Restaurant = require('../../models/restaurant')

// get all the restaurants
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
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
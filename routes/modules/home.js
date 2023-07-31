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

// search restaurants
router.get('/search', (req, res) => {
  const { _id } = req.user
  const keyword = req.query.keyword
  const trimKeyword = keyword.trim().toLowerCase()


  if (!keyword) {
    res.redirect('/')
  } else {
    Restaurant.find({ userId: _id })
      .lean()
      .then((restaurants) => {
        return restaurants.filter(
          restaurant =>
            restaurant.name.toLowerCase().includes(trimKeyword) || restaurant.name_en.toLowerCase().includes(trimKeyword) || restaurant.category.includes(trimKeyword)
        )
      })
      .then((restaurantFiltered) => {
        res.render('index', { restaurants: restaurantFiltered, keyword })
      })
      .catch(err => console.log(err))
  }
})


module.exports = router
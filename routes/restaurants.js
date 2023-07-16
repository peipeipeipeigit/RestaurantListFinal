const express = require('express')
const { route } = require('.')
const router = express.Router()

const Restaurant = require('../models/restaurant')


// post a restaurant
router.get('/restaurants/new', (req, res) => {
  res.render('new')
})
router.post('/restaurants/new', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


// edit a restaurant
router.get('/restaurants/:restaurant_id/edit', (req, res) => {
  const { restaurantId } = req.params
  Restaurant.findById(restaurantId)
    .lean()
    .then(restaurants => res.render('edit', { restaurants }))
    .catch(err => console.log(err))
})

router.put('/restaurants/:restaurant_id', (req, res) => {
  const { restaurantId } = req.params
  Restaurant.findByIdAndUpdate(restaurantId, req.body)
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(err => console.log(err))
})


// delete a restaurant
router.delete('/restaurants/:restaurant_id', (req, res) => {
  const { restaurantId } = req.params
  Restaurant.findByIdAndDelete(restaurantId)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})




module.exports = router
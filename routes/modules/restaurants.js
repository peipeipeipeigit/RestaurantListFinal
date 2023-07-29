const express = require('express')
const { route } = require('..')
const router = express.Router()

const Restaurant = require('../../models/restaurant')
const Category = require('../../models/category')
const category = require('../../models/category')
const restaurant = require('../../models/restaurant')
const restaurantData = require('../../models/seeds/restaurant.json').results

// get specific restaurant
router.get('/browse/:restaurant_id', (req, res) => {
  const { _id } = req.user
  const { restaurant_id } = req.params
  return Restaurant.findOne({ id: restaurant_id })
    .lean()
    .then(
      (restaurants) => {
        res.render('show', { restaurants })
      })
    .catch(error => console.log(error))
})

// post a restaurant
router.get('/new', (req, res) => {
  Category.find({})
    .lean()
    .then(categories => res.render('new', { categories }))
    .catch(err => console.log(err))
})

router.post('/new', (req, res) => {
  const userId = req.user._id
  const { name, name_en, category, location,
    phone, description } = req.body
  const id = Restaurant.find({})
    .lean()
    .then((restaurants) => {
      return Number(restaurants.length) + 1
    })
  console.log(id)

  Restaurant.create({
    name, name_en, category, location,
    phone, description, id, userId
  })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


// edit a restaurant
router.get('/:restaurant_id/edit', (req, res) => {
  const { restaurant_id } = req.params
  let theRestaurant = [] //因為等下要給Category.find()用，所以先定義起來

  Restaurant.findOne({ id: restaurant_id })
    .lean()
    .then(
      (restaurant) => {
        theRestaurant.push(restaurant)
        // 針對點擊的restaurant，製作edit頁面中下拉選單的categories
        return Category.find({ name: { $ne: theRestaurant[0].category } })
          .lean()
      })
    .then(categories => {
      // categories為上一個then中，Category.find()返回的值        
      res.render('edit', { restaurant: theRestaurant[0], categories });
      console.log('餐廳資料查詢完畢')
    })
    .catch((error) => {
      console.error(error);
    })
})

router.put('/:restaurant_id/edit', (req, res) => {
  const { restaurant_id } = req.params
  const { name, name_en, category, location,
    phone, description } = req.body

  return Restaurant.findOne({ id: restaurant_id })
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.location = location
      restaurant.phone = phone
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/browse/${restaurant_id}`))
    .catch(error => console.log(error))
})


// delete a restaurant
router.delete('/:restaurant_id', (req, res) => {
  const { restaurantId } = req.params
  Restaurant.findByIdAndDelete(restaurantId)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


module.exports = router
const express = require('express')
const { route } = require('..')
const router = express.Router()


const Restaurant = require('../../models/restaurant')
const Category = require('../../models/category')
const restaurant = require('../../models/restaurant')
const category = require('../../models/category')
const restaurantData = require('../../models/seeds/restaurant.json').results



// get specific restaurant
router.get('/browse/:restaurant_id', (req, res) => {
  console.log(req.params)
  const restaurant = restaurantData.find(
    restaurant => restaurant.id.toString() === req.params.restaurant_id
  )
  res.render('show', { restaurants: restaurant })
})

// post a restaurant
router.get('/new', (req, res) => {
  Category.find({})
    .lean()
    .then(categories => res.render('new', { categories }))
    .catch(err => console.log(err))
})

router.post('/new', (req, res) => {
  res.render('index')
  // Restaurant.create(req.body)
  //   .then(() => res.redirect('/'))
  //   .catch(err => console.log(err))
})

// edit a restaurant
router.get('/:restaurant_id/edit', (req, res) => {
  // restaurant.json的查找:找出點選的餐廳
  const restaurant = restaurantData.find(
    restaurant => restaurant.id.toString() === req.params.restaurant_id
  )
  // 針對Category Model的查找：使用json中找到的restaurant為查找條件
  const findCategory = new Promise(
    (resolve, reject) => {
      // 排除掉點選的餐廳的category name
      Category.find({ name: { $ne: restaurant.category } })
        .lean()
        .then((category) => {
          if (category) {
            resolve(category)
            return category
          } else {
            reject('category not found')
          }
        })
        .then((category) => {
          res.render('edit', { restaurant, categories: category });          
        })
        .catch((error) => {
          console.error(error);
        })
    })
})

router.post('/:restaurant_id/edit', (req, res) => {
  // const restaurantId = req.params.restaurant_id

  const { restaurant_id } = req.params
  console.log(restaurant_id)
  const { name, name_en, category, location,
    phone, description } = req.body
  console.log(req.body)

  Restaurant.findOne({ restaurant_id }, req.body)
    .then((restaurant) => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.location = location
      restaurant.phone = phone
      restaurant.description = description
      // restaurant.userId = restaurant_id
      return restaurant.save()
    })
    .then(() => res.redirect(`/browse/${restaurant_id}`))
    .catch(err => console.log(err))
})


// delete a restaurant
router.delete('/:restaurant_id', (req, res) => {
  const { restaurantId } = req.params
  Restaurant.findByIdAndDelete(restaurantId)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})




module.exports = router
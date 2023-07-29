// db connection setting
const express = require('express')
const { route } = require('..')
const router = express.Router()

// require Schema models
const Restaurant = require('../../models/restaurant')
const Category = require('../../models/category')
let theRestaurant  //為了在get edit頁中給Category.find使用

// get specific restaurant
router.get('/browse/:restaurant_id', (req, res) => {
  const { _id } = req.user
  const { restaurant_id } = req.params
  return Restaurant.findOne({ id: restaurant_id, userId: _id })
    .lean()
    .then(
      (restaurants) => {
        res.render('show', { restaurants })
      })
    .catch(error => console.log(error))
})


// post a new restaurant
router.get('/new', (req, res) => {
  Category.find({})
    .lean()
    .then(categories => res.render('new', { categories }))
    .catch(err => console.log(err))
})

router.post('/new', (req, res) => {
  const image = 'https://img.freepik.com/free-photo/restaurant-interior_1127-3392.jpg?w=826&t=st=1690619226~exp=1690619826~hmac=18878f0d5a8ed325db63115e1149452aa794a66e6e048b34a5baed2f2faaa15b'
  const userId = req.user._id
  const { name, name_en, category, location, phone, description } = req.body

  Restaurant.find({})
    .lean()
    .then((restaurants) => {
      return Number(restaurants.length) + 1
    })
    .then((id) => {
      // id 為現有餐廳資料筆數+1
      Restaurant.create({
        name, name_en, category, location,
        phone, description, image, id, userId
      })
        .then(() => res.redirect(`/restaurants/browse/${id}`))
        .catch(err => console.log(err))
    })
})


// edit a restaurant
router.get('/:restaurant_id/edit', (req, res) => {
  const { restaurant_id } = req.params
  const { _id } = req.user
  Restaurant.findOne({ id: restaurant_id, userId: _id })
    .lean()
    .then(
      (restaurant) => {
        // 更新theRestaurant資料
        return theRestaurant = restaurant
      })
    .then((restaurant) => {
      // 針對點擊的restaurant，製作edit頁面中下拉選單的categories
      return Category.find({ name: { $ne: theRestaurant.category } })
        .lean()
    })
    .then(categories => {
      // categories為上一個then中，Category.find()返回的值        
      res.render('edit', { restaurant: theRestaurant, categories });
      console.log('edit get 餐廳資料查詢完畢')
    })
    .catch((error) => {
      console.error(error);
    })
})

router.put('/:restaurant_id/edit', (req, res) => {
  const { restaurant_id } = req.params
  const { name, name_en, category, location,
    phone, description } = req.body
  const { _id } = req.user

  return Restaurant.findOne({ id: restaurant_id, userId: _id })
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.location = location
      restaurant.phone = phone
      restaurant.description = description
      return restaurant.save()
    })
    .then((restaurant) => {
      return theRestaurant = restaurant
    })
    .then(() => res.redirect(`/restaurants/browse/${restaurant_id}`))
    .catch(error => console.log(error))
})


// delete a restaurant
router.delete('/:restaurant_id', (req, res) => {
  const { restaurant_id } = req.params
  const { _id } = req.user

  Restaurant.findOne({ id: restaurant_id, userId: _id })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
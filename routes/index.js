const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users') 

router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/users', users) 

module.exports = router

// 設定路由setting route
router.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

router.get('/restaurants/:restaurant_id', (req, res) => {
  console.log(req.params.restaurant_id)//使用者點擊的位置所回傳的項目
  const restaurant = restaurantList.results.find(
    restaurant => restaurant.id.toString() === req.params.restaurant_id
  )
  res.render('show', { restaurants: restaurant })
})

router.get('/search', (req, res) => {
  console.log('正確導向/search')
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(
    restaurant => { return restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) || restaurant.name.includes(keyword) }
  )

  res.render('index', { restaurants: restaurants, keyword: keyword })
})
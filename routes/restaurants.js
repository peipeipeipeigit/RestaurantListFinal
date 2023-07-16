const express = require('express')
const router = express.Router()

router.get('/restaurants/:restaurant_id', (req, res) => {
  console.log(req.params.restaurant_id)//使用者點擊的位置所回傳的項目
  const restaurant = restaurantList.results.find(
    restaurant => restaurant.id.toString() === req.params.restaurant_id
  )
  res.render('show', { restaurants: restaurant })
})

module.exports = router
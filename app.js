// basic setting
const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')
const exphbs = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// require to connect database
require('./config/mongoose.js')

//基礎文件：載入json文件
const restaurantList = require('./restaurant.json')

//指定template engine的文件
app.engine('handlebars', exphbs.engine({ defaultLayouts: 'main' }))
app.set('view engine', 'handlebars')

//指定靜態檔案static file的文件
app.use(express.static('public'))

// 設定路由setting route
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  console.log(req.params.restaurant_id)//使用者點擊的位置所回傳的項目
  const restaurant = restaurantList.results.find(
    restaurant => restaurant.id.toString() === req.params.restaurant_id
  )
  res.render('show', { restaurants: restaurant })
})

app.get('/search', (req, res) => {
  console.log('正確導向/search')
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(
    restaurant => { return restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) || restaurant.name.includes(keyword) }
  )
  
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

// 啟動伺服器並監聽
app.listen(port, () => {
  console.log(`app.js is listening on http://localhost:${port}`)
})
// basic setting
const express = require('express')
const session = require('express-session')
// const usePassport = require('./config/passport')
// const flash = require('connect-flash')
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
const restaurants = require('./restaurant.json')

//指定template engine的文件
app.engine('hbs', exphbs.engine({ defaultLayouts: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//指定靜態檔案static file的文件
app.use(express.static('public'))

app.use(routes)

// 啟動伺服器並監聽
app.listen(port, () => {
  console.log(`app.js is listening on http://localhost:${port}`)
})
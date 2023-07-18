// basic setting
const express = require('express')
const session = require('express-session')
// const usePassport = require('./config/passport')
// const flash = require('connect-flash')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose.js')

app.engine('hbs', exphbs.engine({ defaultLayouts: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


app.use(express.static('public'))

app.use(methodOverride('_method'))

app.use(routes)


app.listen(port, () => {
  console.log(`app.js is listening on http://localhost:${port}`)
})
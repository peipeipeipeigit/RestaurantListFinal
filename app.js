// basic setting
const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')

// connect database
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose.js')

// template engine
app.engine('hbs', exphbs.engine({ defaultLayouts: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// Third-party middleware
app.use(express.static('public'))

app.use(methodOverride('_method'))

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  
  res.locals.warning_msg = req.flash('warning_msg')  
  next()
})


app.use(routes)


// listening 
app.listen(port, () => {
  console.log(`app.js is listening on http://localhost:${port}`)
})
// 連線設定
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

// require restaurant model
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantData = require('../../restaurant.json')

const SEED_USER = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      const { id, name, name_en, category, rating } = restaurantData.results
      return Promise.all(Array.from(
        { length: restaurantData.results.length },
        (_, i) => Restaurant.create({
          id,
          name,
          name_en,
          category,
          rating
        })
      ))
        .then(() => {
          console.log('done.')
          process.exit()
        })
    })
})
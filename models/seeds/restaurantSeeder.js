// db connect setting
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

// require third-party middleware 
const bcrypt = require('bcryptjs')

// require models
const Restaurant = require('../restaurant')
const User = require('../user')

// require seed data json
const restaurantData = require('../../restaurant.json').results
const seedUsersData = require('./seedUser.json').users

db.once('open', () => {
  return Promise.all(
    seedUsersData.map((seedUsersData) => {
      // generate user and bcrypt password
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seedUsersData.password, salt))
        .then(hash => {
          return User.create({
            email: seedUsersData.email,
            password: hash,
            restaurantsID_owned: seedUsersData.restaurantsID_owned
          }, console.log('A user seeder has been created!'))
        })
        .then((seedUser) => {
          const userId = seedUser._id
          const restaurantFit = []
          let arr = []
          restaurantData.map((restaurantData) => {
            for (let i = 0; i < seedUser.restaurantsID_owned.length; i++) {
              if (restaurantData.id === seedUser.restaurantsID_owned[i]) {
                restaurantFit.push(restaurantData)
              }
            }
          })
          // 餐廳原始資料加入userId
          for (let k = 0; k < restaurantFit.length; k++) {
            let restaurantFitWithId = { ...restaurantFit[k], userId }
            arr.push(restaurantFitWithId)
          }
          console.log('準備create restaurantSeeder')
          return arr
        })
        .then((arr) => {
          // 建立餐廳種子資料
          // return Promise.all(
            Restaurant.create(...arr)
              .then(() => {
                console.log('restaurantSeeder done.')
              })
              .catch((err) => {
                console.error('建立 restaurantSeeder時發生錯誤:', err)
              })
          // )
        })
    })
  ).then(() => {
    console.log('all done')
    // process.exit() 
  }).catch((err) => {
    console.error(err)
  })
})
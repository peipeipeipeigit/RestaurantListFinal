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
const restaurantData = require('../../restaurant.json')
const SEED_USER = require('../seeds/seedUser.json')


db.once('open', () => {
  SEED_USER.users.map((user) => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({
        name: user.name,
        email: user.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id //為了建立關聯
        const ownedRestaurants = user.restaurantsID_owned //user擁有的餐廳id
        return Promise.all(
          ownedRestaurants.map(ownedRestaurants === restaurantData.results.id){

          
          Array.from(
            { length: ownedRestaurants.length },
            (_, i) => {
              Restaurant.create({
                id,
                name,
                name_en,
                category,
                rating,
                userId
              })
            }
          )
        )
      }
      }})
  )
    .then(() => {
      console.log('done.')
      process.exit()
    })
})
})
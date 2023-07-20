// db connect setting
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

// require third-party middleware 
const bcrypt = require('bcryptjs')

// require models
const User = require('../user')
const SEED_USER = require('../seeds/seedUser.json')


db.once('open', () => {
  const users = SEED_USER.users
  users.forEach((user) => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({
        name: user.name,
        email: user.email,
        password: hash
      }))
      .then(() => {
        console.log('User seeder has been successfully completed!.')
        process.exit()
      })
  })
})

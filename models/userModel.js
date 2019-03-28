const db = require('../config/db');

const schema = new db.Schema({
  username: String,
  password: String,
  nickName: String
}, {
  collection: 'users'
})

module.exports = db.model('a', schema);
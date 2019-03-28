// 1. 引入 db
const db = require('../config/db');

// 2. 创建 schema
const schema = new db.Schema({
  username: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  nickName: {
    type: String,
    default() {
      return '普通用户';
    }
  },

  sex: {
    type: Number,
    default() {
      // 0 - 女
      // 1 - 男
      return 0;
    }
  },

  avator: {
    type: String,
    default() {
      return '/images/avator.png'
    } 
  },

  is_admin: {
    type: Number,
    default() {
      // 0 - 普通
      // 1 - 管理员
      return 0;
    }
  }
}, {
  collection: 'users'
})

// 3. 基于 schema 创建模式
// 有一些时候，我们的集合的名字，并不都有单复数形式，这个时候我们需要。。。。
module.exports = db.model('a', schema);
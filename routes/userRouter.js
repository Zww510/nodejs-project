// 专门处理用户相关的路由
const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../modles/userModel');
const router = express.Router();

// 处理注册的路由 http://localhost:3000/user/register
router.post('/register', (req, res) => {
  // 1. 获取前端传递过来的参数
  let username = req.body.username;
  let password = req.body.password;
  // 2. 对参数做校验 ...

  bcrypt.hash(password, 10).then(saltPassword => {
    // 3. 操作数据库写入数据
    let user = new UserModel({
      username: username,
      password: saltPassword
    })

    // 4. 操作 save 方法
    user.save()
      .then(() => { 
        console.log('注册成功');
        res.redirect('/login.html');
      })
      .catch(error => { 
        console.log('写入失败');
        res.send('注册失败');
      });
  })
})

// 处理登录的路由 http://localhost:3000/user/login
router.post('/login', (req, res) => {
  // 1. 获取前端传递过来的参数
  let username = req.body.username;
  let password = req.body.password;

  // 2. 参数做校验

  // 3. 验证用户名是否存在
  UserModel.findOne({
    username
  }).then(data => {
    if (!data) {
      // 用户不存在
      res.send({
        code: -1,
        msg: '用户名不存在'
      })
    } else {
      // 用户存在，判断密码是否正确
      bcrypt.compare(password, data.password, (err, isOk) => {
        if (isOk) {
          res.send({
            code: 0,
            msg: '登录成功'
          })
          // res.redirect('/index.html');
          
        } else {
          res.send({
            code: -2,
            msg: '密码错误'
          })
        }
      })
    }
  })
})

module.exports = router;
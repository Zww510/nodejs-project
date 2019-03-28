// 专门处理渲染ejs模板页面的路由文件
const express = require('express');
const UserModel = require('../modles/userModel');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('我是否进来了');
  // 判断用户是否登录
  if (req.session.nickName) {
    // 存在

    // 访问数据库
    UserModel.find()
      .then(data => {
        res.render('index', {
          nickName: req.session.nickName,
          isAdmin: req.session.isAdmin,
          userList: data
        });
      })
  } else {
    // 不存在
    res.redirect('/login.html');
  }
})

router.get('/login.html', (req, res) => {
  // 当我们使用 session 中间件之后，会主动给我们 req 上面绑定一个 session 属性
  // console.log(req.session);
  // 给req.session 加上一个属性
  req.session.abc = '张三';
  // console.log(req.session);
  res.render('login');
})

router.get('/register.html', (req, res) => {
  res.render('register');
})

module.exports = router;
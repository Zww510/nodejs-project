// 专门处理渲染ejs模板页面的路由文件
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // 判断用户是否登录
  console.log(req.cookies);
  if (req.cookies.nickName) {
    // 存在
    res.render('index', {
      nickName: req.cookies.nickName
    });
  } else {
    // 不存在
    res.redirect('/login.html');
  }
})

router.get('/login.html', (req, res) => {
  res.render('login');
})

router.get('/register.html', (req, res) => {
  res.render('register');
})

module.exports = router;
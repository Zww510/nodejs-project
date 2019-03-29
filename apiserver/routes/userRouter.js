const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const router = express.Router();

router.route('/user')
  .post((req, res) => {
    // 注册
    bcrypt.hash(req.body.password, 10)
      .then(saltPassword => {
        let user = new UserModel({
          username: req.body.username,
          password: saltPassword
        })

        user.save()
          .then(() => {
            res.send({
              code: 0,
              msg: '注册成功'
            })
          })
          .catch(error => {
            res.send({
              code: -1,
              msg: '注册失败'
            })
          })
      })
  })
  .get((req, res) => {
    // 登录

    let username = req.query.username;
    let password = req.query.password;

    UserModel.findOne({
      username: username
    }).then(data => {
      if (!data) {
        res.send({
          code: -1,
          msg: '用户名不存在'
        })
      } else {
        // 前端的密码跟数据库中的密码做比较
        bcrypt.compare(password, data.password, function(err, isOk) {
          if (err) {
            res.send({
              code: -2,
              msg: '密码错误'
            })
          } else {
            if (isOk) {
              res.send({
                code: 0,
                msg: '登录成功'
              })
            } else {
              res.send({
                code: -2,
                msg: '密码错误'
              })
            }
          }
        })
      }
    })
  })

module.exports = router;
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'c:/tmp' }) // dest 指定文件上传之后的一个临时目录
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
              // 签发一个token并且返回给前端
              let token = jwt.sign({
                username: data.username,
                userId: data._id
              }, 'MY_GOD');

              res.send({
                code: 0,
                msg: '登录成功',
                token: token
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

/**
 * 获取用户的基本信息，如昵称，头像等
 * @param {String} userId 用户的id  直接使用id来获取用户信息的话，不够安全，因为如果有人知道了这个接口，那么在不登录的情况，随意伪造一个id来调用这个请求。我后台没有校验，那么这个接口是不安全的。
 * 
 * 在用户登录成功的时候，将此用户的id给写入到 payload 中，并生成一个 token。后续前端要调用这个请求的时候，不需要主动传递 userId 这个字段，只需要将 token 写在请求头中，以 X-Access-Token 的请求头携带过来。后台这个地方就验证前端传递过来的 X-Access-Token,
 * 1. 验证不通过，就直接响应 403的状态码，并告诉前端没有这个权限。
 * 2. 验证通过，就能拿到token中 payload 的id信息，再使用这个id去获取数据库中相对应的用户信息响应给前端即可。
 */
router.get('/getUserInfo', tokenVerify(), (req, res) => {
  // 获取 userId
  let userId = req.userInfo.userId;

  // 查询数据库
  UserModel.findById(userId, { password: 0 })
  .then(data => {
    if (!data) {
      res.send({ code: -1, msg: '用户信息查询失败，不存在此用户' });
    } else {
      // 成功查询到用户信息
      res.send({ code: 0, msg: '查询成功', userInfo: data });
    }
  })
})


// 修改用户信息
router.post('/updateUserInfo', tokenVerify(), upload.single('eq'), (req, res) => {
  // 经过 multer 中间件处理之后，req 上有一个 file 属性
  console.log(req.file);
  // 思考能够得到文件对象了，将文件重写一下，换个名字写入到静态资源托管的文件件中。
  // img src="图片地址 http://10.32.231.19:3000/xxx.png"

  // 1. 将文件从 c:\tmp\xxxx -> 当前的public\xxx.jpg
  const newFileName = new Date().getTime() + '_' + req.file.originalname;
  const newFilePath = path.resolve(__dirname, '../public/', newFileName);
  // console.log(newFilePath);
  const fileData = fs.readFileSync(req.file.path);
  fs.writeFileSync(newFilePath, fileData);


  // 获取当前用户的id
  let userId = req.userInfo.userId

  // 修改数据库
  UserModel.updateOne({
    _id: userId
  }, {
    avator: newFileName
  }).then(data => {
    res.send({
      code: 0,
      msg: '哈哈哈哈哈'
    })
  })
})




// 验证 token

function tokenVerify() {
  return (req, res, next) => {
    // 0. 获取前端在请求头中传递过来的 X-Access-Token 
    let token = req.get('X-Access-Token');
    // 1. 是否存在
    if (!token) {
      res.status(401).send({ code: -1, msg: 'token不存在' });
    } else {
      // 存在 验证 token 的有效性
      jwt.verify(token, 'MY_GOD', (err, payload) => {
        if (err) {
          // 验证失败
          res.status(403).send({ code: -1, msg: '没有权限' });
        } else {
          // 验证成功
          // 我们可以像 别的中间件一样，在 req 身上加上一个属性
          req.userInfo = payload;
          next();
        }
      })
    }
  }
}



// http://mybank.com/geiqian?userId=heike&formId=zhangsan&money=1000
module.exports = router;
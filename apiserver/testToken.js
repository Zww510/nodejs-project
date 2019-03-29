// 研究一下 jsonwebtoken 的使用

const jwt = require('jsonwebtoken');

// 要保存在 token 中的信息
const payload = {
  nickName: '张三',
  is_admin: true
}

// 定义一个 密钥
const secret = 'MY_GOD';

// 生成token
const token = jwt.sign(payload, secret);

// console.log(token);

// 解码
jwt.verify(token, secret, function (err, data) {
  if (err) {
    console.log('解码失败', err);
  } else {
    console.log('解码成功', data);
  }
})

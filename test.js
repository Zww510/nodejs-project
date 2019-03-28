const bcrypt = require('bcrypt');

/**
 * 得到一个随机的盐值
 * @param {Number} rounds 盐值的等级强度（1-10）
 */
// bcrypt.genSalt(10, (err, salt) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('生成的随机的颜值是', salt);
//   }
// })

// bcrypt.genSalt(10)
//   .then(salt => { 
//     console.log('生成的随机的颜值是', salt);
//     bcrypt.hash('123456', salt, (err, data) => {
//       console.log('最终得到的加盐之后的密码是', data);
//     })
//   })
//   .catch(error => { console.log(err); })

// bcrypt.hash('123456', 10)
//   .then(data => {
//     console.log('最终得到的加盐之后的密码是', data);
//   })

// 验证密码是否匹配
bcrypt.compare('asdfadsfasdf', '$2b$10$a8x8NbLiFXIhyvXSMPobT.93dGkCpayW5T6BU8KqTjTSmU4m1zZCm')
  .then(isOk => {
    console.log(isOk);
  })


// const crypto = require('crypto');

// const password = '123456';
// // const hash = crypto.createHash('sha256');
// // hash

// let hashPassword = crypto.createHash('sha256').update(password).digest('base64');

// console.log(hashPassword);

// // 加盐

// // 123456 => jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=

// // 123456 => Math.random() + jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=

// // 123456 => Math.random() + jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI= + Math.random()
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/hello';

mongoose.connect(url, { useNewUrlParser: true })
  .then(() => { console.log('数据库链接成功') })
  .catch(error => { console.log('数据库链接失败', error) });

module.exports = mongoose;
const express = require('express');
const app = express();

const userRouter = require('./routes/userRouter');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// 允许跨域
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'content-type');
  res.set('Access-Control-Allow-Methods', 'get, post, put, patch, delete');
  next();
})

app.use('/api', userRouter);

app.listen(3000);
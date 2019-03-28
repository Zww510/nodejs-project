const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

// 引入相应的路由js文件, 路由中间件函数
const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');
const bannerRouter = require('./routes/bannerRouter');

// 设置静态资源托管的文件夹
app.use(express.static(path.resolve(__dirname, './public')));

// 设置能够使用 req.body 的中间件
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 设置使用cookie中间件
app.use(cookieParser());

// 设置session相关的内容
// 1. 当用户登录验证成功，我们将用户需要用到的信息比如nickName、isAdmin给写入到session对象中
// 2. 别的地方我们需要验证用户是否登录的话，就只需要判断 req.session.nickName 是否存在。
app.use(session({
  resave: false,
  saveUninitialized: false,  // 项目默认情况下是否需要主动生成一个session
  secret: 'MY_GOD'
}));

// 设置模板页面的存放路径与使用的何种模板引擎
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

app.use('/', (req, res, next) => {
  // 阻止  首页 | login.html | register.html 的缓存
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  next();
}, indexRouter);
app.use('/user', userRouter);
app.use('/banner', bannerRouter);

app.listen(3000);
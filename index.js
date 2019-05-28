const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');

const app = express();

app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000,
    keys: [keys.cookieKey]
  })
)

app.use(passport.initialize());
app.use(passport.session());

// 몽고DB 컬랙션에 들어갈 스키마(컬랙션의 레코드 타입 설정)
require('./models/User');

// Passportjs를 이용해 OAuth 로그인 구현
require('./services/passport');

// 로그인 라우트 설정
require('./routes/authRoutes')(app)

// 몽구스와 몽고DB를 연결시키기
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

app.listen(5000);
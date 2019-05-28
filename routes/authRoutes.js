const passport = require('passport');

module.exports = (app) => {
  // /auth/facebook은 로그인 요청을 할 주소
  app.get('/auth/facebook', passport.authenticate('facebook', {
    authType: 'rerequest', scope: ['public_profile', 'email']
  }));

  // /auth/facebook/callback은 페이스북 검증을 마치고 결과를 전송해주는 주소
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook'),
    (req, res) => {
      res.redirect('/')
    }
   )

  // 로그아웃
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  })

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  })
}
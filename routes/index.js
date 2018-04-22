module.exports = function (router, passport) {

  // public endpoints
  // GET root page, login page -- not used right now?
  // router.get('/', function(req, res) {
  //   res.json({ user: req.user });
  // });

  // GET route for when you click on login - passport authenticates through google
  router.get('/auth/google',
    passport.authenticate('google', { scope: ['openid email profile'] }));

  // If successful auth - redirects to home page, if not - redirects to /login
  router.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: process.env.APP_BASE_URL_DEV
    }),
    (req, res) => {
      // Authenticated successfully
      res.redirect(process.env.APP_BASE_URL_DEV);
    });

  // GET logout route - will sign person out of session
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect(process.env.APP_BASE_URL_DEV);
  });

};

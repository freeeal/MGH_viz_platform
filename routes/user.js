const connect = require('connect-ensure-login');

const db = require('../db/api');

module.exports = function (router) {
  // route paths are prepended with /user
  router.use((req, res, next) => {
      // if user is authenticated in the session, call the next() to call the
      // next request handler; Passport adds this method to request object.
      if (req.isAuthenticated()) {
        return next();
      } else {
        res.redirect('/');
      }
    }
  );

  router.get('/session', connect.ensureLoggedIn('/login'), (req, res) => {
    // console.log(req.user);
    res.json(req.user);
  });

  // route for getting user profile
  // router.get('/:id', connect.ensureLoggedIn('/login'), (req, res) => {
  //   if (!isNaN(req.params.id)) {
  //     db.findUserById(req.params.id).then(user => {
  //       if (user) {
  //         res.json(user);
  //       } else {
  //         resError(res, 404, "User Not Found");
  //       }
  //     });
  //   } else {
  //     resError(res, 500, "Invalid ID");
  //   }
  // });
  //
  // const resError = (res, statusCode, message) => {
  //   res.status(statusCode);
  //   res.json({message});
  // }

};

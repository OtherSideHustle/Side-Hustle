const User = require('./../model/userModel');

const userContoller = {};

userContoller.createUser = (req, res, next) => {
  console.log('creating user...');
  console.log(req.body.username);
  console.log(req.body.password);
 
  User.create({ username: req.body.username, password: req.body.password })
    .then((user) => {
      console.log(user)
      res.locals.userId = user._id;
      next();
    }).catch((err) => {
      res.render('./../client/signup', { error: err });
  })
};

userContoller.verifyUser = (req, res, next) => {
  console.log('checking user...');
  User.findOne({ username: req.body.username }, (err, user) => {
    if (user) {
      console.log('input pw:', req.body.password);
      user.comparePassword(req.body.password, (err, match) => {
        if (match) {
          res.locals.userId = user._id;
          next();
        } else{
          console.log('wrong password')
          res.render('./../client/index', { error: 'Please enter valid username and password.' });
        }
      });
    } else {
      console.log('no user')
      res.render('./../client/index', { error: 'Please enter valid username and password.' });
    }
  });
};


module.exports = userContoller;
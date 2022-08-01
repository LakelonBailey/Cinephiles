const router = require('express').Router();
const validator = require('validator');
const { User } = require('../../models');

// creates a new user
router.post('/', (req, res) => {
  const email = req.body.email
  if (!validator.isEmail(email)) {
    res.status(400).json({
      message: 'Please enter a valid email!',
      type: 'is-danger'
    })
  }
  else {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then(dbUserData => {
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
  
          res.json(dbUserData);
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});
  // logs in a user
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({
        message: 'No user with that email address!',
        type: 'is-danger'
      });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({
        message: 'Incorrect password!',
        type: 'is-danger'
      });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
  
      res.json({ user: dbUserData} );
    });
  });
});

  // logs out a user
  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  });

  
  module.exports = router;
  
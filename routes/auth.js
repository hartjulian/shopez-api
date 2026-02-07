const express = require('express');
const router = express.Router();
const passport = require('passport');
const userDb = require('../db/user');
const validator = require('validator');

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || !validator.isEmail(email)) {
    res.status(400).send('Bad Request');
  } else {
    const newUser = await userDb.createNewUser(email, password);
    if (newUser) {
      res.status(201).send(`User created.`);
    } else {
      res.status(409).send(`User with email ${email} already exists!`);
    };
  }
});

module.exports = router;

router.post('/login', passport.authenticate('local'), async (req, res) => {
    res.status(200).send('OK');
});

router.post('/logout', (req, res) => {
  req.logOut(() => {
    res.status(200).send('Logged Out');
  })
});

module.exports = router;
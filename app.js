const express = require('express');
const app = express();
require('dotenv').config();
const passport = require('passport');
require('./config/passport');
const session = require('express-session');
const { SESSION_SECRET } = require('./config');

const authRouter = require('./routes/auth');


app.use(
  session({
    secret: SESSION_SECRET,
    cookie: { maxAge: 300000000, secure: false },
    saveUninitialized: false,
    resave: false
  })
);

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);

module.exports = app;

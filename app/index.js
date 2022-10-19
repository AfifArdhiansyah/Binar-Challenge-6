const express = require('express');
const app = express();
const router = require('../config/routes');
const session = require('express-session');

/** Install JSON request parser */
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

/** Install express-session */
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: process.env.COOKIE_SECRET || 'Rahasia',
  resave: false,
  saveUninitialized: false,
}))

app.use(router);

module.exports = app;
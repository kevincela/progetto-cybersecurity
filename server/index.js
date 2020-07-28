const express = require('express');
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const config = require("./config");
const loginRouter = require("./routes/login");
const session = require('express-session');
const isLoggedIn = require('./middleware/login');

mongoose.connect(config.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
  secret: 'testsecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use('/', loginRouter);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/user', isLoggedIn, (req, res) => {
  res.render("user", { user: req.session.user });
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
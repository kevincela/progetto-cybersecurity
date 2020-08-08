const express = require('express');
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const config = require("./config");
const loginRouter = require("./routes/login");
const gdlRouter = require("./routes/gdl");
const imagesRouter = require("./routes/images");
const logRouter = require("./routes/log");
const session = require('express-session');
const isLoggedIn = require('./middleware/login');
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

mongoose.connect(config.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser(config.secret));
app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 60 * 60000 }
}));
app.use(flash());
app.use('/', loginRouter);
app.use('/gdl', gdlRouter);
app.use('/images', imagesRouter);
app.use('/log', logRouter);

app.get('/user', isLoggedIn, (req, res) => {
  res.render("user", { user: req.session.user, title: "Pagina Utente" });
});

app.get('/', (req, res) => {
  if(req.session.user)
    return res.redirect("/user");
  else
    return res.redirect("/login");
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
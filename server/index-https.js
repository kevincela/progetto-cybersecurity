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
const morgan = require("morgan");
const fs = require("fs");
const https = require('https');
const csurf = require('csurf')

let accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'requests.log'), { flags: 'a' })

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
  cookie: { secure: true, maxAge: 60 * 60000 }
}));
app.use(flash());
app.use(morgan('combined', { stream: accessLogStream }));
app.use(csurf({ cookie: true }));
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

const server = https.createServer({
    key: fs.readFileSync(`../localhost+2-key.pem`, 'utf8'),
    cert: fs.readFileSync(`../localhost+2.pem`, 'utf8')
}, app);

server.listen(3000, () => {
  console.log('App listening on port 3000');
});

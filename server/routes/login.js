const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

/* router.get('/user/:username/:password', (req, res) => {
    const saltRounds = 10;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(req.params.password, salt, (err, hash) => {
          if(!err) {
            const user = new User({
              username: req.params.username,
              password: hash,
              salt: salt,
              account: "bene"
            });
            user.save((err, user) => {
              if(err) {
                console.log(err);
              } else {
                res.send(user);
              }
            })
          }
        })
      })
}); */

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if(err || !user) {
            return res.redirect("/");
        } else {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(result && !err) {
                    //TODO: vedere associazione blockchain
                    req.session.user = {
                        username: req.body.username
                    };
                    return res.redirect("/")
                } else {
                    return res.redirect("/login");
                }
            });
        }
    });
});

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if(err) console.log(err);
    })
    return res.redirect("/login");
});

module.exports = router;
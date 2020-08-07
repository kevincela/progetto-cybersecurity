const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get('/login', (req, res) => {
    res.render('login', { title: "Login",  user: req.session.user, errorMsg: req.flash("error") });
});

router.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if(err || !user) {
            req.flash("error", "Utente o password errati, riprovare!");
            return res.redirect("/");
        } else {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(result && !err) {
                    //TODO: vedere associazione blockchain
                    req.session.user = {
                        username: req.body.username,
                        account: user.account
                    };
                    return res.redirect("/");
                } else {
                    req.flash("error", "Utente o password errati, riprovare!");
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
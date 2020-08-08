const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const logger = require("../logger");

router.get('/login', (req, res) => {
    res.render('login', { title: "Login",  user: req.session.user, errorMsg: req.flash("error"), csrfToken: req.csrfToken() });
});

router.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if(err || !user) {
            logger.info(`Tentativo di login errato con username ${req.body.username}`);
            req.flash("error", "Utente o password errati, riprovare!");
            return res.redirect("/");
        } else {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(result && !err) {
                    req.session.user = {
                        username: req.body.username,
                        account: user.account
                    };
                    logger.info(`Login eseguito dall'utente ${req.body.username}`);
                    return res.redirect("/");
                } else {
                    logger.info(`Tentativo di login errato da parte di ${req.body.username}`);
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
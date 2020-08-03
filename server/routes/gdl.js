const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/login")

router.get("/", isLoggedIn, (req, res) => {
    res.render("gdl", { title: "Giornale dei lavori" });
});

router.get("/invoke/:hash", isLoggedIn, (req, res) => {
    res.send("INVOCAZIONE SERVIZIO FOTOGRAMMETRIA SU " + req.params.hash);
});

module.exports = router;
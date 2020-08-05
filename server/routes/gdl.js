const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/login")

router.get("/", isLoggedIn, (req, res) => {
    res.render("gdl", { title: "Giornale dei lavori" });
});

router.post("/invoke/", isLoggedIn, (req, res) => {
    res.send("INVOCAZIONE SERVIZIO FOTOGRAMMETRIA SU " + req.body.images[0] + " " + req.body.annotazioni);
});

module.exports = router;
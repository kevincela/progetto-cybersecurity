const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/login")

router.get("/", isLoggedIn, (req, res) => {
    res.render("gdl", { title: "Giornale dei lavori" });
});

module.exports = router;
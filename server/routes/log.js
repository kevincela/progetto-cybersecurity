const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/login")

router.get("/", isLoggedIn, (req, res) => {
    res.render("log", { title: "Log servizio di fotogrammetria" });
});

module.exports = router;
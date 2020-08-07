const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/login");
const convertDate = require("../utils/convertdate");
const PhotogrammetryLogService = require("../services/photogrammetrylogservice");

router.get("/", isLoggedIn, async (req, res) => {
    let photogrammetryLogService = await PhotogrammetryLogService.getInstance(req.session.user.account);
    let log = await photogrammetryLogService.getLog();
    res.render("log", { title: "Log servizio di fotogrammetria", log: log, user: req.session.user,  convertDate: convertDate });
});

module.exports = router;
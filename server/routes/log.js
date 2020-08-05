const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/login");
const convertDate = require("../utils/convertdate");
const PhotogrammetryLogService = require("../services/photogrammetrylogservice");

router.get("/", isLoggedIn, async (req, res) => {
    let photogrammetryLogService = new PhotogrammetryLogService("0xed9d02e382b34818e88b88a309c7fe71e65f419d");
    let log = await photogrammetryLogService.getLog();
    res.render("log", { title: "Log servizio di fotogrammetria", log: log, convertDate: convertDate });
});

module.exports = router;
const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/login");
const convertDate = require("../utils/convertdate");
const PhotogrammetryService = require("../services/photogrammetryservice");
const PhotogrammetryLogService = require("../services/photogrammetrylogservice");
const ImageStorageService = require("../services/imagestorageservice");
const GDLService = require("../services/gdlservice");

router.get("/", isLoggedIn, async (req, res) => {
    let giornaleDeiLavoriService = new GDLService("0xed9d02e382b34818e88b88a309c7fe71e65f419d");
    let items = await giornaleDeiLavoriService.getGiornale();
    res.render("gdl", { title: "Giornale dei lavori", items: items, convertDate: convertDate });
});

router.post("/invoke/", isLoggedIn, async (req, res) => {
    let photogrammetryLogService = new PhotogrammetryLogService("0xed9d02e382b34818e88b88a309c7fe71e65f419d");
    let giornaleDeiLavoriService = new GDLService("0xed9d02e382b34818e88b88a309c7fe71e65f419d");
    let imagestorageservice = new ImageStorageService("0xed9d02e382b34818e88b88a309c7fe71e65f419d");
    let measures = null;
    try {
        measures = await PhotogrammetryService.invoke();
    } catch (error) {
        await photogrammetryLogService.storeItem("ERROR");
        return res.redirect("/images")
    }
    await photogrammetryLogService.storeItem("SUCCESS");
    await giornaleDeiLavoriService.storeItem(req.body.hash, measures, req.body.annotazioni);
    await imagestorageservice.setCompletedImage(req.body.hash);
    return res.redirect("/gdl/");
});

module.exports = router;
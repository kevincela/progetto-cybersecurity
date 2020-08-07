const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/login");
const convertDate = require("../utils/convertdate");
const PhotogrammetryService = require("../services/photogrammetryservice");
const PhotogrammetryLogService = require("../services/photogrammetrylogservice");
const ImageStorageService = require("../services/imagestorageservice");
const GDLService = require("../services/gdlservice");

router.get("/", isLoggedIn, async (req, res) => {
    let giornaleDeiLavoriService = await GDLService.getInstance(req.session.user.account);
    console.log(giornaleDeiLavoriService)
    let items = await giornaleDeiLavoriService.getGiornale();
    res.render("gdl", { title: "Giornale dei lavori", items: items, convertDate: convertDate });
});

router.post("/invoke/", isLoggedIn, async (req, res) => {
    let photogrammetryLogService = await PhotogrammetryLogService.getInstance(req.session.user.account);
    let giornaleDeiLavoriService = await GDLService.getInstance(req.session.user.account);
    let imagestorageservice = await ImageStorageService.getInstance(req.session.user.account);
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
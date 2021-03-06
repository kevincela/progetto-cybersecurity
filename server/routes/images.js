const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/login");
const ImageStorageService = require("../services/imagestorageservice");
const convertDate = require("../utils/convertdate");
const PhotogrammetryLogService = require("../services/photogrammetrylogservice");

router.get("/", isLoggedIn, async (req, res) => {
    let imagestorageservice = await ImageStorageService.getInstance({account: req.session.user.account});
    let images = await imagestorageservice.getImages();
    res.render("dimages", { 
        title: "Immagini scattate dal drone", 
        user: req.session.user,
        images: images, 
        convertDate: convertDate,
        errorMsg: req.flash("error")
    });
});

router.get("/:hash", isLoggedIn, async (req, res) => {
    let imagestorageservice = await ImageStorageService.getInstance({account: req.session.user.account});
    let photogrammetryLogService = await PhotogrammetryLogService.getInstance({account: req.session.user.account});
    try {
        let image = await imagestorageservice.getImageFromHash(req.params.hash);
        let measure = ""
        if(image.state == 1) {
            measure = await photogrammetryLogService.getMeasureFromHash(req.params.hash);
        }
        if(image && image.hashIpfs == req.params.hash) {
            res.render("dimages_show", {
                title: "Dettaglio Immagine",
                user: req.session.user,
                image: image,
                measures: measure,
                convertDate: convertDate,
                csrfToken: req.csrfToken()
            });
        }
        else return res.redirect("/images");
    } catch (error) {
        req.flash("error", "Si è verificato un problema con la visualizzazione dell'immagine.");
        return res.redirect("/images");
    }
});

module.exports = router;
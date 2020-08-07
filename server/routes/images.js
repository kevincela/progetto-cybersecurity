const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/login");
const ImageStorageService = require("../services/imagestorageservice");
const convertDate = require("../utils/convertdate");

router.get("/", isLoggedIn, async (req, res) => {
    let imagestorageservice = await ImageStorageService.getInstance(req.session.user.account);
    let images = await imagestorageservice.getImages();
    res.render("dimages", { 
        title: "Immagini scattate dal drone", 
        images: images, 
        convertDate: convertDate
    });
});

router.get("/:hash", isLoggedIn, async (req, res) => {
    let imagestorageservice = await ImageStorageService.getInstance(req.session.user.account);
    try {
        let image = await imagestorageservice.getImageFromHash(req.params.hash);
        if(image && image.hashIpfs == req.params.hash) {
            res.render("dimages_show", {
                title: "Dettaglio Immagine",
                image: image,
                convertDate: convertDate
            });
        }
        else return res.redirect("/images");
    } catch (error) {
        return res.redirect("/images");
    }
});

module.exports = router;
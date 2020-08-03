const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/login");
const ImageStorageService = require("../services/imagestorageservice");
const convertDate = require("../utils/convertdate");

router.get("/", isLoggedIn, async (req, res) => {
    let imagestorageservice = new ImageStorageService("0xcA843569e3427144cEad5e4d5999a3D0cCF92B8e");
    let images = await imagestorageservice.getImages();
    res.render("dimages", { 
        title: "Immagini scattate dal drone", 
        images: images, 
        convertDate: convertDate
    });
});

router.get("/:hash", isLoggedIn, async (req, res) => {
    let imagestorageservice = new ImageStorageService("0xcA843569e3427144cEad5e4d5999a3D0cCF92B8e");
    let images = await imagestorageservice.getImages();
    let image = images.find(el => el.hashIpfs == req.params.hash)
    if(image) {
        res.render("dimages_show", {
            title: "Dettaglio Immagine",
            image: image,
            convertDate: convertDate
        });
    }
    else return res.redirect("/images");
});

module.exports = router;
const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/login");
const ImageStorageService = require("../services/imagestorageservice");

router.get("/", isLoggedIn, async (req, res) => {
    let imagestorageservice = new ImageStorageService();
    let images = await imagestorageservice.getImages()
    res.render("dimages", { 
        title: "Immagini scattate dal drone", 
        images: images, 
        convertDate: (date) => {
            let dateObj = new Date(date);
            return dateObj.toLocaleString("it-IT");
        }
    });
});

module.exports = router;
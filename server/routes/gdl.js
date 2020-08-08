const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/login");
const convertDate = require("../utils/convertdate");
const PhotogrammetryService = require("../services/photogrammetryservice");
const PhotogrammetryLogService = require("../services/photogrammetrylogservice");
const ImageStorageService = require("../services/imagestorageservice");
const GDLService = require("../services/gdlservice");
const logger = require("../logger");

router.get("/", isLoggedIn, async (req, res) => {
    let giornaleDeiLavoriService = await GDLService.getInstance(req.session.user.account);
    let items = await giornaleDeiLavoriService.getGiornale();
    res.render("gdl", { title: "Giornale dei lavori", user: req.session.user, items: items, convertDate: convertDate });
});

router.get("/:id", isLoggedIn, async (req, res) => {
    let giornaleDeiLavoriService = await GDLService.getInstance(req.session.user.account);
    try {
        let item = await giornaleDeiLavoriService.getItem(req.params.id);
        res.render("gdl_show", { title: "Descrizione GDL", user: req.session.user, item: item, convertDate: convertDate });
    } catch (error) {
        res.redirect("/gdl/");
    }
});

router.post("/invoke/", isLoggedIn, async (req, res) => {
    try {
        logger.info(`Invocazione del servizio di fotogrammetria da parte di ${req.session.user.username} con account ${req.session.user.account}`);
        let photogrammetryLogService = await PhotogrammetryLogService.getInstance(req.session.user.account);
        let imagestorageservice = await ImageStorageService.getInstance(req.session.user.account);
        let measures = null;
        let image = await imagestorageservice.getImageFromHash(req.body.hash);

        if(image.state != 0) {
            return res.redirect("/images");
        }

        try {
            measures = await PhotogrammetryService.invoke();
        } catch (error) {
            await photogrammetryLogService.storeItem(0, req.body.hash, "");
            logger.error(`Fallimento invocazione del servizio di fotogrammetria per l'immagine ${req.body.hash}`);
            return res.redirect("/images")
        }
        await photogrammetryLogService.storeItem(1, req.body.hash, measures);
        await imagestorageservice.setProcessedImage(req.body.hash);
        return res.redirect(`/images/${req.body.hash}`);
    } catch(error) {
        logger.error(`Errore durante invocazione del servizio di fotogrammetria. Hash: ${req.body.hash}`);
        res.redirect("/images");
    }
});

router.post("/add", isLoggedIn, async (req, res) => {
    try {
        let giornaleDeiLavoriService = await GDLService.getInstance(req.session.user.account);
        let photogrammetryLogService = await PhotogrammetryLogService.getInstance(req.session.user.account);
        let imagestorageservice = await ImageStorageService.getInstance(req.session.user.account);

        let image = await imagestorageservice.getImageFromHash(req.body.hash);
        if(image.state != 1) {
            return res.redirect("/gdl/");
        }

        let measures = await photogrammetryLogService.getMeasureFromHash(req.body.hash);

        await giornaleDeiLavoriService.storeItem(req.body.hash, measures, req.body.annotazioni);
        await imagestorageservice.setCompletedImage(req.body.hash);
        logger.info(`Aggiunta dell'immagine ${req.body.hash} al gdl effettuata da ${req.session.user.username}`);
        return res.redirect("/gdl/");
    } catch(error) {
        logger.error(`Errore durante l'aggiunta al giornale dei lavori. Hash: ${req.body.hash}`);
        res.redirect("/gdl");
    }
});

module.exports = router;
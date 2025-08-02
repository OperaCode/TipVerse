const express = require("express");
const TipJar = require("../models/tipjarModel");
const router = express.Router();
const {createTipJar, getAllTipJars, addTip, updateTip} = require('../controllers/tipjarController');



router.post('/create', createTipJar);
router.get("/", getAllTipJars);
router.post("/:tipJarId", addTip);
// router.post("/tips", async (req, res)


module.exports = router;

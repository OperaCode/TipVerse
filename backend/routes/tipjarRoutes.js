const express = require("express");
const TipJar = require("../models/tipjarModel");
const router = express.Router();
const {createTipJar, getAllTipJars, addTip} = require('../controllers/tipjarController');



router.post('/create', createTipJar);
router.get("/", getAllTipJars);
router.post("/:tipJarId", addTip);


module.exports = router;

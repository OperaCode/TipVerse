const express = require("express");
const router = express.Router();
const {createTipJar, getAllTipJars, addTip,logOut} = require('../controllers/tipjarController');



router.post('/create', createTipJar);
router.get("/", getAllTipJars);
router.post("/:tipJarId", addTip);
router.post("/logout",logOut )



module.exports = router;

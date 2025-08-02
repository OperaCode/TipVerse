const express = require("express");
const TipJar = require("../models/tipjarModel");
const router = express.Router();

// router.post("/", async (req, res) => {
//   const { owner, name, message } = req.body;
//   try {
//     const existing = await TipJar.findOne({ owner });
//     if (existing) return res.status(400).json({ error: "TipJar already exists" });

//     const newTipJar = await TipJar.create({ owner, name, message });
//     res.status(201).json(newTipJar);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// routes/tipJars.js


const {createTipJar, getAllTipJars} = require('../controllers/tipjarController');

router.post('/create', createTipJar);


// router.get("/create" ,async (req, res) => {
//   try {
//     const { address, username, title, description } = req.body;

//     const existing = await TipJar.findOne({ username });
//     if (existing) return res.status(409).json({ error: "Username taken" });

//     const newTipJar = await TipJar.create({ address, username, title, description });
//     res.status(201).json(newTipJar);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to create tip jar" });
//   }
// });


router.get("/", getAllTipJars);


router.get("/:owner", async (req, res) => {
  try {
    const tipJar = await TipJar.findOne({ owner: req.params.owner });
    if (!tipJar) return res.status(404).json({ error: "Not found" });
    res.json(tipJar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

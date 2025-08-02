// controllers/createTipJar.js
const TipJar = require('../models/tipjarModel');

const createTipJar = async (req, res) => {
  try {
    const { title, description, goalAmount, walletAddress } = req.body;
    console.log(req.boy)
    if (!title || !description || !goalAmount || !walletAddress) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newTipJar = await TipJar.create({
      title,
      description,
      goalAmount,
      walletAddress,
    });

    res.status(201).json({ success: true, tipJar: newTipJar });
  } catch (error) {
    console.error('Error creating tip jar:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


// controllers/tipJarController.js
const getAllTipJars = async (req, res) => {
  try {
    const tipJars = await TipJar.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, tipJars });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tip jars' });
  }
};


const addTip = async (req, res) => {
  try {
    const { tipJarId } = req.params;
    const { amount, fromWallet } = req.body;

    console.log(`[ADD_TIP] Incoming tip | TipJarID: ${tipJarId}, Amount: ${amount}, From: ${fromWallet}`);

    if (!amount || !fromWallet) {
      console.warn(`[ADD_TIP] Missing fields | Amount: ${amount}, From: ${fromWallet}`);
      return res.status(400).json({ error: "Amount and sender wallet are required." });
    }

    const tipJar = await TipJar.findById(tipJarId);
    if (!tipJar) {
      console.warn(`[ADD_TIP] TipJar not found | ID: ${tipJarId}`);
      return res.status(404).json({ error: "Tip jar not found." });
    }

    tipJar.tips.push({ amount, fromWallet });
    await tipJar.save();

    console.log(`[ADD_TIP] Tip added successfully | TipJar: ${tipJarId}, Total Tips: ${tipJar.tips.length}`);

    res.status(200).json({ success: true, message: "Tip added!", tipJar });
  } catch (error) {
    console.error(`[ADD_TIP] Server error | TipJar: ${req.params.tipJarId}`, error);
    res.status(500).json({ error: "Server error" });
  }
};



module.exports = {createTipJar,getAllTipJars, addTip};

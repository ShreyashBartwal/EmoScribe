const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');
const axios = require('axios');

// Create a new entry
router.post('/', async (req, res) => {
  try {
    const { entry } = req.body;
    const sentimentResponse = await axios.post('http://localhost:5001/analyze', { entry });
    const sentiment = sentimentResponse.data;

    const newEntry = new Entry({ entry, sentiment });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all entries
router.get('/', async (req, res) => {
  try {
    const entries = await Entry.find();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

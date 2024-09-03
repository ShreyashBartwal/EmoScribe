const express = require('express');
const Entry = require('../models/Entry');
const axios = require('axios');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a new entry
router.post('/entries', auth, async (req, res) => {
    const { entry } = req.body;

    if (!entry) {
        return res.status(400).json({ error: 'No entry provided' });
    }

    try {
        // Perform sentiment analysis first
        const response = await axios.post('http://localhost:5003/analyze', { entry });
        const sentimentData = response.data;

        const newEntry = new Entry({
            user: req.user.id,
            entry,
            sentiment: {
                score: sentimentData.score,
                comparative: sentimentData.comparative,
                positive: sentimentData.positive,
                negative: sentimentData.negative
            },
            createdAt: new Date()
        });

        const savedEntry = await newEntry.save();

        res.json({
            id: savedEntry._id,
            entry: savedEntry.entry,
            sentiment: savedEntry.sentiment
        });
    } catch (error) {
        console.error('Error details:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        if (error.response && error.response.data) {
            return res.status(500).json({ error: 'Failed to analyze sentiment', details: error.response.data });
        }
        res.status(500).json({ error: 'Failed to save entry', details: error.message });
    }
});

// Fetch all entries for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
      const entries = await Entry.find({ user: req.user.id });
      res.json(entries);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch entries' });
  }
});

// Fetch a specific entry by ID
router.get('/:id', auth, async (req, res) => {
  try {
      const entry = await Entry.findById(req.params.id);
      if (!entry) {
          return res.status(404).json({ error: 'Entry not found' });
      }
      if (entry.user.toString() !== req.user.id) {
          return res.status(401).json({ error: 'Not authorized' });
      }
      res.json(entry);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch entry' });
  }
});

// Update an entry by ID
router.put('/:id', auth, async (req, res) => {
  const { entry } = req.body;

  if (!entry) {
      return res.status(400).json({ error: 'No entry provided' });
  }

  try {
      const existingEntry = await Entry.findById(req.params.id);
      if (!existingEntry) {
          return res.status(404).json({ error: 'Entry not found' });
      }
      if (existingEntry.user.toString() !== req.user.id) {
          return res.status(401).json({ error: 'Not authorized' });
      }

      // Perform sentiment analysis if entry is updated
      const response = await axios.post('http://localhost:5003/analyze', { entry });
      const sentimentData = response.data;

      existingEntry.entry = entry;
      existingEntry.sentiment = {
          score: sentimentData.score,
          comparative: sentimentData.comparative,
          positive: sentimentData.positive,
          negative: sentimentData.negative
      };
      existingEntry.createdAt = new Date();

      const updatedEntry = await existingEntry.save();

      res.json(updatedEntry);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update entry' });
  }
});

// Delete an entry by ID
router.delete('/:id', auth, async (req, res) => {
  try {
      const entry = await Entry.findById(req.params.id);
      if (!entry) {
          return res.status(404).json({ error: 'Entry not found' });
      }
      if (entry.user.toString() !== req.user.id) {
          return res.status(401).json({ error: 'Not authorized' });
      }

      await entry.remove();
      res.json({ message: 'Entry removed' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete entry' });
  }
});



module.exports = router;
const express = require('express');
   const cors = require('cors');
   const bodyParser = require('body-parser');
   const Sentiment = require('sentiment');

   const app = express();
   const port = 5003;  // Changed from 5002 to 5003

   const sentiment = new Sentiment();

   app.use(cors());
   app.use(bodyParser.json());

   app.post('/analyze', (req, res) => {
     const { entry } = req.body;

     if (!entry) {
       return res.status(400).json({ error: 'No entry provided' });
     }

     try {
       // Perform sentiment analysis
       const result = sentiment.analyze(entry);

       res.json({ 
         score: result.score,
         comparative: result.comparative,
         positive: result.positive,
         negative: result.negative
       });
     } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Failed to analyze sentiment' });
     }
   });

   app.listen(port, () => {
     console.log(`Sentiment analysis service running on port ${port}`);
   });
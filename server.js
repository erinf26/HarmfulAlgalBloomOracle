const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));

// Serve lake data
app.get('/api/lakes', (req, res) => {
  fs.readFile('/Users/erinfoley/Desktop/nasa2024/data/lakes.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading lake data');
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

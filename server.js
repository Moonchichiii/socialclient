const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

const BASE_URL = process.env.VITE_BASE_URL;

app.use(compression());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'dist'))); 
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html')); 
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


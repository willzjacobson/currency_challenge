/* eslint no-unused-vars: 1 */

const cors = require('cors');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);

const { port } = require('../config');

// Allow cross-domain requests
app.use(cors());

// Initialize body-parsing middleware
require('./middleware')(app);

// Initialize routing middleware
app.use('/api', require('./routes'));

// Serve files from public directory
app.use(express.static(path.join(__dirname, '../../dist')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.log('Request reached error handling', err);
  res.sendStatus(err.status || 500);
});

http.listen(port, () =>
  console.log(`The server is listening closely on port ${port}...`)
);

module.exports = http;

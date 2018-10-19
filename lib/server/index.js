/* eslint no-unused-vars: 1 */

import cors from 'cors';
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);

import serverRender from '../renderers/server';
const { PORT } = require('../config');

// Set the view engine to ejs
// app.set('view engine', 'ejs');

// Allow cross-domain requests
app.use(cors());

// Initialize body-parsing middleware
require('./middleware')(app);

// Initialize routing middleware
app.use('/api', require('./routes'));

// Serve files from public directory
app.use(express.static(path.join(__dirname, '../../dist')));

// app.get('*', async (req, res) => {
//   const initialContent = await serverRender();
//   res.render('index', { initialContent });
// });

// Error handling middleware
app.use((err, req, res, next) => {
  console.log('Request reached error handling', err);
  res.sendStatus(err.status || 500);
});

http.listen(PORT, () =>
  console.log(`The server is listening closely on port ${PORT}...`)
);

module.exports = http;

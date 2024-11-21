const express = require('express');
const serverless = require('serverless-http');

const app = express();

app.get('/status', (req, res) => {
  res.json({
    status: 'running',
    version: process.env.npm_package_version,
    message: 'Note: TCP server functionality is not available in serverless deployment'
  });
});

module.exports.handler = serverless(app);
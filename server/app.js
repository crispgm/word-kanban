// server/app.js

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable no-console */
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const FormData = require('form-data');

const app = express();
const Word = require('./actions/word');
const { translate } = require('./actions/translate');

// webpack-dev-middleware
if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackConfig = require('../config/webpack.dev.config.js');
  const compiler = webpack(webpackConfig);
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  // Dev
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));
  // HMR
  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));
}

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
// Setup gzip
app.use(compression());
// Serve index
app.use(express.static(path.resolve(__dirname, '..', 'dist')));
// Serve static assets
app.use('/public', express.static(path.resolve(__dirname, '.', 'public')));

// Parse body
const jsonParser = bodyParser.json();

app.get('/translate', (req, res) => {
  translate(req, res);
});

app.get('/word/create', (req, res) => {
  return Word.create(req, res);
});

app.get('/word/get', (req, res) => {
  return Word.get(req, res);
});

// Always return the main index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});

// Handle 404
app.use((req, res, next) => {
  res.redirect(404, '/#/404');
  next();
});

module.exports = app;

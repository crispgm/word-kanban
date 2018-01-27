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
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');

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

// Enable CORS
app.use(cors());

// Enable the use of request body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Create middleware for checking the JWT
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://crispgm.au.auth0.com/.well-known/jwks.json`
  }),
  audience: 'api.word-kanban.words',
  issuer: 'https://crispgm.au.auth0.com/',
  algorithms: [ 'RS256' ]
});

app.get('/translate', checkJwt, (req, res) => {
  translate(req, res);
});

app.get('/word/get', checkJwt, (req, res) => {
  return Word.get(req, res);
});

app.post('/word/create', checkJwt, (req, res) => {
  return Word.create(req, res);
});

app.post('/word/move', checkJwt, (req, res) => {
  return Word.move(req, res);
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

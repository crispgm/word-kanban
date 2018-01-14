// Test DB connection

const { captureStream } = require('./util.js');
const sequelize = require('../server/models/connection.js');

var assert = require('assert');

describe('conn', function() {
  var hook;

  beforeEach(function() {
    hook = captureStream(process.stdout);
  });

  afterEach(function(){
    hook.unhook(); 
  });

  it('connect to db', function() {
    sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
  });
});

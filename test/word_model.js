// Test Word Model

const models = require('../server/models');
var assert = require('assert');

describe('word model', function() {
  it('fetch words', function() {
    models.Words.findAll({
      where: {
        status: 0,
      },
      limit: 10,
    })
    .then(words => {
      assert.ok(true);
    })
    .catch(error => {
      assert.fail();
    });
  });
});

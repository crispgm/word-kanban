// Test Word Model

const assert = require('assert');
const models = require('../server/models');

describe('word model', () => {
  it('fetches words from the database', async () => {
    const words = await models.Words.findAll({
      where: {
        status: 0,
      },
      limit: 10,
    });
    assert.ok(Array.isArray(words));
  });
});

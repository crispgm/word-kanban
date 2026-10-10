const assert = require('assert');
const crypto = require('crypto');
const migration = require('../server/migrations/20261010100000-hash-api-tokens');

describe('hash API tokens migration', () => {
  it('hashes each active legacy token', async () => {
    const updates = [];
    const queryInterface = {
      sequelize: {
        query: async () => [[
          { id: 1, token: 'legacy-token' },
          { id: 2, token: 'another-token' },
        ]],
      },
      bulkUpdate: async (table, values, where) => {
        updates.push({ table, values, where });
      },
    };

    await migration.up(queryInterface);

    assert.deepStrictEqual(updates, [
      {
        table: 'Tokens',
        values: {
          token: crypto.createHash('sha256').update('legacy-token').digest('hex'),
        },
        where: { id: 1 },
      },
      {
        table: 'Tokens',
        values: {
          token: crypto.createHash('sha256').update('another-token').digest('hex'),
        },
        where: { id: 2 },
      },
    ]);
  });
});

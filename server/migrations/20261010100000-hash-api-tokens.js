'use strict';

const crypto = require('crypto');

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

module.exports = {
  up: async (queryInterface) => {
    const [tokens] = await queryInterface.sequelize.query(
      'SELECT "id", "token" FROM "Tokens" WHERE "status" = 0',
    );

    await Promise.all(tokens.map(({ id, token }) => queryInterface.bulkUpdate(
      'Tokens',
      { token: hashToken(token) },
      { id },
    )));
  },
  down: async () => {
    throw new Error('Hashed API tokens cannot be converted back to plaintext.');
  },
};

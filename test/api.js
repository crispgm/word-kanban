const assert = require('assert');
const crypto = require('crypto');
const API = require('../server/actions/api');
const models = require('../server/models');

describe('integration API token validation', () => {
  it('hashes tokens before persistence and lookup', () => {
    const expectedHash = crypto.createHash('sha256').update('example-token').digest('hex');
    assert.strictEqual(API.hashToken('example-token'), expectedHash);
  });

  it('rejects an unknown token without creating a word', async () => {
    const originalFindOne = models.Tokens.findOne;
    const originalCreate = models.Words.create;
    let createCalled = false;
    let queriedTokenHash;

    models.Tokens.findOne = ({ where }) => {
      queriedTokenHash = where.token;
      return Promise.resolve(null);
    };
    models.Words.create = () => {
      createCalled = true;
      return Promise.resolve();
    };

    const payload = await new Promise((resolve) => {
      API.createWord(
        { body: { token: 'unknown-token', word: 'example' } },
        { send: resolve },
      );
    });

    models.Tokens.findOne = originalFindOne;
    models.Words.create = originalCreate;

    assert.deepStrictEqual(payload, {
      status: 3,
      message: 'Invalid token',
    });
    assert.strictEqual(queriedTokenHash, API.hashToken('unknown-token'));
    assert.strictEqual(createCalled, false);
  });

  it('stores only a hash when generating a token and revokes prior tokens', async () => {
    const originalTransaction = models.sequelize.transaction;
    const originalUpdate = models.Tokens.update;
    const originalCreate = models.Tokens.create;
    let storedToken;
    let revocationOptions;

    models.sequelize.transaction = callback => callback('transaction');
    models.Tokens.update = (values, options) => {
      assert.deepStrictEqual(values, { status: 1 });
      revocationOptions = options;
      return Promise.resolve([1]);
    };
    models.Tokens.create = (values, options) => {
      storedToken = values.token;
      assert.strictEqual(options.transaction, 'transaction');
      return Promise.resolve({ status: 0, id: 1 });
    };

    const payload = await new Promise((resolve) => {
      API.generateToken(
        { user: { sub: 'auth0|user' } },
        { send: resolve },
      );
    });

    models.sequelize.transaction = originalTransaction;
    models.Tokens.update = originalUpdate;
    models.Tokens.create = originalCreate;

    assert.match(payload.token, /^[A-Za-z0-9_-]{43}$/);
    assert.strictEqual(storedToken, API.hashToken(payload.token));
    assert.deepStrictEqual(revocationOptions.where, {
      userId: 'auth0|user',
      status: 0,
    });
    assert.strictEqual(revocationOptions.transaction, 'transaction');
  });

  it('does not expose a stored token hash', async () => {
    const originalFindAll = models.Tokens.findAll;
    models.Tokens.findAll = () => Promise.resolve([{ token: 'stored-hash' }]);

    const payload = await new Promise((resolve) => {
      API.getToken({ user: { sub: 'auth0|user' } }, { send: resolve });
    });

    models.Tokens.findAll = originalFindAll;
    assert.deepStrictEqual(payload, { status: 0, active: true });
  });

  it('rejects an empty word before looking up a token', () => {
    const originalFindOne = models.Tokens.findOne;
    models.Tokens.findOne = () => assert.fail('Token lookup should not occur');
    let statusCode;
    let payload;
    const response = {
      status: (code) => {
        statusCode = code;
        return response;
      },
      send: (body) => {
        payload = body;
      },
    };

    API.createWord({ body: { token: 'token', word: '' } }, response);
    models.Tokens.findOne = originalFindOne;

    assert.strictEqual(statusCode, 400);
    assert.deepStrictEqual(payload, { status: 1, message: 'Invalid word entry' });
  });
});

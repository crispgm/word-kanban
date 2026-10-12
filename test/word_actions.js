const assert = require('assert');
const Word = require('../server/actions/word');
const models = require('../server/models');

describe('word actions', () => {
  it('rejects an empty authenticated word before creating it', () => {
    const originalCreate = models.Words.create;
    models.Words.create = () => assert.fail('Word creation should not occur');
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

    Word.create({ body: { word: '' }, user: { sub: 'auth0|user' } }, response);
    models.Words.create = originalCreate;

    assert.strictEqual(statusCode, 400);
    assert.deepStrictEqual(payload, { status: -1, message: 'Invalid word entry' });
  });

  it('binds the user id in the activity query', async () => {
    const originalQuery = models.sequelize.query;
    let query;
    let options;
    models.sequelize.query = (sql, queryOptions) => {
      query = sql;
      options = queryOptions;
      return Promise.resolve([]);
    };

    const payload = await new Promise((resolve) => {
      Word.userRecord({ user: { sub: "auth0|' OR true --" } }, { send: resolve });
    });

    models.sequelize.query = originalQuery;

    assert.match(query, /"userId" = :userId/);
    assert.strictEqual(options.replacements.userId, "auth0|' OR true --");
    assert.strictEqual(options.type, models.Sequelize.QueryTypes.SELECT);
    assert.strictEqual(payload.data.length, 30);
  });

  it('returns activity data with the configured database dialect', async () => {
    const userId = `test|activity-${Date.now()}`;
    await models.Words.create({
      text: 'activity test',
      listId: 1,
      userId,
      status: 0,
      createdAt: new Date(Date.now() - (2 * 24 * 60 * 60 * 1000)),
    });

    try {
      const payload = await new Promise((resolve) => {
        Word.userRecord({ user: { sub: userId } }, { send: resolve });
      });

      assert.strictEqual(payload.status, 0);
      assert.strictEqual(payload.data.length, 30);
      assert.ok(payload.data.some((entry) => entry.count === 1));
    } finally {
      await models.Words.destroy({ where: { userId } });
    }
  });
});

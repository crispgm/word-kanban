const assert = require('assert');
const path = require('path');

const configPath = require.resolve('../server/config/config');

function loadConfig(dialect) {
  const previousDialect = process.env.DB_DIALECT;
  process.env.DB_DIALECT = dialect;
  delete require.cache[configPath];
  const config = require('../server/config/config');

  if (previousDialect === undefined) {
    delete process.env.DB_DIALECT;
  } else {
    process.env.DB_DIALECT = previousDialect;
  }
  delete require.cache[configPath];
  return config;
}

describe('database configuration', () => {
  it('uses separate local SQLite files when SQLite is selected', () => {
    const config = loadConfig('sqlite');

    assert.strictEqual(config.development.dialect, 'sqlite');
    assert.strictEqual(config.test.dialect, 'sqlite');
    assert.strictEqual(
      config.development.storage,
      path.resolve(__dirname, '..', 'server', 'data', 'word-kanban-dev.sqlite'),
    );
    assert.strictEqual(
      config.test.storage,
      path.resolve(__dirname, '..', 'server', 'data', 'word-kanban-test.sqlite'),
    );
  });

  it('retains PostgreSQL configuration when PostgreSQL is selected', () => {
    const config = loadConfig('postgres');

    assert.strictEqual(config.development.dialect, 'postgres');
    assert.strictEqual(config.test.database, 'word_kanban_test');
    assert.strictEqual(config.production.dialect, 'postgres');
  });
});

const path = require('path');

const localDialect = process.env.DB_DIALECT || (process.platform === 'darwin' ? 'sqlite' : 'postgres');

function localDatabase(name) {
  if (localDialect === 'sqlite') {
    return {
      dialect: 'sqlite',
      storage: process.env.SQLITE_STORAGE || path.resolve(__dirname, '..', 'data', `${name}.sqlite`),
      logging: false,
    };
  }

  if (localDialect === 'postgres') {
    return {
      username: process.env.DB_USERNAME || 'dripcoffee',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || name.replace(/-/g, '_'),
      host: process.env.DB_HOSTNAME || '127.0.0.1',
      dialect: 'postgres',
    };
  }

  throw new Error(`Unsupported DB_DIALECT: ${localDialect}`);
}

module.exports = {
  development: localDatabase('word-kanban-dev'),
  test: localDatabase('word-kanban-test'),
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL'
  }
};

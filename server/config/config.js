module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'dripcoffee',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'word_kanban_dev',
    host: process.env.DB_HOSTNAME || '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USERNAME || 'dripcoffee',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'word_kanban_test',
    host: process.env.DB_HOSTNAME || '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL'
  }
};

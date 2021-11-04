import { config } from './src/config';

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: config.get('db').host,
      port: config.get('db').port,
      database: config.get('db').database,
      user: config.get('db').username,
      password: config.get('db').password,
      multipleStatements: true
    },
    pool: {
      min: 1,
      max: 5
    },
    migrations: {
      tableName: "migrations",
      directory: './src/migrations',
    }
  },
};

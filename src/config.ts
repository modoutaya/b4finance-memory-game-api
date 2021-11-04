import convict from 'convict';

export const config = convict({
  db: {
    host: {
      format: String,
      default: '',
      env: 'POSTGRES_HOST',
    },
    port: {
      format: 'port',
      default: 3306,
      env: 'POSTGRES_PORT',
    },
    username: {
      format: String,
      default: '',
      env: 'POSTGRES_USERNAME',
    },
    password: {
      format: String,
      default: '',
      sensitive: true,
      env: 'POSTGRES_PASSWORD',
    },
    database: {
      format: String,
      default: '',
      env: 'POSTGRES_DATABASE',
    },
  },
  http: {
    port: {
      doc: 'The HTTP port',
      format: 'port',
      default: 5000,
      env: 'HTTP_PORT',
    },
  },
}).validate({ allowed: 'strict' });

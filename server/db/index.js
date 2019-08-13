const pg = require('pg');
require('dotenv').config({path: '../.env'});

const pgConfig = {
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_LOCAL_HOST,
  database: process.env.POSTGRES_DB_NAME,
  //max: process.env.POSTGRES_MAX_CLIENT,
};

const pgPool = new pg.Pool(pgConfig);

module.exports = pgPool;
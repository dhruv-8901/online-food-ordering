require("dotenv").config();

module.exports = {
  development: {
    client: process.env.DB_CONNECTION || "mysql",
    port: +process.env.DB_PORT || 3306,
    connection: {
      host: process.env.DB_HOST || "127.0.0.1",
      user: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_DATABASE || "food_ordering",
      log: true,
    },
    migrations: {
      directory: `${__dirname}/knex/migrations`,
    },
    seeds: {
      directory: `${__dirname}/knex/seeds`,
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: process.env.DB_CONNECTION || "mysql",
    port: +process.env.DB_PORT || 3306,
    connection: {
      host: process.env.DB_HOST || "127.0.0.1",
      user: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "password",
      database: process.env.DB_DATABASE || "http_demo_es6",
      charset: "utf8",
    },
    migrations: {
      directory: `${__dirname}/knex/migrations`,
    },
    seeds: {
      directory: `${__dirname}/knex/seeds`,
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};

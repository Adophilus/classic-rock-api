import { Dialect } from "sequelize"

const defaultDialect: Dialect = "sqlite"

const config = {
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000
  },
  db: {
    uri: process.env.DB_URI ? process.env.DB_URI : "sqlite::memory:",
    dialect: process.env.DB_DIALECT ? String(process.env.DB_DIALECT) as Dialect : defaultDialect,
    username: process.env.DB_USERNAME ? String(process.env.DB_USERNAME) : "",
    password: process.env.DB_PASSWORD ? String(process.env.DB_PASSWORD) : ""
  }
}

export default config

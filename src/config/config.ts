require("dotenv").config();
import { Dialect, Options } from "sequelize";

interface ConfigTs {
    development: Options;
    test: Options;
    production: Options;
}

const config: ConfigTs = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT as Dialect,
        port: parseInt(process.env.DB_PORT || "3306", 10),
        dialectOptions: {
            charset: "utf8",
        },
        define: {
            timestamps: false,
        },
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT as Dialect,
        port: parseInt(process.env.DB_PORT || "3306", 10),
        dialectOptions: {
            charset: "utf8",
        },
        define: {
            timestamps: false,
        },
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT as Dialect,
        port: parseInt(process.env.DB_PORT || "3306", 10),
        dialectOptions: {
            charset: "utf8",
        },
        define: {
            timestamps: false,
        },
    },
};

module.exports = config;
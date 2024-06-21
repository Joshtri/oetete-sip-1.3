import { Sequelize } from "sequelize";
import { config } from "dotenv";
import envFile from "./envConfig.js";
import path from 'path';
import mysql2 from 'mysql2';

// Load environment variables from the appropriate .env file
config({ path: path.resolve(process.cwd(), envFile) }); 

// const db = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASS,
//     {
//         host: process.env.DB_HOST,
//         dialect: process.env.DB_DIALECT
//     }
// );

const db = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database:process.env.DB_NAME,
    dialect: 'mysql',
    dialectModule: mysql2, // Use mysql2 as the dialect module
    benchmark: true,
    port: process.env.DB_PORT

});

export default db;
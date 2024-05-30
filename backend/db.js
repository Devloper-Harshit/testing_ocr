require('dotenv').config();
const { response } = require("express");
const { Pool } = require("pg");

// const { Pool } = require("mysql"); trying to add mysql

const pool = new Pool({
    user: process.env.USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});
module.exports = pool;


// 8888888888888888888888888888888888888888

// const db = require('db')
// db.connect({
//     user: process.env.USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASS,
//     port: process.env.port
// })






// require('dotenv').config();
// const mysql = require("mysql");

// const pool = mysql.createPool({
//     user: process.env.USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASS,
//     port: process.env.DB_PORT
// });

// module.exports = pool;


// require('dotenv').config();
// const mysql = require("mysql");

// const pool = mysql.createPool({
//     user: "mysql",
//     host: "localhost",
//     database: 'ocrdatabase',
//     password: "harshdata",
//     port: 5432,
// });

// module.exports = pool;



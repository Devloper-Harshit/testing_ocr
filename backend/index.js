require('dotenv').config();

const express = require('express');
const cors = require('cors');
const form = express();
form.use(express.json());
const PORT = process.env.PORT || 5000;
const pool = require('./db');

form.use(cors());

// THIS IS FOR CAMERA FIELD
form.post('/formdata', (req, res) => {
    const { name, email, phone, company_address } = req.body;
    
    const insertqry = `INSERT INTO datatable (name, email, phone, company_address) VALUES (?, ?, ?, ?)`;
    
    pool.query(insertqry, [name, email, phone, company_address])
        .then((response) => {
            console.log("Data Saved");
            res.status(201).json({ message: "Your data is being uploaded!" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
});

// THIS IS FOR REGISTRATION
form.post('/register', (req, res) => {
    const { email, password, mobile } = req.body;
    
    const insertqry = `INSERT INTO register (email, password, mobile) VALUES (?, ?, ?)`;
    
    pool.query(insertqry, [email, password, mobile])
        .then((response) => {
            console.log("Register successfully");
            res.status(201).json({ message: "Register successfully" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
});

// this is used for login 
form.get('/login', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM register');
        res.json(result.rows);
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).send('Server error');
    }
});

form.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});




/*********************** case 2**************************** */


// require('dotenv').config();

// const express = require('express');
// const cors = require('cors');
// const form = express();
// form.use(express.json());
// const PORT = process.env.PORT || 5000;
// const pool = require('./db');

// form.use(cors());

// // THIS IS FOR CAMERA FIELD
// form.post('/formdata', (req, res) => {
//     const { name, email, phone, company_address } = req.body;
    
//     const insertqry = `INSERT INTO datatable (name, email, phone, company_address) VALUES (?, ?, ?, ?)`;
    
//     pool.query(insertqry, [name, email, phone, company_address], (err, results) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ error: "Internal Server Error" });
//         }
//         console.log("Data Saved");
//         res.status(201).json({ message: "Your data is being uploaded!" });
//     });
// });

// // THIS IS FOR REGISTRATION
// form.post('/register', (req, res) => {
//     const { email, password, mobile } = req.body;
    
//     const insertqry = `INSERT INTO register (email, password, mobile) VALUES (?, ?, ?)`;
    
//     pool.query(insertqry, [email, password, mobile], (err, results) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ error: "Internal Server Error" });
//         }
//         console.log("Register successfully");
//         res.status(201).json({ message: "Register successfully" });
//     });
// });

// // this is used for login 
// form.get('/login', (req, res) => {
//     const selectqry = 'SELECT * FROM register';
    
//     pool.query(selectqry, (err, results) => {
//         if (err) {
//             console.error('Error executing query', err.stack);
//             return res.status(500).send('Server error');
//         }
//         res.json(results);
//     });
// });

// form.listen(PORT, () => {
//     console.log(`Server running on ${PORT}`);
// });


/*********************** case3**************************** */


// require('dotenv').config();

// const express = require('express');
// const cors = require('cors');
// const mysql = require('mysql');
// const util = require('util');
// const form = express();
// form.use(express.json());
// const PORT = process.env.PORT || 5000;

// const pool = mysql.createPool({
//     user: process.env.USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASS,
//     port: process.env.DB_PORT
// });

// // Promisify the pool.query method
// pool.query = util.promisify(pool.query);

// form.use(cors());

// // THIS IS FOR CAMERA FIELD
// form.post('/formdata', async (req, res) => {
//     const { name, email, phone, company_address } = req.body;
    
//     const insertqry = `INSERT INTO datatable (name, email, phone, company_address) VALUES (?, ?, ?, ?)`;
    
//     try {
//         await pool.query(insertqry, [name, email, phone, company_address]);
//         console.log("Data Saved");
//         res.status(201).json({ message: "Your data is being uploaded!" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// // THIS IS FOR REGISTRATION
// form.post('/register', async (req, res) => {
//     const { email, password, mobile } = req.body;
    
//     const insertqry = `INSERT INTO register (email, password, mobile) VALUES (?, ?, ?)`;
    
//     try {
//         await pool.query(insertqry, [email, password, mobile]);
//         console.log("Register successfully");
//         res.status(201).json({ message: "Register successfully" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// // this is used for login 
// form.get('/login', async (req, res) => {
//     const selectqry = 'SELECT * FROM register';
    
//     try {
//         const results = await pool.query(selectqry);
//         res.json(results);
//     } catch (error) {
//         console.error('Error executing query', error.stack);
//         res.status(500).send('Server error');
//     }
// });

// form.listen(PORT, () => {
//     console.log(`Server running on ${PORT}`);
// });

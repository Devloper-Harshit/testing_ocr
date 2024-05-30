require('dotenv').config();

// import 'dotenv/config';


const express = require('express');
const cors = require('cors');
const form = express();
form.use(express.json());
const PORT = process.env.PORT || 5000;
const pool = require('./db')
const bodyParser = require('body-parser')

form.use(bodyParser.urlencoded({ extended: false }));

form.use(
    cors()
)

// THIS IDS FOR CAMERA FIELD
    form.post('/formdata',(req,res)=>{

        const name = req.body["name"]
        const email = req.body["email"]
        const phone = req.body["phone"]
        const company_address = req.body["company_address"]
        
    
        const insertqry = `INSERT INTO datatable (name,email,phone,company_address) 
                                VALUES ( '${name}','${email}','${phone}','${company_address}');`;
    
        pool.query(insertqry).then((response)=>{
            alert("Your Data is being uploaded!");
            console.log("Data Saved");
            
        })
        .catch((err)=>{
            console.log(err)
            
        })
        res.json();
    
    })


    //THIS IS FOR REGISTRATION
    form.post('/register',(req,res)=>{

     
        const email = req.body["email"]
        const password = req.body["password"]
        const mobile = req.body["mobile"]
        
    
        const insertqry = `INSERT INTO register (email,password,mobile) 
                                VALUES ( '${email}','${password}','${mobile}');`;
    
        pool.query(insertqry).then((response)=>{
            console.log("Register successfully");
            alert("Register successfully");
            
        })
        .catch((err)=>{
            console.log(err)
            
        })
        res.json();
    
    })


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
      
    
form.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})
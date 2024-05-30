require('dotenv').config();

const express = require('express');
const db = require('./try_php_db');
const cors = require('cors');
const app = express();

const port =  process.env.PORT || 5000;
app.use(cors());
// Middleware to parse JSON and URL-encoded data
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.post('/formdata', (req, res) => {
  const name = req.body["name"];
  const email = req.body["email"];
  const phone = req.body["phone"];
  const company_address = req.body["company_address"];

  const insertqry = `INSERT INTO datatable (name, email, phone, company_address) 
                     VALUES ('${name}', '${email}', '${phone}', '${company_address}');`;

  db.query(insertqry, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving camera data');
      return;
    }
    res.json({ message: "Your camera data is being uploaded!", data: response });
    console.log("camera Data Saved");
  });
});



//THIS IS FOR REGISTRATION
app.post('/register',(req,res)=>{
    const email = req.body["email"];
    const password = req.body["password"];
    const mobile = req.body["mobile"];
        
    
    const insertqry = `INSERT INTO register (email,password,mobile) 
    VALUES ( '${email}','${password}','${mobile}');`;
    
    // db.query(insertqry).then((response)=>{
        //     console.log("Register successfully");
        //     alert("Register successfully");
            
        // })
        // .catch((err)=>{
        //     console.log(err)
        
        // })
        // res.json();
    
        db.query(insertqry, (err, response) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error in saving registering data');
                return;
              }
              res.json({ message: "Your are Register successfully", data: response });
              console.log("registered Data Saved");
        });
        
    })


    // this is used for login 

    app.get('/login', async (req, res) => {
        try {
          const result = await db.query('SELECT * FROM register');
          res.json(result.rows);
        } catch (error) {
          console.error('Error executing query', error.stack);
          res.status(500).send('Server error');
        }
      });
      
    

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

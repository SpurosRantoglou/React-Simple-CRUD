const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

//Get connection with the db
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password:'password',
    database: 'employeesystem'
})


//Insert
app.post('/create', (req, res)=>{

    console.log(req.body)
    const name = req.body.name
    const age = req.body.age
    const country = req.body.country
    const position = req.body.position
    const wage = req.body.wage

    db.query('INSERT INTO employees (name, age, country, position, wage) VALUES(?,?,?,?,?)',
     [name,age,country, position, wage], (error, result)=>{
         if(error){
             console.log(error)
         }else{
             res.send("Values Inserted")
         }
     });

});

//Get 
app.get('/employees', (req, res) => {
    
    
    db.query("SELECT * FROM employees", (error, result) => {
        if(error){
            console.log(error)
        }else{
            res.send(result)
        }
    });
});


app.listen(3001, ()=>{console.log("Running on 3001")});
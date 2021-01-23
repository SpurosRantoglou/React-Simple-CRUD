const express = require('express');
const app = express();
const mysql = require('mysql');

//Get connection with the db
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password:'password',
    database: 'employeesystem'
})


//Insert
app.post('/create', (req, res)=>{

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


app.listen(3310, ()=>{console.log("Running on 3001")});
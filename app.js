// load app server using express..
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

app.use(morgan('combined'))

//+++++++++++tab_benutzer++++++++++++++++++

app.get('/tab_benutzer',(req,res)=>{
    console.log("Fetching all Users")

    const connection=mysql.createConnection({
        host: 'l35.241.254.196',
        user: 'root',
        password: 'Zel2!DrinkSmart',
        database:'drinksmart'
    })

    const queryString="SELECT * FROM tab_benutzer"
    connection.query(queryString,(err,rows,fields)=>{
        if(err){
            console.log("Failed to query for users: "+err)
            res.sendStatus(500)
            return
        }

        const users = rows.map((row)=>{
            return {firstName: row.Vorname, lastName: row.Nachname}
        })

        res.json(users)

    })
})

app.get('/tab_benutzer/:id',(req, res) => {
    console.log("Fetching User with id: " +req.params.id)

    const connection = mysql.createConnection({
        host: 'l35.241.254.196',
        user: 'root',
        password: 'Zel2!DrinkSmart',
        database:'drinksmart'
    })

    const benutzerID = req.params.id
    const queryString="SELECT * FROM tab_benutzer WHERE BenutzerID=?"
    connection.query(queryString, [benutzerID], (err, rows, fields) => {
        if(err){
            console.log("Failed to query for users: "+err)
            res.sendStatus(500)
            return
        }
        console.log("I think we fetched users successfully")

        const users = rows.map((row)=>{
            return {firstName: row.Vorname, lastName: row.Nachname}
        })

        res.json(users)
        console.log("",err)
    })  
})

// ++++++++tab_getraenk+++++++++++++++

app.get('/tab_getraenk',(req, res)=>{
    console.log("Fetching all Drinks") 

    const connection=mysql.createConnection({
        host: 'l35.241.254.196',
        user: 'root',
        password: 'Zel2!DrinkSmart',
        database:'drinksmart',
    })

    const drinkID = req.params.id
    const queryString= "SELECT * FROM tab_getraenk"
    connection.query(queryString,(err,rows,fields)=>{
        if(err){
            console.log("Failed to query for drinks: "+err)
            res.sendStatus(500)
            return
        }

        const drinks = rows.map((row)=>{
            return {name: row.Bezeichnung, type: row.Sorte}
        })

        res.json(drinks)
    })
})

app.get('/tab_getraenk/:id',(req, res)=>{
    console.log("Fetching Drink with id:  "+req.params.id)

    const connection=mysql.createConnection({
        host: 'l35.241.254.196',
        user: 'root',
        password: 'Zel2!DrinkSmart',
        database:'drinksmart',
    })
    
    const queryString= "SELECT * FROM tab_getraenk WHERE GetraenkID=?"
    connection.query(queryString,(err,rows,fields)=>{
        if(err){
            console.log("Failed to query for drinks: "+err)
            res.sendStatus(500)
            return
        }

        const drinks = rows.map((row)=>{
            return {name: row.Bezeichnung, type: row.Sorte, alcohol: row.Alkohol}
        })

        res.json(rows)
    })
})

//+++++++++++++tab_zutat++++++++++++++++++

app.get('/tab_zutat',(req, res)=>{
    console.log("Fetching all Drinks") 

    const connection=mysql.createConnection({
        host: 'l35.241.254.196',
        user: 'root',
        password: 'Zel2!DrinkSmart',
        database:'drinksmart',
    })

    const queryString= "SELECT * FROM tab_zutat"
    connection.query(queryString,(err,rows,fields)=>{
        if(err){
            console.log("Failed to query for ingredients: "+err)
            res.sendStatus(500)
            return
        }

        res.json(rows)
    })
})

app.get('')

app.get("/",(req,res) => {
    console.log("Responding to root route")
    res.send("Pöll du wappla  (responding to Route)")
})

const PORT = process.env.PORT || 3003
// localhost:PORT
app.listen(PORT, () => {
    console.log("Server is up and listening on : "+PORT)
})


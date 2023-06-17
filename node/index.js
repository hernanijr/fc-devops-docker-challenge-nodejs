const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)


app.get('/', async (req,res) => {
    let sql = `INSERT INTO people(name) values('Hernani')`
    connection.query(sql)
    sql = `SELECT name FROM people`
    let returned_list = []
    await connection.query(sql, (err, result, fields) => {
        if (err) throw err;
        returned_list = result.map((item) => {
            return `<li>${item.name}</li> <br>`
        });
        res.send('<h1>Full Cycle Rocks!</h1> <br> <h2>Lista de nomes:</h2> <br> <ul>' + returned_list.join('') +'</ul>')
    });
    connection.end()
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})
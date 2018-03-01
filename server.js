const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mysql = require('mysql')

app.use(express.static('public'))
app.use(bodyParser.json())


let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Notenmanagement'
})
connection.connect()

let newClass = {year:5, label:'AHELS'}
let newStudent = {firstname:'Florian', lastname:'Schachermair', year:5, classLabel:'AHELS'}
let newSubject = {label:'FSST'}
let newTest = {subject:'FSST', classLabel:'AHELS', year:5, date:'2017-03-01'}

addSubject(newSubject)
function addClass(addClass){
    let sqlQuery = 'insert into Klassen(Jahrgang, Bezeichnung) values(' + addClass.year + ', "' + addClass.label + '");'
    connection.query(sqlQuery, function(error, results, fields){
            if(error){
                console.log(error)
                return error
            }else{
                return true
            }
    })
}
function addStudent(student){
    let sqlQuery = 'insert into Schueler(Vorname, Nachname, KID) values("' + student.firstname + '", "' + student.lastname + '", '
    sqlQuery+= '(select KID from Klassen where Bezeichnung="' + student.classLabel + '" ' 
    sqlQuery+= 'and Jahrgang=' + student.year +'));'
    connection.query(sqlQuery, function(error, results, fields){
            if(error){
                console.log(error)
                return error
            }else{
                return true
            }
    })
}
function addTest(test){
    let sqlQuery = 'insert into Tests(FID, KID, Datum) values('
    sqlQuery+='(select FID from Faecher where Bezeichnung ="' + test.subject + '"),'
    sqlQuery+= '(select KID from Klassen where Bezeichnung="' + test.classLabel + '" ' 
    sqlQuery+= 'and Jahrgang=' + student.year +'),'
    sqlQuery+= test.date + ');'
    console.log(sqlQuery)
    connection.query(sqlQuery, function(error, results, fields){
            if(error){
                console.log(error)
                return error
            }else{
                return true
            }
    })
}
function addSubject(newSubject){
    let sqlQuery = 'insert into Faecher(Bezeichnung) values("' + newSubject.label + '");'
    connection.query(sqlQuery, function(error, results, fields){
            if(error){
                console.log(error)
                return error
            }else{
                return true
            }
    })
}




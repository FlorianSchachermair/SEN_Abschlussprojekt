const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mysql = require('mysql')

app.use(express.static('public'))
app.use(bodyParser.json())

app.listen(3000,function(){
    console.log('server running and listening on port 3000')
    
})
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
app.get('/notenmanagement/getKlasse/:getClass', function(req, res){
    let searchClass = {year: parseInt(req.params.getClass.substring(0,1)), label: req.params.getClass.substring(1)}  
    let sqlQuery = 'select Vorname, Nachname from Schueler where KID = (select KID from Klassen where Jahrgang = ' + searchClass.year + ' and Bezeichnung = "' + searchClass.label + '");'
    console.log('test')
    connection.query(sqlQuery, function(error, results, fields){
        if(error){
            console.log(error)
            res.send(error)
        }else{
            console.log(results)
            res.status(200).send(results)
        }
    })
})
app.get('/notenmanagement/getSchueler/:getStudent', function(req, res){
    let searchStudent = {firstname: req.params.getStudent.split('%20')[0], lastname: req.params.getStudent.split('%20')[1]}
    let sqlQuery = 'select * from '
})



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
    sqlQuery+= 'and Jahrgang=' + test.year +'),'
    sqlQuery+=  '"' + test.date + '");'
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
function addMark(newMark){
    let sqlQuery = 'insert into Noten(SID, TID, Note, Kommentar) values(';
    sqlQuery+='(select SID from Schueler where firstname = "' + newMark.firstname + '" and lastname = "' + newMark.lastname + '")';
    sqlQuery+=', (select TID from Tests where )'
    connection.query(sqlQuery, function(error, results, fields){
            if(error){
                console.log(error)
                return error
            }else{
                return true
            }
    })
}
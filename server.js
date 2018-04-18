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
    host: 'web01.energyfussl.at',
    user: 'schachnote',
    password: '0jsLgHpA05rWlA25',
    database: 'schachnote'
})
connection.connect()
/*
let newClass = {year:5, label:'AHELS'}
let newStudent = {firstname:'Florian', lastname:'Schachermair', year:5, classLabel:'AHELS'}
let newSubject = {label:'FSST'}
let newTest = {subject:'FSST', classLabel:'AHELS', year:5, date:'2018-04-11'}
*/


//addTest(newTest)
//addMark({firstname: 'Florian', lastname:'Schachermair', subject: 'FSST', classLabel:'AHELS', year:5, mark: 3, comment:'-', date:'2018-04-11'})
/*connection.query('delete from Tests where Datum = "2018-04-11";' ,function(error, results, fields){
    if(error){
        console.log(error)
    }
    else{
        console.log('ok')
    }
})*/

app.get('/notenmanagement/getKlasse/:getClassID', function(req, res){
    let sqlQuery = 'select Vorname, Nachname, SID from Schueler where KID =' + req.params.getClassID + ';'
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
app.get('/notenmanagement/getSchueler/getNoten/:getStudentID', function(req, res){
    let sqlQuery = 'select Tests.Datum, Faecher.Bezeichnung, Noten.Note, Noten.Kommentar from'
    sqlQuery+= '(((Schueler join Noten on Schueler.SID = Noten.SID) join Tests on Tests.TID = Noten.TID) join Faecher on Tests.FID = Faecher.FID)'
    sqlQuery+= ' where Schueler.SID = ' + req.params.getStudentID + ';'
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
app.get('/notenmanagement/getSchueler/getFaecher/:getStudentID', function(req, res){
    let sqlQuery = 'select distinct Faecher.Bezeichnung from'
    sqlQuery+= '(((Schueler join Noten on Schueler.SID = Noten.SID) join Tests on Tests.TID = Noten.TID) join Faecher on Tests.FID = Faecher.FID)'
    sqlQuery+= ' where Schueler.SID = ' + req.params.getStudentID + ';'
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
app.get('/notenmanagement/getSchueler/getFaecher', function(req, res){
    let sqlQuery = 'select * from Faecher'
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
app.get('/notenmanagement/getKlassen', function(req, res){
    let sqlQuery = 'select * from Klassen'
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
app.post('/notenmanagement/addSchueler', function(req, res){
    addStudent(req.body)
    let sqlQuery = 'select * from Schueler where Vorname = "' + req.body.firstname + '" and "' + req.body.lastname + '";'
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
app.post('/notenmanagement/addTest', function(req, res){
    console.log(req.body)
})
function addClass(addClass){
    let sqlQuery = 'insert into Klassen(Jahrgang, Bezeichnung) values(' + addClass.year + ', "' + addClass.label + '");'
    
    connection.query(sqlQuery, function(error, results, fields){
            if(error){
                console.log(error)
                return error
            }else{
                console.log('addClass successful!')
                return true
            }
    })
}
function addStudent(student){
    let sqlQuery = 'insert into Schueler(Vorname, Nachname, KID) values("' + student.firstname + '", "' + student.lastname + '", ' + student.KID +  ');'
    connection.query(sqlQuery, function(error, results, fields){
            if(error){
                console.log(error)
                return error
            }else{
                console.log('addStudent successful!')
                return true
            }
    })
}

function addTest(test){
    let sqlQuery = 'insert into Tests(FID, KID, Datum) values('
    sqlQuery+='(select FID from Faecher where Bezeichnung ="' + test.subject + '"),'
    sqlQuery+= '(' + getClassQuery(test) + '),'
    sqlQuery+=  '"' + test.date + '");'
    connection.query(sqlQuery, function(error, results, fields){
            if(error){
                console.log(error)
                return error
            }else{
                console.log('addTest successful!')
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
                console.log('addSubject successful!')
                return true
            }
    })
}
//Falls ein Schüler gefehlt hat einfach nichts eintragen
function addMarksForWholeTest(marks, TestID){
    marks.forEach(element => {
        addMark({SID: element.SID, TID: TestID, mark: element.mark, comment: element.comment})
    });
}

function addMark(newMark){
    let test = false
    for(let i=1; i<5; i++){
        if(newMark.mark == i){
            test = true
        }
    }
    if(!test){
        newMark.comment = 'nicht Teilgenommen'
    }
    let sqlQuery = 'insert into Noten(SID, TID, Note, Kommentar) values(';
    sqlQuery+=' ' + newMark.SID
    sqlQuery+=', ' + newMark.TID
    sqlQuery+=', ' + newMark.mark 
    sqlQuery+=', "' + newMark.comment + '");'
    console.log(sqlQuery)
    connection.query(sqlQuery, function(error, results, fields){
            if(error){
                console.log(error)
                return error
            }else{
                console.log('addMark successful!')
                return true
            }
    })
}
function getClassQuery(searchClass){
    let sqlQuery = 'select KID from Klassen where Bezeichnung= "' + searchClass.classLabel + '" and Jahrgang = ' + searchClass.year 
    return sqlQuery;
}
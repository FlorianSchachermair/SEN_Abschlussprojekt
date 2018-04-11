console.log('hallo')
//getAllMarksFromSingleStudent()
let responseData

function getAllData(){      // Vorest einmal alle Daten vom Server abrufen
    var httpReq = new XMLHttpRequest();
    httpReq.open("GET", "/notenmanagement/getKlasse/5AHELS");
    httpReq.onload = function () {
        if (this.status == 200) {
            responseData = JSON.parse(this.responseText)
            // showResponse(responseData)
            console.log(responseData)
        } else {
            console.log('Response code ' + this.status)
        }
    };
    httpReq.onerror = function () {
        console.log("Error ")
    };
    httpReq.send()
}

function getAllMarksFromSingleStudent(){      // Vorest einmal alle Daten vom Server abrufen
    var httpReq = new XMLHttpRequest();
    httpReq.open("GET", "/notenmanagement/getSchueler/Florian Schachermair");
    httpReq.onload = function () {
        if (this.status == 200) {
            responseData = JSON.parse(this.responseText)
            // showResponse(responseData)
            console.log(responseData)
        } else {
            console.log('Response code ' + this.status)
        }
    };
    httpReq.onerror = function () {
        console.log("Error ")
    };
    httpReq.send()
}

function showResponse(responseObj){

    console.log(responseObj)

    /*
    let htmlStr = ''
    htmlStr += '<table> <tr> <th>Name</th> <th>Alter</th> </tr>'

    for (let i = 0; i < personList.length; i++) {
        htmlStr += '<tr>' +
            '<td>' + persons[i].personname + '</td>' +
            '<td>' + persons[i].personage + '</td>' +
            '<td>' + '<button onclick="deletePerson(' + persons[i].id + ')">Löschen</button>' + '</td>' +
            '<td>' + '<button onclick="doChange(this, ' + persons[i].id + ')">Ändern</button>' + '</td>' +
            '</tr>'
    */

/*
    getClass({year: 5, label: 'AHELS'})

    function getClass(searchClass){
        let httpReq = new XMLHttpRequest()
        httpReq.open('GET', '/notenmanagement/getKlasse/' + searchClass.year + searchClass.label)
        httpReq.onload = function(){
            let responseData = this.response
            console.log(responseData)
        }
        httpReq.send()
    */
}
//addStudent({firstname : 'Max', lastname: 'Mustermann', KID: 1})
function addStudent(student){
    var httpReq = new XMLHttpRequest();
    httpReq.open('POST', '/notenmanagement/addSchueler')
    httpReq.setRequestHeader("Content-Type", "application/json")
    httpReq.onload = function () {
    if(this.status==200) {
        let response = JSON.parse(this.responseText)
    } else {
        console.log('Response code'+ this.status)
    }};
    httpReq.onerror = function () {
        console.log("Error ")
    }
    httpReq.send(JSON.stringify(student))
}
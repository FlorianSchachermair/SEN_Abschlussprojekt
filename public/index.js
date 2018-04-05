console.log('hallo')

let responseObj

function getAllData(){      // Vorest einmal alle Daten vom Server abrufen
    var httpReq = new XMLHttpRequest();
    httpReq.open("GET", "/notenmanagement/getKlasse/5AHELS");
    httpReq.onload = function () {
        if (this.status == 200) {
            responseObj = JSON.parse(this.responseText)
            showResponse(responseObj)
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
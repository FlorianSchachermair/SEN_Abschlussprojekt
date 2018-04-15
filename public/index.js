console.log('hallo')

// =====================================

let allClasses

// =====================================



//getAllMarksFromSingleStudent()

let responseData

getAllData()

showAllClassDropdown()

// ============ GET-Methoden ===========

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

function getAllClasses(){
    
}

// ======================================

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

function showAllClassDropdown(){
    var httpReq = new XMLHttpRequest();
    httpReq.open("GET", "/notenmanagement/getKlassen");
    httpReq.onload = function () {
        if (this.status == 200) {
            allClasses = JSON.parse(this.responseText)

            console.log(allClasses)

            let htmlStr = '<select name="select_class" onChange="classDropdownClicked(this)">'
            htmlStr += '<option value="none">(Klasse wählen)</option>'
            for(i=0; i < allClasses.length; i++){
                htmlStr += '<option value="'+allClasses[i].KID+'">'+allClasses[i].Jahrgang+allClasses[i].Bezeichnung+'</option>'
            }
            htmlStr += '</select>'
            
            document.getElementById('home_page_1').innerHTML = htmlStr
        } else {
            console.log('Response code ' + this.status)
        }
    };
    httpReq.onerror = function () {
        console.log("Error ")
    };
    httpReq.send()  
}

function classDropdownClicked(el){
    if(el.value == 'none'){
        return
    }

    let classId = el.value
    console.log('ClassID ' + classId + ' selected from dropdown')
    showClass(classId)
}

function showClass(classId){
    var httpReq = new XMLHttpRequest();
    httpReq.open("GET", "/notenmanagement/getKlasse/"+classId);
    httpReq.onload = function () {
        if (this.status == 200) {
            wholeClass = JSON.parse(this.responseText)
            console.log('showClass with ID '+classId+':\n')
            console.log(wholeClass)

            let htmlStr = '<table> <tr> <th>Vorname</th> <th>Nachname</th> </tr>'

            for (let i = 0; i < wholeClass.length; i++) {
                htmlStr += '<tr class="tablerow" onclick="onClick(this)">' +
                    '<td>' + wholeClass[i].Vorname + '</td>' +
                    '<td>' + wholeClass[i].Nachname + '</td>' +
                    '</tr>'
            }
            htmlStr += '</table>'

            document.getElementById('home_page_2').innerHTML = htmlStr
        } else {
            console.log('Response code ' + this.status)
        }
    };
    httpReq.onerror = function () {
        console.log("Error ")
    };
    httpReq.send() 
}

function onClick(el){
    console.log('onClick')
}
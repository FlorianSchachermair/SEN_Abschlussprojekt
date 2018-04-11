console.log('student_page.html')

var urlParams = new URLSearchParams(window.location.search)

let sid = urlParams.get('sid')
getSubjects()
getStudent()
console.log(sid)

function getStudent(){
    var httpReq = new XMLHttpRequest();
    httpReq.open("GET", "/notenmanagement/getSchueler/getNoten/"+sid);
    httpReq.onload = function () {
        if (this.status == 200) {
            console.log(this.responseText)
            addGradesToTables(JSON.parse(this.responseText))
        } else {
            console.log('Response code ' + this.status)
        }
    };
    httpReq.onerror = function () {
        console.log("Error ")
    };
    httpReq.send() 
}
function getSubjects() {
    var httpReq = new XMLHttpRequest();
    httpReq.open("GET", "/notenmanagement/getSchueler/getFaecher/"+sid);
    httpReq.onload = function () {
        if (this.status == 200) {
            
            createSubjectTables(JSON.parse(this.responseText))
        } else {
            console.log('Response code ' + this.status)
        }
    };
    httpReq.onerror = function () {
        console.log("Error ")
    };
    httpReq.send() 
}
function createSubjectTables(subjects){
    subjects.forEach(element => {
        let htmlTable = '<table class = "subjectTable" id=' + element.Bezeichnung + '>'
        htmlTable+='<caption>' + element.Bezeichnung + '</caption>'
        htmlTable+='<tbody></tbody>'
        document.getElementById('gradeTables').innerHTML+=htmlTable
    });
}
function addGradesToTables(grades){
    grades.forEach(element => {
        let htmlTableContent = '<tr>'
        htmlTableContent += '<td>' + element.Datum.substring(0, 10) + '</td>'
        htmlTableContent += '<td>' + element.Note + '</td>'
        htmlTableContent += '<td>' + element.Kommentar + '</td>'
        htmlTableContent += '</tr>'
        document.getElementById(element.Bezeichnung).getElementsByTagName('tbody')[0].innerHTML += htmlTableContent
    });
}

// =====================================

let allClasses

// =====================================


let urlStr = window.location.href;

var urlParams = new URLSearchParams(window.location.search)

if(urlStr.indexOf('?') != -1){
    let prevClassID = urlParams.get('kid')
    showClass(prevClassID)
}


//getAllMarksFromSingleStudent()

let responseData

let currentClassID = -1

//getAllData()

showAllClassDropdown()
getSubjects()


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

            let htmlStr = '<select class="browser-default" name="select_class" onChange="classDropdownClicked(this)">'
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
        document.getElementById('home_page_2').innerHTML = ''   // wenn "Klasse wählen" ausgewählt, wird nichts angezeigt
        document.getElementById('home_page_3').innerHTML = ''
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
            currentClassID = classId
            console.log(wholeClass)

            let htmlStr

            if(wholeClass.length == 0){
                htmlStr = '<p><i>In dieser Klasse sind keine Schüler vorhanden<\i></p>'
            } else {
                htmlStr = '<p>Schüler auswählen:</p>'
                htmlStr += '<table class = "centered"> <tr> <th>Vorname</th> <th>Nachname</th> </tr>'

                for (let i = 0; i < wholeClass.length; i++) {
                    htmlStr += '<tr style="cursor: pointer;" onclick="onClick('+wholeClass[i].SID+')">' +
                        '<td>' + wholeClass[i].Vorname + '</td>' +
                        '<td>' + wholeClass[i].Nachname + '</td>' +
                        '</tr>'
                }
                htmlStr += '</table>'
            }
            document.getElementById('home_page_2').innerHTML = htmlStr

            htmlStr = '<button class="btn waves-effect waves-light" onclick="addClicked(this)">Schüler zu dieser Klasse hinzufügen</button>'
            if(wholeClass.length != 0){
                htmlStr += '<button class="btn waves-effect waves-light" onclick="addTestClicked()">Test Hinzufügen</button>'
            }
                        
            document.getElementById('home_page_3').innerHTML = htmlStr
        } else {
            console.log('Response code ' + this.status)
        }
    };
    httpReq.onerror = function () {
        console.log("Error ")
    };
    httpReq.send() 
}

function onClick(sid){
    console.log('onClick on SID '+sid)

    console.log(currentClassID)

    window.open('student_page.html?sid='+sid+'&kid='+currentClassID,'_self')
}

function addClicked(el){
    console.log('ADD clicked on ClassID: '+currentClassID)

    let htmlStr = '<form onsubmit="addSubmitted(this); return false;">'
        htmlStr += 'Vorname:<br>'
        htmlStr += '<input type="text" name="firstname" value=""><br> Nachname:<br>'
        htmlStr += '<input type="text" name="lastname" value=""><br><br>'
        htmlStr += '<input class="btn waves-effect waves-light" type="submit" value="OK">'
        htmlStr += '</form>'

     document.getElementById('home_page_3').innerHTML = htmlStr
}

function addSubmitted(formEl){
    let newFirstname = formEl.elements.firstname.value
    let newLastname = formEl.elements.lastname.value

    if(newFirstname == '' || newLastname == ''){
        return
    }

    console.log(newFirstname + ' ' + newLastname)

    let newStudent = {
        firstname: newFirstname,
        lastname: newLastname,
        KID: currentClassID
    }

    postStudent(newStudent)
}

function postStudent(student){
    var httpReq = new XMLHttpRequest();
    httpReq.open("POST", "/notenmanagement/addSchueler");
    httpReq.setRequestHeader("Content-Type", "application/json");

    httpReq.onload = function () {
        if(this.status==200) {
            let response = JSON.parse(this.responseText)
            console.log('postStudent response:')
            console.log(response)
            showClass(currentClassID)
        } else {
            console.log('Response code '+ this.status)
        }
    };

    httpReq.onerror = function () {
        console.log("Error ")
    };

    httpReq.send(JSON.stringify(student))
}
let allSubjects
function getSubjects() {
    var httpReq = new XMLHttpRequest();
    httpReq.open("GET", "/notenmanagement/getSchueler/getFaecher")
    httpReq.onload = function () {
        if (this.status == 200) {
            allSubjects = JSON.parse(this.responseText)
        } else {
            console.log('Response code ' + this.status)
        }
    };
    httpReq.onerror = function () {
        console.log("Error ")
    };
    httpReq.send() 
}
function addTestClicked(){
    let htmlStr
    htmlStr = '<form onsubmit="submitTest(this); return false;">'
    htmlStr += '<input type="text" class="datepicker">'
    htmlStr = '<select class="browser-default" name="selectSubject" ">'
    htmlStr += '<option value="none">Fach wählen</option>'

    for(i=0; i < allSubjects.length; i++){
        htmlStr += '<option value="'+allSubjects[i].FID+'">'+allSubjects[i].Bezeichnung +'</option>'
    }
    htmlStr += '</select>'
    htmlStr += '<input type="text" class="datepicker" id="datepickerTest">'

    htmlStr += '<table class = "centered"> <tr> <th>Vorname</th> <th>Nachname</th> <th>Note</th> <th>Kommentar</th> </tr>'
    for (let i = 0; i < wholeClass.length; i++) {
        htmlStr += '<tr>' 
        htmlStr += '<td>' + wholeClass[i].Vorname + '</td>' 
        htmlStr += '<td>' + wholeClass[i].Nachname + '</td>' 
        htmlStr += '<td> <input type="number" name="grade' + i + '"></td>' 
        htmlStr += '<td> <input type="text" name="comment' + i + '"></td>'
        htmlStr +='</tr>'
    }
    htmlStr += '</table>'
    htmlStr += '<input class="btn waves-effect waves-light" type="submit" value="Bestätigen">'
    htmlStr += '</form>'
    document.getElementById('home_page_2').innerHTML = htmlStr

}
function submitTest(){
    console.log('test')
}
function postTest(){
    //{FID:, KID:, date:, marks[{SID:, mark:, comment:}, {}...] }

}
/*
    let htmlStr = '<form onsubmit="addSubmitted(this); return false;">'
        htmlStr += 'Vorname:<br>'
        htmlStr += '<input type="text" name="firstname" value=""><br> Nachname:<br>'
        htmlStr += '<input type="text" name="lastname" value=""><br><br>'
        htmlStr += '<input type="submit" value="OK">'
        htmlStr += '</form>'
*/

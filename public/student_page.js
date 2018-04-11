console.log('student_page.html')

var urlParams = new URLSearchParams(window.location.search)

let sid = urlParams.get('sid')

console.log(sid)

function getStudent(sid){
    var httpReq = new XMLHttpRequest();
    httpReq.open("GET", "/notenmanagement/getSchueler/"+sid);
    httpReq.onload = function () {
        if (this.status == 200) {
            wholeClass = JSON.parse(this.responseText)
            console.log('showClass with ID '+classId+':\n')
            
        } else {
            console.log('Response code ' + this.status)
        }
    };
    httpReq.onerror = function () {
        console.log("Error ")
    };
    httpReq.send() 
}
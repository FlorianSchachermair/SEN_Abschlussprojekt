getClass({year: 5, label: 'AHELS'})

function getClass(searchClass){
    let httpReq = new XMLHttpRequest()
    httpReq.open('GET', '/notenmanagement/getKlasse/' + searchClass.year + searchClass.label)
    httpReq.onload = function(){
        let responseData = this.response
        console.log(responseData)
    }
    httpReq.send()
}
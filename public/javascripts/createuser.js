//update
/*function update(obj){
    //object id
    //console.log(obj);
    var arr=obj.parentNode.parentNode.childNodes;
    //object id of the residency record
    var col0= arr[0].innerHTML;
    //resident type
    var col1= arr[1].innerHTML;
    //object id if the resident
    var col2= arr[2].innerText;
    //order no
    var col4= arr[4].innerHTML;
    //date of order
    var col5= arr[5].innerHTML;
    //date of occupancy
    var col6= arr[6].innerHTML;
    //date of extend up to
    var col7= arr[7].innerHTML;
    //date of vacancy
    var col8= arr[8].innerHTML;
    //comments
    var col9= arr[9].innerHTML;

    //console.log(elem);
    //employee/pensioner/other's name
    var col10= arr[10].innerHTML;

    var id=document.getElementById('id');
    var employeeid=document.getElementById('name');
    var employee=document.getElementById('employee');
    var pensioner=document.getElementById('pensioner');
    var others=document.getElementById('others');
    var signal=document.getElementById('signal');
    var orderno=document.getElementById('orderno');
    var orderdate=document.getElementById('orderdate');
    var occupieddate=document.getElementById('occupieddate');
    var extendupto=document.getElementById('extendupto');
    var vacantdate=document.getElementById('vacantdate');
    var comments=document.getElementById('comments');
    //console.log(elem1.placeholder);
    id3.value=col0;
    id4.value=col2;
    employeeid.value=col10;
    employeeid.disabled=true;
    employee.value=col1;
    employee.innerHTML=col1;
    pensioner.hidden=true;
    others.hidden=true;
    orderno.value=col4;
    orderdate.value=col5;
    occupieddate.value=col6;
    extendupto.value=col7;
    vacantdate.value=col8;

    signal.value='update';

    //console.log(orderdate.value);
    comments.value=col9;
    //console.log(elem1.placeholder);

}*/

function insertuser(){

    var signal=document.getElementById('signal');
    signal.value='insert';

}

/*function remove(obj){

    var arr=obj.parentNode.parentNode.childNodes;
    //console.log(arr[2].innerText);
    //console.log(arr[2].innerHTML);
    //object id of the residency record
    var col0= arr[0].innerHTML;
    var col2= arr[2].innerHTML;
    var id1=document.getElementById('id1');
    var id2=document.getElementById('id2');

    id1.value=col0;
    id2.value=col2;

    //console.log(id2.value);
    var signal1=document.getElementById('signal1');
    signal1.value='delete';

}*/


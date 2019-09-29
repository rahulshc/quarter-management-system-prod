//update
function updateuser(obj){
    
    var arr=obj.parentNode.parentNode.childNodes;
    //object id of the residency record
    var col0= arr[0].innerHTML;
    var id=document.getElementById('objectid1');
    id.value=col0;

    document.getElementById('username1').value=arr[1].innerHTML;
    document.getElementById('username1').disabled=true;

    document.getElementById('empid1').value=arr[2].innerHTML;
    
    document.getElementById('mobilenumber1').value=arr[4].innerHTML;
    
    if(arr[5].innerHTML==='admin') document.getElementById('role1').value='admin';
    else if (arr[5].innerHTML==='hr') document.getElementById('role1').value='hr';
    else if (arr[5].innerHTML==='accounts') document.getElementById('role1').value='accounts';

    if(arr[6].innerHTML==='active') document.getElementById('status1').value='active';
    else if (arr[6].innerHTML==='inactive') document.getElementById('status1').value='inactive';

    document.getElementById('comments1').value=arr[7].innerHTML;

    document.getElementById('signal1').value='update';

    var signal=document.getElementById('signal');
    signal.value='';

    var signal2=document.getElementById('signal2');
    signal2.value='';

}

function insertuser(){

    var signal=document.getElementById('signal');
    signal.value='insert';

    var signal1=document.getElementById('signal1');
    signal1.value='';

    var signal2=document.getElementById('signal2');
    signal2.value='';

}

function removeuser(obj){

    var arr=obj.parentNode.parentNode.childNodes;

    //object id
    var col0= arr[0].innerHTML;

    var id=document.getElementById('objectid2');
    id.value=col0;
    //console.log(id.value);
    var signal2=document.getElementById('signal2');
    signal2.value='delete';

    var signal=document.getElementById('signal');
    signal.value='';

    var signal1=document.getElementById('signal1');
    signal1.value='';

}


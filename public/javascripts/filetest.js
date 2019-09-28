function display(){
    const selectedFile = document.getElementById('input').files[0];

    var xl2json = new ExcelToJSON();
    xl2json.parseExcel(selectedFile);
    
      
}

var json_object;
var x=null;

var ExcelToJSON = function() {

  this.parseExcel = function(file) {
    var reader = new FileReader();

    reader.onload = function(e) {
      var data = e.target.result;

      try
      {
        var workbook = XLSX.read(data, {
          type: 'binary'
        });
      }

      catch(err)
      {
        document.getElementById('response').textContent=err.message;
      }
      
      workbook.SheetNames.forEach(function(sheetName) {
        // Here is your object
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        json_object = JSON.stringify(XL_row_object);
        x= JSON.parse(json_object);
        //document.getElementById('data').value=json_object;
        //console.log(json_object);
        //console.log(x);
        //jQuery( '#xlx_json' ).val( json_object );
      })
    };

    reader.onerror = function(ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(file);
  };
};

function AJAXSubmit(obj){


if(x!=null && document.getElementById('message').value!=''){

  var data ={
    message: document.getElementById('message').value,
    number: x
  }


  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {

    try{
      if (request.readyState === 4) {

      

        if(request.status===200)
        {
  
          //console.log(request.response);
        var y=JSON.parse(request.response);
        
  
        document.getElementById('response').textContent='Total:' +y.total+ 'Failed:' + y.failed;
        }
  
        else
        {
          document.getElementById('response').textContent='Server error!';
      }
        }

    }

    catch(err)
    {
      document.getElementById('response').textContent=err.description;
      
    }
    
      
  }

  request.open("post", obj.parentNode.action);
  request.setRequestHeader("Content-Type","application/json");
  request.send(JSON.stringify(data));

  

}

else
{
  document.getElementById('response').textContent='Either message content is empty or no file has been selected!'
}
  


}
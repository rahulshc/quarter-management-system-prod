const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var async = require ('async');
var request = require('request');
 
var uid=process.env.UID;
var password=process.env.PASSWORD;
var from='BSPHCL';


//var spice_success=[];

exports.test_get= function(req, res){
    res.render('admin_playground', {title: 'Send Bulk SMS', role: req.session.role})
};

exports.test_post= [

    //sanitizeBody('message').escape(),

    (req, res, next) => {
        var i=0;
        var spice_error=[];
        var interval;
       
        function sendMessage() {

            if(i<req.body.number.length)
            {
                request('http://smsgateway.spicedigital.in/MessagingGateway/MessagePush?username=' + uid + '&password=' + password +
        '&messageType=text' + '&mobile=' + req.body.number[i].Number + '&senderId=' + from + '&message=' + req.body.message, function (error, response, body) {
      //console.log('error:', error); // Print the error if one occurred
      //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
     // console.log('body:', body); 

       if(error!=null)
       {
           spice_error.push(error);
       }
        });

        ++i;

            }

            else
            {
                console.log(i);
                clearInterval(interval);
                res.send({title: 'Admin1 Playground', failed: spice_error.length, total: req.body.number.length, role: req.session.role });
            }

            

        }
    
        interval = setInterval(sendMessage, 500);
    }

]
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var User=require('../models/user');
var Prosixmaster=require('../models/prosixmaster');
var bcrypt=require('bcrypt');

var async = require ('async');

exports.signup_post = [


  (req, res, next)=> {

    User.find({}, function(err, results) {
      if(err) res.render('createuser', {title: 'Users', role: req.session.role, errors: err});
      
      else
      {
        if(req.body.signal==='insert')
        {  
            Prosixmaster.findOne({'employeeid': req.body.empid}).exec(function (err, results1) 
            {
                if (err) 
                {
                  
                   res.render('createuser', {title: 'Users', role: req.session.role, errors: err, data: results});
                }

                else
                {
                  if(results1===null)
                  {
                    
                      res.render('createuser', {title: 'Users', warning: 'Can not find the specified employee ID', role: req.session.role, data: results});
                  }

                  else
                  {

                     User.findOne({'username': req.body.username}).exec(function (err, results2)
                     {
                      
                       if (err) res.render('createuser', {title: 'Users', role: req.session.role, errors: err, data: results});

                      else if(results2!=null) res.render('createuser', {title: 'Users', warning: 'This ID already exists!', role: req.session.role, data: results});

                      else
                      {
                        bcrypt.hash(req.body.password, 10).then(
                          (hash) => {
                            const user = new User({
                              username: req.body.username,
                              password: hash,
                              empid: req.body.empid,
                              name: results1.name,
                              status: req.body.status,
                              mobilenumber: req.body.mobilenumber,
                              role: req.body.role,
                              comments: req.body.comments
                  
                            });
                            user.save().then(
                              () => {
      
                                User.find({}, function(err, results3) {
                                  if(err) res.render('createuser', {title: 'Users', role: req.session.role, errors: err, data: results});
                                  
                                  else res.render('createuser', {title: 'Users', success: 'User Added Sucessfully', role: req.session.role, data: results3});
                                });
                                 
                              }
                            ).catch(
                              (error) => {
                                res.render('createuser', {title: 'Users', role: req.session.role, errors: error, data: results});
      
                              }
                            );
                          }
                        );
                      }

                     });
                      
                      
                  }

                }

            });
            
    
        }
    
        else if(req.body.signal1==='update')
        {
          User.findById(req.body.objectid1, function(err, results4){
    
            if (err)
            {
              res.render('createuser', {title: 'Users', errors: err, role: req.session.role, data: results});
            }
    
            else
            {
              Prosixmaster.findOne({'employeeid': req.body.empid1}).exec(function (err, results5) 
            {
              if (err) res.render('createuser', {title: 'Users', errors: err, role: req.session.role, data: results});

              else
              {
                results4.empid=req.body.empid1;
                results4.name=results5.name;
               results4.mobilenumber=req.body.mobilenumber1;
               results4.role=req.body.role1;
               results4.status=req.body.status1;
               results4.comments=req.body.comments1;

               results4.save(function(err)
               {
                 if(err) res.render('createuser', {title: 'Users', errors: err, role: req.session.role, data: results});

                 else
                 {
                  User.find({}, function(err, results6) {
                    if(err) res.render('createuser', {title: 'Users', role: req.session.role, errors: err, data: results});
                    
                    else res.render('createuser', {title: 'Users', success: 'Changes were made Sucessfully', role: req.session.role, data: results6});
                  });

                 }

               });
              

              }

              
    
            });
            }
    
          });
    
        }
    
        else if(req.body.signal2==='delete')
        {
          User.findByIdAndRemove(req.body.objectid2, function(err){
            if (err) 
            {
              
              res.render('createuser', {title: 'Users', errors: err, role: req.session.role});
            }
            
    
            else
            {
              User.find({}, function(err, results) {
                if(err) res.render('createuser', {title: 'Users', role: req.session.role, errors: err});
                
                else res.render('createuser', {title: 'Users', success: 'Deleted Successfully', role: req.session.role, data: results});
              });
            }
        
        });
    
        }


      }
    }); 
}
];
    


exports.signup_get= function(req, res) {
 User.find({}, function(err, results) {
   if(err) res.render('createuser', {title: 'Users', role: req.session.role, errors: err});
   
   else res.render('createuser', {title: 'Users', role: req.session.role, data: results});
 });
    

};

exports.login_get= function(req, res){

  User.findById(req.session.user, function (err, results)
    {
        if(err) { res.send('Unauthorized');}
        
        else
        {
            if(!req.session || results===null)
            {
              res.render('loginpage', {role: req.session.role});
            }
            
            else if (req.session && String(req.session.user) === String(results._id)) 
            
            {
              
              res.redirect('/qms');
            }
            
            else 
            
            {
              res.render('loginpage', {role: req.session.role});

            }
        }
    
    });
    
};

exports.login_post= function(req, res, next) {

  User.findOne({ username: req.body.username }).then(
    (user) => {
      if (!user) {
        res.render('loginpage', {error: 'Incorrect User Name/Password', role: req.session.role});
      }
      else {
        bcrypt.compare(req.body.password, user.password).then(
          (valid) => {
            if (!valid) {
              res.render('loginpage', {error: 'Incorrect User Name/Password', role: req.session.role});
            }
            else {
              //console.log(user);
              req.session.user = user._id;
              req.session.role=user.role;
              req.session.save(function(err){
                if(err){res.render('loginpage', {error: err, role: req.session.role});}

                else
                {
                  res.redirect('/qms');
                }
              });
              
              
            }
           
          }
        ).catch(
          (error) => {
            res.render('loginpage', {error: error, role: req.session.role});
          }
        );
      }
    }
  ).catch(
    (error) => {
      res.render('loginpage', {error: error, role: req.session.role});
    }
  );

};

exports.logout_get= function(req, res){
  req.session.destroy(function(err) {
    // cannot access session here
    if(err) res.send(err);

    else res.redirect('/users/login');
  });
  
};

exports.logout_post= function(req, res){
  req.session.destroy(function(err) {
    // cannot access session here
    if(err) res.send(err);

    else res.redirect('/users/login');
  });
};



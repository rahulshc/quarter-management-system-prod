const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var User=require('../models/user');
var Prosixmaster=require('../models/prosixmaster');
var bcrypt=require('bcrypt');

var async = require ('async');

exports.signup_post= function(req, res, next){

    if(req.body.signal==='insert')
    {
        Prosixmaster.findOne({'employeeid': req.body.empid}).exec(function (err, results) 
        {
            if (err) { return next(err); }

            if(results===null)
            {
                res.render('createuser', {title: 'Users', error: 'Can not find the specified employee ID'});
            }

            else
            {
                bcrypt.hash(req.body.password, 10).then(
                    (hash) => {
                      const user = new User({
                        username: req.body.username,
                        password: hash,
                        empid: req.body.empid,
                        name: results.name,
                        status: req.body.status,
                        mobilenumber: req.body.mobilenumber,
                        role: req.body.role
            
                      });
                      user.save().then(
                        () => {
                           res.render('createuser', {title: 'Users', success: 'User Added Sucessfully'});
                        }
                      ).catch(
                        (error) => {
                            res.render('createuser', {title: 'Users', warning: error});
                        }
                      );
                    }
                  );
                
            }

        });
        

    }

    else if(req.body.signal==='update')
    {

    }

    else if(req.body.signal1==='delete')
    {

    }

    
};
    


exports.signup_get= function(req, res) {
    res.render('createuser', {title: 'Users'});

};

exports.login_get= function(req, res){

  User.findById(req.session.user, function (err, results)
    {
        if(err) { res.send('Unauthorized');}
        
        else
        {
            if(!req.session || results===null)
            {
              res.render('loginpage');
            }
            
            else if (req.session && String(req.session.user) === String(results._id)) 
            
            {
              
              res.redirect('/qms');
            }
            
            else 
            
            {
              res.render('loginpage');

            }
        }
    
    });
    
};

exports.login_post= function(req, res, next) {

  User.findOne({ username: req.body.username }).then(
    (user) => {
      if (!user) {
        res.render('loginpage', {error: 'Incorrect User Name/Password'});
      }
      else {
        bcrypt.compare(req.body.password, user.password).then(
          (valid) => {
            if (!valid) {
              res.render('loginpage', {error: 'Incorrect User Name/Password'});
            }
            else {
              //console.log(user);
              req.session.user = user._id;
              req.session.role=user.role;
              req.session.save(function(err){
                if(err){res.render('loginpage', {error: err});}

                else
                {
                  res.redirect('/qms');
                }
              });
              
              
            }
           
          }
        ).catch(
          (error) => {
            res.render('loginpage', {error: error});
          }
        );
      }
    }
  ).catch(
    (error) => {
      res.render('loginpage', {error: error});
    }
  );

};

exports.logout_get= function(req, res){
  req.session.destroy();
  res.redirect('/users/login');
};

exports.logout_post= function(req, res){
  req.session.destroy();
  res.redirect('/users/login');
};



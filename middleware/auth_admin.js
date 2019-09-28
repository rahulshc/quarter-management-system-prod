var User=require('../models/user');

module.exports = (req, res, next) => {

    User.findById(req.session.user, function (err, results)
    {
        if(err) { res.send('Unauthorized');}
        
        else
        {
            if(!req.session || results===null)
            {
                res.redirect('/users/login');
            }

            else if (req.session && String(req.session.user) === String(results._id) && String(req.session.role)!='admin') 
            
            {
                res.render('403error');

            }
            
            else if (req.session && String(req.session.user) === String(results._id) && String(req.session.role)==='admin' ) 
            
            {
                return next();

            }
            
            else 
            
            {
                res.redirect('/users/login');

            }
        }
    
    });

}
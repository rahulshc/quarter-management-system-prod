var Contactlist= require('../models/contactlist');

exports.contactlist_list= function(req, res){
    res.render('workinprogress', {role: req.session.role});
};


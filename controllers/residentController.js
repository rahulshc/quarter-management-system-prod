var Resident= require('../models/resident');
var Quarter= require('../models/quarter');
var Prosixmaster=require('../models/prosixmaster');

var async = require ('async');


exports.resident_list= function(req, res){
    res.send('NOT IMPLEMENTED: Resident List');
};

// Display detail page for a specific Resident.
exports.resident_detail = function(req, res, next) {
    async.parallel({
        resident: function(callback) {

            Resident.findById(req.params.id).populate('occupancy_record.quarter')
              .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        Prosixmaster.findOne().where('employeeid').equals(results.resident.name).exec(function(err, results1){
            if(err) { return next(err); }

           // console.log(results1[0].designation);

            res.render('resident_detail', { title: results.resident.prosixname, data: results.resident, data1: results1, role: req.session.role } );
            
        });

        
    });
};



/*// Display Resident update form on GET.
exports.resident_edit_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Resident update GET');
};

// Handle Resident update on POST.
exports.resident_edit_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Resident update POST');
};*/
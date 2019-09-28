var Quarter= require('../models/quarter');
var Resident=require('../models/resident');
var Prosixmaster=require('../models/prosixmaster');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var async = require ('async');
//var d= new Date();

exports.index = function(req, res) {
    async.parallel({
        quarter_count: function(callback){
            Quarter.countDocuments({}, callback);
        },

        resident_count: function(callback){
            Resident.countDocuments({quarter_alloted: 'true'}, callback);
        },

        /*test_count: function(callback){
            Quarter.aggregate([{$group : {_id :{type: "$type", alloted: "$alloted", occupied: "$occupied"} , count : {$sum : 1}}}], callback)
        }*/

        alloted_count: function(callback){
            Quarter.aggregate([{ $match: { alloted: true, occupied: false }}, {$group : {_id : "$type", count : {$sum : 1}}}], callback)
        },

        occupied_count: function(callback){
            Quarter.aggregate([{ $match: { alloted: true, occupied: true }}, {$group : {_id : "$type", count : {$sum : 1}}}], callback)
        },

        vacant_count: function(callback){
            Quarter.aggregate([{ $match: { alloted: false, occupied: false }}, {$group : {_id : "$type", count : {$sum : 1}}}], callback)
        }
    },
    function(err, results) {

        //console.log(results.alloted_count);
        //console.log(results.occupied_count);
        //console.log(results.vacant_count);
        //assigning alloted


        var A= { type: 'A', occupied: 0, vacant: 0, alloted: 0, total: 0};
        var B= { type: 'B', occupied: 0, vacant: 0, alloted: 0, total: 0};
        var C= { type: 'C', occupied: 0, vacant: 0, alloted: 0, total: 0};
        var D= { type: 'D', occupied: 0, vacant: 0, alloted: 0, total: 0};
        var E= { type: 'E', occupied: 0, vacant: 0, alloted: 0, total: 0};
        var F= { type: 'F', occupied: 0, vacant: 0, alloted: 0, total: 0};
        var G= { type: 'G', occupied: 0, vacant: 0, alloted: 0, total: 0};
        var H= { type: 'H', occupied: 0, vacant: 0, alloted: 0, total: 0};
        var OH= { type: 'OH', occupied: 0, vacant: 0, alloted: 0, total: 0};

        for(i=0; i<results.alloted_count.length; ++i)
        {
            if(results.alloted_count[i]._id==='A')
            {
                A.alloted=results.alloted_count[i].count;
            }

            else if(results.alloted_count[i]._id==='B')
            {
                B.alloted=results.alloted_count[i].count;
            }

            else if(results.alloted_count[i]._id==='C')
            {
                C.alloted=results.alloted_count[i].count;
            }

            else if(results.alloted_count[i]._id==='D')
            {
                D.alloted=results.alloted_count[i].count;
            }

            else if(results.alloted_count[i]._id==='E')
            {
                E.alloted=results.alloted_count[i].count;
            }

            else if(results.alloted_count[i]._id==='F')
            {
                F.alloted=results.alloted_count[i].count;
            }

            else if(results.alloted_count[i]._id==='G')
            {
                G.alloted=results.alloted_count[i].count;
            }

            else if(results.alloted_count[i]._id==='H')
            {
                H.alloted=results.alloted_count[i].count;
            }

            else if(results.alloted_count[i]._id==='OH')
            {
                OH.alloted=results.alloted_count[i].count;
            }
        }


        //assigning occupied
        for(i=0; i<results.occupied_count.length; ++i)
        {
            if(results.occupied_count[i]._id==='A')
            {
                A.occupied=results.occupied_count[i].count;
            }

            else if(results.occupied_count[i]._id==='B')
            {
                B.occupied=results.occupied_count[i].count;
            }

            else if(results.occupied_count[i]._id==='C')
            {
                C.occupied=results.occupied_count[i].count;
            }

            else if(results.occupied_count[i]._id==='D')
            {
                D.occupied=results.occupied_count[i].count;
            }

            else if(results.occupied_count[i]._id==='E')
            {
                E.occupied=results.occupied_count[i].count;
            }

            else if(results.occupied_count[i]._id==='F')
            {
                F.occupied=results.occupied_count[i].count;
            }

            else if(results.occupied_count[i]._id==='G')
            {
                G.occupied=results.occupied_count[i].count;
            }

            else if(results.occupied_count[i]._id==='H')
            {
                H.occupied=results.occupied_count[i].count;
            }

            else if(results.occupied_count[i]._id==='OH')
            {
                OH.occupied=results.occupied_count[i].count;
            }
        }


        //assigning vacant
        for(i=0; i<results.vacant_count.length; ++i)
        {
            if(results.vacant_count[i]._id==='A')
            {
                A.vacant=results.vacant_count[i].count;
            }

            else if(results.vacant_count[i]._id==='B')
            {
                B.vacant=results.vacant_count[i].count;
            }

            else if(results.vacant_count[i]._id==='C')
            {
                C.vacant=results.vacant_count[i].count;
            }

            else if(results.vacant_count[i]._id==='D')
            {
                D.vacant=results.vacant_count[i].count;
            }

            else if(results.vacant_count[i]._id==='E')
            {
                E.vacant=results.vacant_count[i].count;
            }

            else if(results.vacant_count[i]._id==='F')
            {
                F.vacant=results.vacant_count[i].count;
            }

            else if(results.vacant_count[i]._id==='G')
            {
                G.vacant=results.vacant_count[i].count;
            }

            else if(results.vacant_count[i]._id==='H')
            {
                H.vacant=results.vacant_count[i].count;
            }

            else if(results.vacant_count[i]._id==='OH')
            {
                OH.vacant=results.vacant_count[i].count;
            }
        }

        A.total=(A.alloted+A.occupied+A.vacant);
        B.total=(B.alloted+B.occupied+B.vacant);
        C.total=(C.alloted+C.occupied+C.vacant);
        D.total=(D.alloted+D.occupied+D.vacant);
        E.total=(E.alloted+E.occupied+E.vacant);
        F.total=(F.alloted+F.occupied+F.vacant);
        G.total=(G.alloted+G.occupied+G.vacant);
        H.total=(H.alloted+H.occupied+H.vacant);
        OH.total=(OH.alloted+OH.occupied+OH.vacant);

        var total_occupied=A.occupied+B.occupied+C.occupied+D.occupied+E.occupied+F.occupied+G.occupied+H.occupied+OH.occupied;
        var total_vacant=A.vacant+B.vacant+C.vacant+D.vacant+E.vacant+F.vacant+G.vacant+H.vacant+OH.vacant;
        var total_alloted=A.alloted+B.alloted+C.alloted+D.alloted+E.alloted+F.alloted+G.alloted+H.alloted+OH.alloted;
        var total=total_occupied+total_vacant+total_alloted;

        var arr=[];
        var count=[];
        var totals={occupied: total_occupied, vacant: total_vacant, alloted: total_alloted, sum: total};

        arr.push(A, B, C, D, E, F, G, H, OH);
        count.push(totals);

        res.render('index', {title: 'QUARTERS MANAGEMENT, BSPHCL COLONY', error: err, data: arr, counts: count, role: req.session.role})
    });
};

exports.quarter_list_get= function(req, res){
    res.render('quarter_list', {title: 'Quarters List', role: req.session.role})
};

exports.quarter_list_post= function(req, res, next){


    if(req.body.quarter==='All')
    {
        if(req.body.state==='vacant')
    {
        Quarter.find({'occupied': 'false'}).populate('residency_record.resident').exec(function(err, list_quarters){
            if(err) { return next(err); }
            res.render('quarter_list', {title: 'Quarters List', errors: err, data:list_quarters, role: req.session.role  })
            
        });

    }

    else if(req.body.state==='occupied')
    {
        Quarter.find({'occupied': 'true'}).populate('residency_record.resident').exec(function(err, list_quarters){
            if(err) { return next(err); }
            res.render('quarter_list', {title: 'Quarters List', errors: err, data:list_quarters, role: req.session.role  })
            
        });

    }

    else if(req.body.state==='alloted')
    {
        Quarter.find({'occupied': 'false', 'alloted': 'true'}).populate('residency_record.resident').exec(function(err, list_quarters){
            if(err) { return next(err); }
            res.render('quarter_list', {title: 'Quarters List', errors: err, data:list_quarters, role: req.session.role  })
            
        });

    }

    else if(req.body.state==='Ok')
    {
        Quarter.find({'status': 'Ok'}).populate('residency_record.resident').exec(function(err, list_quarters){
            if(err) { return next(err); }
            res.render('quarter_list', {title: 'Quarters List', errors: err, data:list_quarters, role: req.session.role })
            
        });

    }

    else if(req.body.state==='Under Maintenance')
    {
        Quarter.find({'status': 'Under Maintenance'}).populate('residency_record.resident').exec(function(err, list_quarters){
            if(err) { return next(err); }
            res.render('quarter_list', {title: 'Quarters List', errors: err, data:list_quarters, role: req.session.role  })
            
        });

    }

    else if(req.body.state==='Abandoned')
    {
        Quarter.find({'status': 'Abandoned'}).populate('residency_record.resident').exec(function(err, list_quarters){
            if(err) { return next(err); }
            res.render('quarter_list', {title: 'Quarters List', errors: err, data:list_quarters, role: req.session.role  })
            
        });

    }

    else if(req.body.state==='Demolished')
    {
        Quarter.find({'status': 'Demolished'}).populate('residency_record.resident').exec(function(err, list_quarters){
            if(err) { return next(err); }
            res.render('quarter_list', {title: 'Quarters List', errors: err, data:list_quarters, role: req.session.role  })
            
        });

    }

    else if(req.body.state==='All')
    {
        Quarter.find().populate('residency_record.resident').exec(function(err, list_quarters){
            if(err) { return next(err); }
            res.render('quarter_list', {title: 'Quarters List', errors: err, data:list_quarters, role: req.session.role  })
            
        });

    }

    }

    else
    {

        if(req.body.state==='vacant')
    {
        Quarter.find({'occupied': 'false'}).where('type').equals(req.body.quarter).populate('residency_record.resident').exec(function(err, list_quarters){
            if(err) { return next(err); }
            res.render('quarter_list', {title: 'Quarters List', errors: err, data:list_quarters, role: req.session.role  })
            
        });

    }

    else if(req.body.state==='occupied')
    {
        Quarter.find({'occupied': 'true'}).where('type').equals(req.body.quarter).populate('residency_record.resident').exec(function(err, list_quarters){
            if(err) { return next(err); }
            res.render('quarter_list', {title: 'Quarters List', errors: err, data:list_quarters, role: req.session.role  })
            
        });

    }

    else if(req.body.state==='alloted')
    {
        Quarter.find({'occupied': 'false', 'alloted': 'true'}).where('type').equals(req.body.quarter).populate('residency_record.resident').exec(function(err, list_quarters){
            if(err) { return next(err); }
            res.render('quarter_list', {title: 'Quarters List', errors: err, data:list_quarters, role: req.session.role })
            
        });

    }

    else if(req.body.state==='Ok')
    {
        Quarter.find({'status': 'Ok'}).where('type').equals(req.body.quarter).populate('residency_record.resident').exec(function(err, list_quarters){
            if(err) { return next(err); }
            res.render('quarter_list', {title: 'Quarters List', errors: err, data:list_quarters, role: req.session.role  })
            
        });

    }

    else if(req.body.state==='Under Maintenance')
    {
        Quarter.find({'status': 'Under Maintenance'}).where('type').equals(req.body.quarter).populate('residency_record.resident').exec(function(err, list_quarters){
            if(err) { return next(err); }
            res.render('quarter_list', {title: 'Quarters List', errors: err, data:list_quarters, role: req.session.role  })
            
        });

    }

    else if(req.body.state==='Abandoned')
    {
        Quarter.find({'status': 'Abandoned'}).where('type').equals(req.body.quarter).populate('residency_record.resident').exec(function(err, list_quarters){
            if(err) { return next(err); }
            res.render('quarter_list', {title: 'Quarters List', errors: err, data:list_quarters, role: req.session.role  })
            
        });

    }

    else if(req.body.state==='Demolished')
    {
        Quarter.find({'status': 'Demolished'}).where('type').equals(req.body.quarter).populate('residency_record.resident').exec(function(err, list_quarters){
            if(err) { return next(err); }
            res.render('quarter_list', {title: 'Quarters List', errors: err, data:list_quarters, role: req.session.role  })
            
        });

    }

    else if(req.body.state==='All')
    {
        Quarter.find().where('type').equals(req.body.quarter).populate('residency_record.resident').exec(function(err, list_quarters){
            if(err) { return next(err); }
            res.render('quarter_list', {title: 'Quarters List', errors: err, data:list_quarters, role: req.session.role  })
            
        });

    }

    }

    

    
    

    /*else
    {
        Quarter.find().where('type').equals(req.body.quarter).populate('residency_record.resident').exec(function(err, list_quarters){
            if(err) { return next(err); }
            //success
            //console.log(list_quarters.residency_record);
            res.render('quarter_list', {title: 'Quarters List', errors: err, data:list_quarters  })
            //console.log(list_quarters);
        });

    }*/

    

    
    //res.send('NOT IMPLEMENTED: Quarter List: Post');
};

// Display detail page for a specific Quarter.
exports.quarter_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Quarter detail: ' + req.params.id);
};

// Display Quarter create form on GET.
exports.quarter_create_get = function(req, res, next) {
    res.render('createquarter_form', {title: 'Create a Quarter', role: req.session.role});
};

// Handle Quarter create on POST.
exports.quarter_create_post = [
    body('quarter', 'Quarter type must be specified!').isLength({ min: 1 }).trim(),
    body('number', 'Quarter number must be a non-zero number!').isInt({ gt: 0 }).trim(),

    sanitizeBody('quarter').escape(),
    sanitizeBody('number').escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        var quarterinstance = new Quarter (
            {
                name: req.body.quarter+req.body.number
            });


        if(!errors.isEmpty()){

            res.render('createquarter_form', {title: 'Create a Quarter', errors: errors.array(), role: req.session.role});
        }


        else{

            if(req.body.quarter[0]==='A' || req.body.quarter[0]==='B' || req.body.quarter[0]==='C' || req.body.quarter[0]==='D' || 
        req.body.quarter[0]==='E' || req.body.quarter[0]==='F' || req.body.quarter[0]==='G' || req.body.quarter[0]==='H' )
        {
            quarterinstance.type=req.body.quarter[0];
        }

        if(req.body.quarter[0]==='O'){
            quarterinstance.type='OH';
        }

        quarterinstance.status='Ok';

        Quarter.findOne({'name': quarterinstance.name})
        .exec(function (err, results) {
            if (err) { return next(err); }

            if(results)
        {
            console.log(results);
            res.render('createquarter_form', {title: 'Create a Quarter', warning: 'This quarter already exists!', role: req.session.role});
        }

        else
        {
            quarterinstance.save(function (err)
        {
            if(err) { return next(err);
            }

            res.render('createquarter_form', {title: 'Create a Quarter', message: 'Created Successfully!', role: req.session.role});
        });
        }

        });

        

        
        }
        
    }
];



// Display Quarter update form on GET.
exports.quarter_edit_get = function(req, res, next) {
    async.parallel({
        quarter: function(callback) {

            Quarter.findById(req.params.id).populate('residency_record.resident')
              .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
       //console.log(results.quarter.residency_record.resident);

       //console.log(results.quarter.order_date_formatted);
        // Successful, so render.
       // console.log(results.quarter.residency_record[1].order_date_formatted);
        res.render('quarter_edit', { title: results.quarter.name, data: results.quarter, role: req.session.role } );
    });
};



// Handle Quarter update on POST.
exports.quarter_edit_post = 
[
    body('orderdate', 'Dates entered can not be in future').optional({ checkFalsy: true }).isBefore(String(new Date())),
    body('allotdate', 'Dates entered can not be in future').optional({ checkFalsy: true }).isBefore(String(new Date())),
    body('occupieddate', 'Dates entered can not be in future').optional({ checkFalsy: true }).isBefore(String(new Date())),
    body('vacantdate', 'Dates entered can not be in future').optional({ checkFalsy: true }).isBefore(String(new Date())),
    body('extendupto', 'Dates entered can not be in future').optional({ checkFalsy: true }).isBefore(String(new Date())),

    sanitizeBody('name').escape(),
    sanitizeBody('orderno').escape(),
    sanitizeBody('orderdate').escape(),
    sanitizeBody('extendupto').escape(),
    sanitizeBody('occupieddate').escape(),
    sanitizeBody('vacantdate').escape(),
    sanitizeBody('comments').escape(),

    (req, res, next) => 
    {
        const errors = validationResult(req);

        async.parallel(
        {
            quarter: function(callback) {

                Quarter.findById(req.params.id).populate('residency_record.resident')
                  .exec(callback);
            },
        }, function(err, results) 
        {
            if (err) { return next(err); }

            //validation before insertion/updation/deletion
            if(!errors.isEmpty()){

                res.render('quarter_edit', {title: results.quarter.name, data: results.quarter, errors: errors.array(), role: req.session.role});
            }
            
            //middleware-validation passed
            else
            {

                //on insert for all types Employee/Pensioners/Others
              if(req.body.signal==='insert')
              {
                //if the quarter status is alloted
                if(results.quarter.alloted===true)
                {   
                    //if the quarter status is alloted then insert can only happen if the vacant date is there (old data)
                    if(req.body.vacantdate)
                    {

                        // Means an employee/ pensioner should be followed by an else
                   if(req.body.type!='Others')
                   {
                     Prosixmaster.findOne({'employeeid': req.body.name})
                      .exec(function (err, results1) 
                    {
                     if (err) { return next(err); }
     
                     if(results1==null)
                     {
                         res.render('quarter_edit', { title: results.quarter.name, data: results.quarter, warning:'This Employee ID/Pension ID does not exist', role: req.session.role } );
                     }
 
                     //means found the employee id/pension id from prosixmaster collections
                     else if(results1!=null)
                     {
 
                         Resident.findOne({'name': results1.employeeid})
                         .exec(function (err, results5)
                         {
                             if (err)  return next(err);
                            
                             //means that resident is not already in resident collection (only for employee/pensioners) a fresh insertion
                             if(results5===null)
                             {
 
 
                                 var residentinstance= new Resident (
                                     {
                                         name: results1.employeeid,
                                         prosixname: results1.name,
                                         type: req.body.type
         
                                     }
                                 );
         
                                 var arr1= 
                                 {
                                     quarter: req.params.id,
                                     resident_record_id: '',
                                     date_of_order: req.body.orderdate,
                                     order_no: req.body.orderno,
                                     date_of_occupancy: req.body.occupieddate,
                                     date_of_allotment: req.body.orderdate,
                                     extend_up_to: req.body.extendupto,
                                     date_of_vacancy: req.body.vacantdate,
                                     comments: req.body.comments
                                 };

                                 residentinstance.occupancy_record.push(arr1);
         
                                 residentinstance.save(function(err){
                                     if(err){return next (err);}
         
                                     var arr=
                                     { 
                                         resident: residentinstance._id,
                                         date_of_order: req.body.orderdate,
                                         order_no: req.body.orderno,
                                         date_of_allotment: req.body.orderdate,
                                         date_of_occupancy: req.body.occupieddate,
                                         extend_up_to: req.body.extendupto,
                                         date_of_vacancy: req.body.vacantdate,
                                         comments: req.body.comments
                                     };
         
                                         results.quarter.residency_record.push(arr);
                                         results.quarter.save(function(err)
                                         {
                                             
                                             
                                             if(err) return next(err); 
         
                                             async.parallel({ 
                                                 quarter: function(callback) { 
                                                     Quarter.findById(req.params.id).populate('residency_record.resident').exec(callback);
                                                  },
         
                                                  resident: function(callback) {
                                                      Resident.findById(residentinstance._id).exec(callback);
                                                  }
         
                                                 }, 
         
                                                 function(err, results1) {
                                                     if(err) return next(err);
         
                                                     results1.resident.occupancy_record[results1.resident.occupancy_record.length-1].resident_record_id=results1.quarter.residency_record[results1.quarter.residency_record.length-1]._id;
         
                                                     results1.resident.save(function(err)
                                                     {
                                                         if(err) return next(err);
         
                                                         res.render('quarter_edit', { title: results1.quarter.name, data: results1.quarter, success:'Entered Successfully', role: req.session.role } );
         
                                                     });
                                                   
                                             
                                                 }
                                               );
         
                                         });
                                         
                                 });
         
 
                             }
                              //means employee id is already in resident
                             else if(results5!=null)
                             {
 
 
                                 var arr1= 
                                 {
                                     quarter: req.params.id,
                                     resident_record_id: '',
                                     date_of_order: req.body.orderdate,
                                     order_no: req.body.orderno,
                                     date_of_occupancy: req.body.occupieddate,
                                     date_of_allotment: req.body.orderdate,
                                     extend_up_to: req.body.extendupto,
                                     date_of_vacancy: req.body.vacantdate,
                                     comments: req.body.comments
                                 };
 
                                 results5.occupancy_record.push(arr1);
         
                                 results5.save(function(err){
                                     if(err){return next (err);}
         
                                     var arr=
                                     { 
                                         resident: results5._id,
                                         date_of_order: req.body.orderdate,
                                         order_no: req.body.orderno,
                                         date_of_allotment: req.body.orderdate,
                                         date_of_occupancy: req.body.occupieddate,
                                         extend_up_to: req.body.extendupto,
                                         date_of_vacancy: req.body.vacantdate,
                                         comments: req.body.comments
                                     };
                                      
                                         results.quarter.residency_record.push(arr);
                                         results.quarter.save(function(err)
                                         {
                                             
                                             
                                             if(err) return next(err); 
 
                                             async.parallel({ 
                                                 quarter: function(callback) { 
                                                     Quarter.findById(req.params.id).populate('residency_record.resident').exec(callback);
                                                  },
         
                                                  resident: function(callback) {
                                                      Resident.findById(results5._id).exec(callback);
                                                  }
         
                                                 }, 
         
                                                 function(err, results1) {
                                                     if(err) return next(err);
         
                                                     //console.log(results1.resident);
         
                                                     results1.resident.occupancy_record[results1.resident.occupancy_record.length-1].resident_record_id=results1.quarter.residency_record[results1.quarter.residency_record.length-1]._id;
         
                                                     results1.resident.save(function(err)
                                                     {
                                                         if(err) return next(err);
         
                                                         res.render('quarter_edit', { title: results1.quarter.name, data: results1.quarter, success:'Entered Successfully', role: req.session.role } );
         
                                                     });
                                                   
                                                 }
                                               );
         
         
                                         });
                                     
                                 });
         
 
                             }
                         });
                        
                     }
                 });
             }
             //means not an employee or pensioner
             else
             {
                 var residentinstance= new Resident (
                     {
                         name: req.body.name,
                         prosixname: '',
                         type: req.body.type
 
                     }
                 );
 
                 var arr1= 
                 {
                     quarter: req.params.id,
                     resident_record_id: '',
                     date_of_order: req.body.orderdate,
                     order_no: req.body.orderno,
                     date_of_occupancy: req.body.occupieddate,
                     date_of_allotment: req.body.orderdate,
                     extend_up_to: req.body.extendupto,
                     date_of_vacancy: req.body.vacantdate,
                     comments: req.body.comments
                 };
 
                 residentinstance.occupancy_record.push(arr1);
 
                 residentinstance.save(function(err){
                     if(err){return next (err);}
 
                     var arr=
                     { 
                         resident: residentinstance._id,
                         date_of_order: req.body.orderdate,
                         order_no: req.body.orderno,
                         date_of_allotment: req.body.orderdate,
                         date_of_occupancy: req.body.occupieddate,
                         extend_up_to: req.body.extendupto,
                         date_of_vacancy: req.body.vacantdate,
                         comments: req.body.comments
                     };
 
                         results.quarter.residency_record.push(arr);
                         results.quarter.save(function(err)
                         {
                             
                             
                             if(err) return next(err);
 
                             async.parallel({ 
                                 quarter: function(callback) { 
                                     Quarter.findById(req.params.id).populate('residency_record.resident').exec(callback);
                                  },
 
                                  resident: function(callback) {
                                      Resident.findById(residentinstance._id).exec(callback);
                                  }
 
                                 }, 
                                 
                                 function(err, results1) {
                                     if(err) return next(err);
                                     results1.resident.occupancy_record[results1.resident.occupancy_record.length-1].resident_record_id=results1.quarter.residency_record[results1.quarter.residency_record.length-1]._id;
                                    
                                     results1.resident.save(function(err)
                                             {
                                                 if(err) return next(err);
 
                                                 res.render('quarter_edit', { title: results1.quarter.name, data: results1.quarter, success:'Entered Successfully', role: req.session.role} );
 
                                             });
                                   
                             
                                 }
                               );
                         });
 
                 });
 
 
             }


                    }

                    //do not allow
                    else
                    {
                        res.render('quarter_edit', { title: results.quarter.name, data: results.quarter, warning:'You must vacate this quarter before assigning fresh!', role: req.session.role } );
                    }


                }

                //means quarter is vacant
                else
                {
                    //employee/pensioner
                    if(req.body.type!='Others')
                   {
                     Prosixmaster.findOne({'employeeid': req.body.name})
                      .exec(function (err, results1) 
                    {
                     if (err) { return next(err); }
     
                     if(results1==null)
                     {
                         res.render('quarter_edit', { title: results.quarter.name, data: results.quarter, warning:'This Employee ID/Pension ID does not exist', role: req.session.role } );
                     }
 
                     //means found the employee id/pension id from prosixmaster collections
                     else if(results1!=null)
                     {
 
                         Resident.findOne({'name': results1.employeeid})
                         .exec(function (err, results5)
                         {
                             if (err)  return next(err);
                            
                             //means that resident is not already in resident collection (only for employee/pensioners) a fresh insertion
                             if(results5===null)
                             {
 
 
                                 var residentinstance= new Resident (
                                     {
                                         name: results1.employeeid,
                                         prosixname: results1.name,
                                         type: req.body.type
         
                                     }
                                 );
         
                                 var arr1= 
                                 {
                                     quarter: req.params.id,
                                     resident_record_id: '',
                                     date_of_order: req.body.orderdate,
                                     order_no: req.body.orderno,
                                     date_of_occupancy: req.body.occupieddate,
                                     date_of_allotment: req.body.orderdate,
                                     extend_up_to: req.body.extendupto,
                                     date_of_vacancy: req.body.vacantdate,
                                     comments: req.body.comments
                                 };

                                 if(!req.body.vacantdate && !req.body.occupieddate)
                                 {
                                    residentinstance.quarter_alloted=true;
                                    residentinstance.alloted_quarter=req.params.id;

                                 }

                                 else if(!req.body.vacantdate && req.body.occupieddate)
                                 {
                                    residentinstance.quarter_alloted=true;
                                    residentinstance.quarter_occupied=true;
                                    residentinstance.alloted_quarter=req.params.id;

                                 }

                                 residentinstance.occupancy_record.push(arr1);
         
                                 residentinstance.save(function(err){
                                     if(err){return next (err);}
         
                                     var arr=
                                     { 
                                         resident: residentinstance._id,
                                         date_of_order: req.body.orderdate,
                                         order_no: req.body.orderno,
                                         date_of_allotment: req.body.orderdate,
                                         date_of_occupancy: req.body.occupieddate,
                                         extend_up_to: req.body.extendupto,
                                         date_of_vacancy: req.body.vacantdate,
                                         comments: req.body.comments
                                     };

                                     if(!req.body.vacantdate && !req.body.occupieddate)
                                 {
                                    results.quarter.alloted=true;
                                    results.quarter.alloted_to=residentinstance._id;

                                 }

                                 else if(!req.body.vacantdate && req.body.occupieddate)
                                 {
                                    results.quarter.alloted=true;
                                    results.quarter.occupied=true;
                                    results.quarter.alloted_to=residentinstance._id;

                                 }
         
                                         results.quarter.residency_record.push(arr);
                                         results.quarter.save(function(err)
                                         {
                                             
                                             
                                             if(err) return next(err); 
         
                                             async.parallel({ 
                                                 quarter: function(callback) { 
                                                     Quarter.findById(req.params.id).populate('residency_record.resident').exec(callback);
                                                  },
         
                                                  resident: function(callback) {
                                                      Resident.findById(residentinstance._id).exec(callback);
                                                  }
         
                                                 }, 
         
                                                 function(err, results1) {
                                                     if(err) return next(err);
         
                                                     results1.resident.occupancy_record[results1.resident.occupancy_record.length-1].resident_record_id=results1.quarter.residency_record[results1.quarter.residency_record.length-1]._id;
         
                                                     results1.resident.save(function(err)
                                                     {
                                                         if(err) return next(err);
         
                                                         res.render('quarter_edit', { title: results1.quarter.name, data: results1.quarter, success:'Entered Successfully', role: req.session.role } );
         
                                                     });
                                                   
                                             
                                                 }
                                               );
         
                                         });
                                         
                                 });
         
 
                             }
                              //means employee id is already in resident
                             else if(results5!=null)
                             {
                                 var flag=false;
 
                                 var arr1= 
                                 {
                                     quarter: req.params.id,
                                     resident_record_id: '',
                                     date_of_order: req.body.orderdate,
                                     order_no: req.body.orderno,
                                     date_of_occupancy: req.body.occupieddate,
                                     date_of_allotment: req.body.orderdate,
                                     extend_up_to: req.body.extendupto,
                                     date_of_vacancy: req.body.vacantdate,
                                     comments: req.body.comments
                                 };
                                
                                 //if upon insertion that employee has already a quarter alloted, then do not allow
                                 if(results5.quarter_alloted===true)
                                 {  flag=true;
                                    res.render('quarter_edit', { title: results.quarter.name, data: results.quarter, warning:'This Employee/Pensioner already has a quarter alloted', role: req.session.role});
                                 }

                                 else
                                 {
                                    if(!req.body.vacantdate && !req.body.occupieddate)
                                    {
                                       results5.quarter_alloted=true;
                                       results5.alloted_quarter=req.params.id;
   
                                    }
   
                                    else if(!req.body.vacantdate && req.body.occupieddate)
                                    {
                                       results5.quarter_alloted=true,
                                       results5.quarter_occupied=true,
                                       results5.alloted_quarter=req.params.id
   
                                    }

                                 }
 
                                 results5.occupancy_record.push(arr1);

                                 //console.log('test');

                                 if(flag===false)
                                 {
                                    results5.save(function(err){
                                        if(err){return next (err);}
            
                                        var arr=
                                        { 
                                            resident: results5._id,
                                            date_of_order: req.body.orderdate,
                                            order_no: req.body.orderno,
                                            date_of_allotment: req.body.orderdate,
                                            date_of_occupancy: req.body.occupieddate,
                                            extend_up_to: req.body.extendupto,
                                            date_of_vacancy: req.body.vacantdate,
                                            comments: req.body.comments
                                        };
   
                                        if(!req.body.vacantdate && !req.body.occupieddate)
                                    {
                                       results.quarter.alloted=true;
                                       results.quarter.alloted_to=results5._id;
   
                                    }
   
                                    else if(!req.body.vacantdate && req.body.occupieddate)
                                    {
                                       results.quarter.alloted=true;
                                       results.quarter.occupied=true;
                                       results.quarter.alloted_to=results5._id;
   
                                    }
                                         
                                            results.quarter.residency_record.push(arr);
                                            results.quarter.save(function(err)
                                            {
                                                
                                                
                                                if(err) return next(err); 
    
                                                async.parallel({ 
                                                    quarter: function(callback) { 
                                                        Quarter.findById(req.params.id).populate('residency_record.resident').exec(callback);
                                                     },
            
                                                     resident: function(callback) {
                                                         Resident.findById(results5._id).exec(callback);
                                                     }
            
                                                    }, 
            
                                                    function(err, results1) {
                                                        if(err) return next(err);
            
                                                        //console.log(results1.resident);
            
                                                        results1.resident.occupancy_record[results1.resident.occupancy_record.length-1].resident_record_id=results1.quarter.residency_record[results1.quarter.residency_record.length-1]._id;
            
                                                        results1.resident.save(function(err)
                                                        {
                                                            if(err) return next(err);
            
                                                            res.render('quarter_edit', { title: results1.quarter.name, data: results1.quarter, success:'Entered Successfully', role: req.session.role } );
            
                                                        });
                                                      
                                                    }
                                                  );
            
            
                                            });
                                        
                                    });
            
                                     
                                 }

                                 
 
                             }
                         });
                        
                     }
                 });
             }
             //means not an employee or pensioner
             else
             {
                 var residentinstance= new Resident (
                     {
                         name: req.body.name,
                         prosixname: '',
                         type: req.body.type
 
                     }
                 );
 
                 var arr1= 
                 {
                     quarter: req.params.id,
                     resident_record_id: '',
                     date_of_order: req.body.orderdate,
                     order_no: req.body.orderno,
                     date_of_occupancy: req.body.occupieddate,
                     date_of_allotment: req.body.orderdate,
                     extend_up_to: req.body.extendupto,
                     date_of_vacancy: req.body.vacantdate,
                     comments: req.body.comments
                 };

                 if(!req.body.vacantdate && !req.body.occupieddate)
                {
                    residentinstance.quarter_alloted=true;
                    residentinstance.alloted_quarter=req.params.id;
   
                }
   
                else if(!req.body.vacantdate && req.body.occupieddate)
                {
                    residentinstance.quarter_alloted=true,
                    residentinstance.quarter_occupied=true,
                    residentinstance.alloted_quarter=req.params.id
   
                }
 
                 residentinstance.occupancy_record.push(arr1);
 
                 residentinstance.save(function(err){
                     if(err){return next (err);}
 
                     var arr=
                     { 
                         resident: residentinstance._id,
                         date_of_order: req.body.orderdate,
                         order_no: req.body.orderno,
                         date_of_allotment: req.body.orderdate,
                         date_of_occupancy: req.body.occupieddate,
                         extend_up_to: req.body.extendupto,
                         date_of_vacancy: req.body.vacantdate,
                         comments: req.body.comments
                     };

                     if(!req.body.vacantdate && !req.body.occupieddate)
                                 {
                                    results.quarter.alloted=true;
                                    results.quarter.alloted_to=residentinstance._id;

                                 }

                                 else if(!req.body.vacantdate && req.body.occupieddate)
                                 {
                                    results.quarter.alloted=true;
                                    results.quarter.occupied=true;
                                    results.quarter.alloted_to=residentinstance._id;

                                 }
 
                         results.quarter.residency_record.push(arr);
                         results.quarter.save(function(err)
                         {
                             
                             
                             if(err) return next(err);
 
                             async.parallel({ 
                                 quarter: function(callback) { 
                                     Quarter.findById(req.params.id).populate('residency_record.resident').exec(callback);
                                  },
 
                                  resident: function(callback) {
                                      Resident.findById(residentinstance._id).exec(callback);
                                  }
 
                                 }, 
                                 
                                 function(err, results1) {
                                     if(err) return next(err);
                                     results1.resident.occupancy_record[results1.resident.occupancy_record.length-1].resident_record_id=results1.quarter.residency_record[results1.quarter.residency_record.length-1]._id;
                                    
                                     results1.resident.save(function(err)
                                             {
                                                 if(err) return next(err);
 
                                                 res.render('quarter_edit', { title: results1.quarter.name, data: results1.quarter, success:'Entered Successfully', role: req.session.role } );
 
                                             });
                                   
                             
                                 }
                               );
                         });
 
                 });
 
 
             }

                }
                

                  

            }
             
            //handle the delete code
            else if(req.body.signal1==='delete')
            {


                //Quarter.find().where('type').equals(req.body.quarter).select('name alloted comments').exec(function(err, list_quarters){
                async.parallel({
                    resident: function(callback){
                        Resident.findById(req.body.id2).exec(callback);
                    }

                },

                function(err, results1){
                    if (err) return next(err);
                    
                    //if the quarter is alloted
                    if(results.quarter.alloted===true)
                    {
                        //delete request received from same id to which this quarter is alloted
                        if((String(results.quarter.alloted_to)===String(results1.resident._id)))
                        {
                            for(i=0; i<results1.resident.occupancy_record.length; ++i){
                                if(results1.resident.occupancy_record[i].resident_record_id===req.body.id1)
                                {
    
                                      results1.resident.occupancy_record.pull({_id: results1.resident.occupancy_record[i]._id});
    
    
                                }
    
                            }
    
                            
                             results.quarter.residency_record.pull({_id: req.body.id1});

                             results.quarter.alloted=false;
                             results.quarter.occupied=false;
                             results.quarter.alloted_to=null;

                             results1.resident.quarter_alloted=false;
                             results1.resident.quarter_occupied=false;
                             results1.resident.alloted_quarter=null;
                             
                             results1.resident.save(function(err)
                             {
    
                                 if(err) return next(err);
    
    
                                 if(results1.resident.occupancy_record.length===0){
    
                                     Resident.findByIdAndRemove(req.body.id2, function(err){
                                         if (err) return next(err);
                                     
                                     });
     
     
                                 }
    
                                 
    
                                 results.quarter.save(function(err)
                                 {
    
                                     if(err) return next(err);
    
                                     
    
                                     async.parallel({ 
                                         quarter: function(callback) { 
                                             Quarter.findById(req.params.id).populate('residency_record.resident').exec(callback);
                                          }
    
    
                                     
                                         },
                                     
                                          function (err, results2){
                                     
                                             if(err) return next(err);
    
    
                                     
                                             res.render('quarter_edit', { title: results2.quarter.name, data: results2.quarter, success:'Deleted Successfully', role: req.session.role } );
                                     
                                          }
                                     
                                     );
    
    
                                 });
    
                             });
    

                        }
                        
                        //delete request from a resident to which this quarter is not alloted
                        else
                        {
                            for(i=0; i<results1.resident.occupancy_record.length; ++i){
                                if(results1.resident.occupancy_record[i].resident_record_id===req.body.id1)
                                {
    
                                      results1.resident.occupancy_record.pull({_id: results1.resident.occupancy_record[i]._id});
    
    
                                }
    
                            }
    
                             results.quarter.residency_record.pull({_id: req.body.id1});
                             
                             results1.resident.save(function(err)
                             {
    
                                 if(err) return next(err);
    
    
                                 if(results1.resident.occupancy_record.length===0){
    
                                     Resident.findByIdAndRemove(req.body.id2, function(err){
                                         if (err) return next(err);
                                     
                                     });
     
     
                                 }
    
                                 
    
                                 results.quarter.save(function(err)
                                 {
    
                                     if(err) return next(err);
    
                                     
    
                                     async.parallel({ 
                                         quarter: function(callback) { 
                                             Quarter.findById(req.params.id).populate('residency_record.resident').exec(callback);
                                          }
    
    
                                     
                                         },
                                     
                                          function (err, results2){
                                     
                                             if(err) return next(err);
    
    
                                     
                                             res.render('quarter_edit', { title: results2.quarter.name, data: results2.quarter, success:'Deleted Successfully', role: req.session.role } );
                                     
                                          }
                                     
                                     );
    
    
                                 });
    
                             });
                              

                        }

                    }
                    
                    //quarter is vacant
                    else
                    {
                        for(i=0; i<results1.resident.occupancy_record.length; ++i){
                            if(results1.resident.occupancy_record[i].resident_record_id===req.body.id1)
                            {

                                  results1.resident.occupancy_record.pull({_id: results1.resident.occupancy_record[i]._id});


                            }

                        }

                         

                       
                         
                         
                         results.quarter.residency_record.pull({_id: req.body.id1});
                         
                         results1.resident.save(function(err)
                         {

                             if(err) return next(err);


                             if(results1.resident.occupancy_record.length===0){

                                 Resident.findByIdAndRemove(req.body.id2, function(err){
                                     if (err) return next(err);
                                 
                                 });
 
 
                             }

                             

                             results.quarter.save(function(err)
                             {

                                 if(err) return next(err);

                                 

                                 async.parallel({ 
                                     quarter: function(callback) { 
                                         Quarter.findById(req.params.id).populate('residency_record.resident').exec(callback);
                                      }


                                 
                                     },
                                 
                                      function (err, results2){
                                 
                                         if(err) return next(err);


                                 
                                         res.render('quarter_edit', { title: results2.quarter.name, data: results2.quarter, success:'Deleted Successfully', role: req.session.role } );
                                 
                                      }
                                 
                                 );


                             });

                         });

                    }

                          
                           

                });

                
                
                
                
            }
            
            //handle the update
            else if(req.body.signal==='update')
            {

                async.parallel(
                    {
                        quarter: function(callback) {
            
                            Quarter.findById(req.params.id).exec(callback);
                        },

                        resident: function(callback) {
                            Resident.findById(req.body.id4).exec(callback);
                        }
                    }, 
                    function(err, results1) 
                    {
                        if(err) return next(err);
                         
                        //if the quarter status is alloted
                        if(results1.quarter.alloted===true)
                        {
                             //if the update request is initiated by same id to which the quarter is alloted
                            if(String(results1.resident.alloted_quarter)===String(results1.quarter._id))
                            {
                                //console.log('test');
                                       
                                    for(i=0; i<results1.quarter.residency_record.length; ++i)
                                    {
                                        if(String(results1.quarter.residency_record[i]._id)===req.body.id3)
                                        {
                                            //console.log('test1);
                                            results1.quarter.residency_record[i].date_of_order=req.body.orderdate;
                                            results1.quarter.residency_record[i].order_no=req.body.orderno;
                                            results1.quarter.residency_record[i].date_of_allotment=req.body.orderdate;
                                            results1.quarter.residency_record[i].date_of_occupancy=req.body.occupieddate;
                                            results1.quarter.residency_record[i].extend_up_to=req.body.extendupto;
                                            results1.quarter.residency_record[i].date_of_vacancy=req.body.vacantdate;
                                            results1.quarter.residency_record[i].comments=req.body.comments;

                                            if(!req.body.vacantdate && !req.body.occupieddate)
                                            {
                                                results1.quarter.alloted=true;
                                                results1.quarter.occupied=false;
                                            }

                                            else if(!req.body.vacantdate && req.body.occupieddate)
                                            {
                                                results1.quarter.alloted=true;
                                                results1.quarter.occupied=true;
                                            }

                                            else if(req.body.vacantdate)
                                            {
                                                results1.quarter.alloted=false;
                                                results1.quarter.occupied=false;
                                                results1.quarter.alloted_to=null;
                                            }
            
                                        
                                            break;
            
                                        }
            
                                    }
            
            
                                    for(i=0; i<results1.resident.occupancy_record.length; ++i)
                                    {
                                        if(results1.resident.occupancy_record[i].resident_record_id===req.body.id3)
                                        {
                                            //console.log('test2');
                                            results1.resident.occupancy_record[i].date_of_order=req.body.orderdate;
                                            results1.resident.occupancy_record[i].order_no=req.body.orderno;
                                            results1.resident.occupancy_record[i].date_of_allotment=req.body.orderdate;
                                            results1.resident.occupancy_record[i].date_of_occupancy=req.body.occupieddate;
                                            results1.resident.occupancy_record[i].extend_up_to=req.body.extendupto;
                                            results1.resident.occupancy_record[i].date_of_vacancy=req.body.vacantdate;
                                            results1.resident.occupancy_record[i].comments=req.body.comments;

                                            if(!req.body.vacantdate && !req.body.occupieddate)
                                            {
                                                results1.resident.quarter_alloted=true;
                                                results1.resident.quarter_occupied=false;
                                            }

                                            else if(!req.body.vacantdate && req.body.occupieddate)
                                            {
                                                results1.resident.quarter_alloted=true;
                                                results1.resident.quarter_occupied=true;
                                            }

                                            else if(req.body.vacantdate)
                                            {
                                                results1.resident.quarter_alloted=false;
                                                results1.resident.quarter_occupied=false;
                                                results1.resident.alloted_quarter=null;
                                            }
        
                                            break;
            
                                        }
            
                                    }
            
                                    results1.quarter.save(function(err)
                                    {
                                        if (err) return next(err);
            
                                        results1.resident.save(function(err)
                                        {
                                            if(err) return next(err);
            
                                            async.parallel({ 
                                                quarter: function(callback) { 
                                                    Quarter.findById(req.params.id).populate('residency_record.resident').exec(callback);
                                                 }
                                            
                                                },
                                            
                                                 function (err, results2){
                                            
                                                    if(err) return next(err);
                                            
                                                    res.render('quarter_edit', { title: results2.quarter.name, data: results2.quarter, success:'Saved Successfully', role: req.session.role } );
                                            
                                                 }
                                            
                                            );
            
            
            
                                        });
            
                                    });
                                

                            }

                            //request initiated from a different id
                            else
                            {
                                var flag=false;

                                if(!req.body.vacantdate)
                                {   flag=true;
                                    res.render('quarter_edit', { title: results.quarter.name, data: results.quarter, warning:'You must vacate this quarter before assigning to else', role: req.session.role});
                                }

                                else
                                {

                                    for(i=0; i<results1.quarter.residency_record.length; ++i)
                                    {
                                        if(String(results1.quarter.residency_record[i]._id)===req.body.id3)
                                        {
                                            //console.log('test1);
                                            results1.quarter.residency_record[i].date_of_order=req.body.orderdate;
                                            results1.quarter.residency_record[i].order_no=req.body.orderno;
                                            results1.quarter.residency_record[i].date_of_allotment=req.body.orderdate;
                                            results1.quarter.residency_record[i].date_of_occupancy=req.body.occupieddate;
                                            results1.quarter.residency_record[i].extend_up_to=req.body.extendupto;
                                            results1.quarter.residency_record[i].date_of_vacancy=req.body.vacantdate;
                                            results1.quarter.residency_record[i].comments=req.body.comments;
            
                                        
                                            break;
            
                                        }
            
                                    }
            
            
                                    for(i=0; i<results1.resident.occupancy_record.length; ++i)
                                    {
                                        if(results1.resident.occupancy_record[i].resident_record_id===req.body.id3)
                                        {
                                            //console.log('test2');
                                            results1.resident.occupancy_record[i].date_of_order=req.body.orderdate;
                                            results1.resident.occupancy_record[i].order_no=req.body.orderno;
                                            results1.resident.occupancy_record[i].date_of_allotment=req.body.orderdate;
                                            results1.resident.occupancy_record[i].date_of_occupancy=req.body.occupieddate;
                                            results1.resident.occupancy_record[i].extend_up_to=req.body.extendupto;
                                            results1.resident.occupancy_record[i].date_of_vacancy=req.body.vacantdate;
                                            results1.resident.occupancy_record[i].comments=req.body.comments;
        
                                            break;
            
                                        }
            
                                    }

                                    if(flag===false)
                                    {
                                        results1.quarter.save(function(err)
                                    {
                                        if (err) return next(err);
            
                                        results1.resident.save(function(err)
                                        {
                                            if(err) return next(err);
            
                                            async.parallel({ 
                                                quarter: function(callback) { 
                                                    Quarter.findById(req.params.id).populate('residency_record.resident').exec(callback);
                                                 }
                                            
                                                },
                                            
                                                 function (err, results2){
                                            
                                                    if(err) return next(err);
                                            
                                                    res.render('quarter_edit', { title: results2.quarter.name, data: results2.quarter, success:'Saved Successfully', role: req.session.role } );
                                            
                                                 }
                                            
                                            );
            
            
            
                                        });
            
                                    });

                                    }
                                    

                                }
                            }

                            
                        }
                        
                        //if the quarter status is not alloted
                        else
                        {
                           var flag=false; 
                            //console.log(req.body.id4);

                        for(i=0; i<results1.quarter.residency_record.length; ++i)
                        {
                            if(String(results1.quarter.residency_record[i]._id)===req.body.id3)
                            {
                                //console.log('test1);
                                results1.quarter.residency_record[i].date_of_order=req.body.orderdate;
                                results1.quarter.residency_record[i].order_no=req.body.orderno;
                                results1.quarter.residency_record[i].date_of_allotment=req.body.orderdate;
                                results1.quarter.residency_record[i].date_of_occupancy=req.body.occupieddate;
                                results1.quarter.residency_record[i].extend_up_to=req.body.extendupto;
                                results1.quarter.residency_record[i].date_of_vacancy=req.body.vacantdate;
                                results1.quarter.residency_record[i].comments=req.body.comments;

                                if(results1.resident.quarter_alloted===true)
                                {
                                    flag=true;
                                    res.render('quarter_edit', { title: results.quarter.name, data: results.quarter, warning:'This Employee/Pensioner already has a quarter alloted', role: req.session.role});
                                }

                                else
                                {
                                    if(!req.body.vacantdate && !req.body.occupieddate)
                                    {
                                        results1.quarter.alloted=true;
                                        results1.quarter.alloted_to=results1.resident._id;
                                    }

                                    else if(!req.body.vacantdate && req.body.occupieddate)
                                    {
                                        results1.quarter.alloted=true;
                                        results1.quarter.occupied=true;
                                        results1.quarter.alloted_to=results1.resident._id;
                                    }
                                }
                                

                            
                                break;

                            }

                        }


                        for(i=0; i<results1.resident.occupancy_record.length; ++i)
                        {
                            if(results1.resident.occupancy_record[i].resident_record_id===req.body.id3)
                            {
                                //console.log('test2');
                                results1.resident.occupancy_record[i].date_of_order=req.body.orderdate;
                                results1.resident.occupancy_record[i].order_no=req.body.orderno;
                                results1.resident.occupancy_record[i].date_of_allotment=req.body.orderdate;
                                results1.resident.occupancy_record[i].date_of_occupancy=req.body.occupieddate;
                                results1.resident.occupancy_record[i].extend_up_to=req.body.extendupto;
                                results1.resident.occupancy_record[i].date_of_vacancy=req.body.vacantdate;
                                results1.resident.occupancy_record[i].comments=req.body.comments;

                                if(results1.resident.quarter_alloted===true && flag===false)
                                {
                                    flag=true;
                                    res.render('quarter_edit', { title: results.quarter.name, data: results.quarter, warning:'This Employee/Pensioner already has a quarter alloted', role: req.session.role});
                                }

                                else
                                {
                                    if(!req.body.vacantdate && !req.body.occupieddate)
                                    {
                                        results1.resident.quarter_alloted=true;
                                        results1.resident.alloted_quarter=req.params.id;
                                    }

                                    else if(!req.body.vacantdate && req.body.occupieddate)
                                    {
                                        results1.resident.quarter_alloted=true;
                                        results1.resident.quarter_occupied=true;
                                        results1.resident.alloted_quarter=req.params.id;
                                    }
                                }
                                

                                break;

                            }

                        }
                        
                        if(flag===false)
                        {

                            results1.quarter.save(function(err)
                        {
                            if (err) return next(err);

                            results1.resident.save(function(err)
                            {
                                if(err) return next(err);

                                async.parallel({ 
                                    quarter: function(callback) { 
                                        Quarter.findById(req.params.id).populate('residency_record.resident').exec(callback);
                                     }
                                
                                    },
                                
                                     function (err, results2){
                                
                                        if(err) return next(err);
                                
                                        res.render('quarter_edit', { title: results2.quarter.name, data: results2.quarter, success:'Saved Successfully', role: req.session.role } );
                                
                                     }
                                
                                );



                            });

                        });
                        }
                        
                        }

                        

                    });


                

            }


            }
    
            
            
           
        });

        
        

        
        
    }
];


exports.transfer_alert=function(req, res) {
    res.send('NOT IMPLEMENTED: Transfer Alert');
};

exports.retirement_alert=function(req, res){
    res.send('NOT IMPLEMENTED: Retirement Alert');
};

exports.waitlist_get=function(req, res){
    res.send('NOT IMPLEMENTED: Waitlist Alert GET');
};

exports.waitlist_post=function(req, res){
    res.send('NOT IMPLEMENTED: Waitlist Alert Post');
};

exports.export_data=function(req, res){
    res.send('NOT IMPLEMENTED: Export Data')
};




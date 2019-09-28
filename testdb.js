#! /usr/bin/env node

console.log('This script test populating some quarters, resdients into database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Quarter = require('./models/quarter')
var Resident = require('./models/resident')
var Prosixmaster = require('./models/prosixmaster')
var Contactlist = require('./models/contactlist')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var prosixmasterinstance= new Prosixmaster(
    {
        employeeid: 'E14972',
        name: 'Saumya Upadhyay',
        designation: 'Asst. IT Manager',
        prev_company: 'SBPDCL',
        prev_location: 'ESD Bihta',
        curr_company: 'BSPHCL',
        curr_location: 'BSPHCL HQ Unit',
        prev_location_hra_type: 'others',
        curr_location_hra_type: 'city',
        date_of_actual_retirement: '',
        last_maint_charge_deducted_amount: 100
    }
);

/*var residentinstance= new Resident(
    {
        name: 'E15886',
        type: 'Employee',
    }
);*/



prosixmasterinstance.save(function (err) {
    if (err) {
      //return next(err);
      console.log(err);
      mongoose.connection.close();
    }
    else
    {
        console.log('New Quarter: ' + prosixmasterinstance);
        mongoose.connection.close();
    }
    
  } );
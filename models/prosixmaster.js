var mongoose = require ('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var ProsixmasterSchema= new Schema (
    {
        employeeid: { type:String, required: true},
        name: { type:String, required: true, max: 150},
        designation: { type:String,  max: 150},
        contactnumber: String,
        prev_company: { type:String,  max: 150},
        prev_location: { type:String,  max: 150},
        curr_company: { type:String,   max: 150},
        curr_location: { type:String,   max: 150},
        date_of_actual_retirement: Date,
        last_maint_charge_deducted_amount: Number
    }
);

ProsixmasterSchema.virtual('doar_formatted').get(function() {
  
    if(this.date_of_actual_retirement){return moment(this.date_of_actual_retirement).format('DD-MM-YYYY');}
  
    else
     return '';
  });
  

module.exports = mongoose.model('Prosixmaster', ProsixmasterSchema);
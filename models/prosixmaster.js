var mongoose = require ('mongoose');

var Schema = mongoose.Schema;

var ProsixmasterSchema= new Schema (
    {
        employeeid: { type:String, required: true},
        name: { type:String, required: true, max: 150},
        designation: { type:String, required: true, max: 150},
        prev_company: { type:String,  max: 150},
        prev_location: { type:String,  max: 150},
        curr_company: { type:String,   max: 150},
        curr_location: { type:String,   max: 150},
        prev_location_hra_type:{ type:String,  enum: ['city', 'others'], max: 150},
        curr_location_hra_type:{ type:String,  enum: ['city', 'others'], max: 150},
        date_of_actual_retirement: Date,
        last_maint_charge_deducted_amount: Number
    }
);

module.exports = mongoose.model('Prosixmaster', ProsixmasterSchema);
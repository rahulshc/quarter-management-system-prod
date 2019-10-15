var mongoose = require('mongoose');
var moment = require('moment');

var Schema=mongoose.Schema;

var ResidentSchema = new Schema (
    {
        name: {type: String },//name is actually employee id of prosix if the type is Employee or actual name if it is of type others
        prosixname: {type: String},
        type: {type: String, required: true, enum : ['Employee', 'Pensioner', 'Others']},
        quarter_alloted: { type: Boolean, default: false},
        quarter_occupied: { type: Boolean, default: false},
        alloted_quarter: {type: Schema.Types.ObjectId, ref:'Quarter'},
        occupancy_record: [{
            quarter: { type: Schema.Types.ObjectId, ref:'Quarter'},
            resident_record_id: String,
            date_of_order: Date,
            order_no: {type: String, lowercase: true, max:150},
            date_of_allotment: Date,
            date_of_occupancy: Date,
            extend_up_to: Date,
            date_of_vacancy: Date,
            comments: {type: String}
        }]

    }
    
);

ResidentSchema
.virtual('url')
.get(function () {
  return '/qms/resident/' + this._id;
});


ResidentSchema.path('occupancy_record').schema.virtual('order_date_formatted').get(function() {
  
    if(this.date_of_order){return moment(this.date_of_order).format('DD-MM-YYYY');}
  
    else
     return '';
  });
  
  ResidentSchema.path('occupancy_record').schema.virtual('allotment_date_formatted').get(function() {
  
    if(this.date_of_allotment){return moment(this.date_of_allotment).format('DD-MM-YYYY');}
  
    else
     return '';
  });
  
  ResidentSchema.path('occupancy_record').schema.virtual('occupancy_date_formatted').get(function() {
  
    if(this.date_of_occupancy){return moment(this.date_of_occupancy).format('DD-MM-YYYY');}
  
    else
     return '';
  
  });
  
  ResidentSchema.path('occupancy_record').schema.virtual('vacant_date_formatted').get(function() {
  
    if(this.date_of_vacancy) { return moment(this.date_of_vacancy).format('DD-MM-YYYY');}
  
    else
     return '';
  });

  ResidentSchema.path('occupancy_record').schema.virtual('extend_up_to_formatted').get(function() {
  
    if(this.extend_up_to) { return moment(this.extend_up_to).format('DD-MM-YYYY');}
  
    else
     return '';
  });

module.exports = mongoose.model('Resident', ResidentSchema);
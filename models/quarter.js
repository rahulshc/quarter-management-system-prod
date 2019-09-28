var mongoose= require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var QuarterSchema= new Schema (
    {
        name: {type: String, uppercase: true, trim: true, required: true, max: 100},
        type: {type: String, uppercase: true, required: true, enum: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'OH']},
        status: {type: String, required: true, enum: ['Ok', 'Under Maintenance', 'Abandoned', 'Demolished'], default: 'Ok'},
        alloted: { type: Boolean, default: false},
        occupied: { type: Boolean, default: false},
        alloted_to: { type: Schema.Types.ObjectId, ref:'Resident'},
        prev_maint_date: Date,
        next_maint_date: Date,
        residency_record: [{ 
            resident: { type: Schema.Types.ObjectId, ref:'Resident'},
            date_of_order: Date,
            order_no: {type: String, lowercase: true, max:150},
            date_of_allotment: Date,
            date_of_occupancy: Date,
            extend_up_to: Date,
            date_of_vacancy: Date,
            comments: {type: String}
        }],
        comments: {type: String}
    }

    
);


// Virtual for book's URL
QuarterSchema
.virtual('url')
.get(function () {
  return '/qms/quarter/' + this._id +'/edit';
});
/*var i=0;
QuarterSchema.virtual('order_date_formatted')
.get(function () {
  return moment(this.residency_record[i].date_of_order).format('YYYY-MM-DD');
});*/

QuarterSchema.path('residency_record').schema.virtual('order_date_formatted').get(function() {
  
  if(this.date_of_order){return moment(this.date_of_order).format('YYYY-MM-DD');}

  else
   return '';
});

QuarterSchema.path('residency_record').schema.virtual('allotment_date_formatted').get(function() {

  if(this.date_of_allotment){return moment(this.date_of_allotment).format('YYYY-MM-DD');}

  else
   return '';
});

QuarterSchema.path('residency_record').schema.virtual('occupancy_date_formatted').get(function() {

  if(this.date_of_occupancy){return moment(this.date_of_occupancy).format('YYYY-MM-DD');}

  else
   return '';

});

QuarterSchema.path('residency_record').schema.virtual('vacant_date_formatted').get(function() {

  if(this.date_of_vacancy) { return moment(this.date_of_vacancy).format('YYYY-MM-DD');}

  else
   return '';
});

QuarterSchema.path('residency_record').schema.virtual('extend_up_to_formatted').get(function() {

  if(this.extend_up_to) { return moment(this.extend_up_to).format('YYYY-MM-DD');}

  else
   return '';
});

module.exports = mongoose.model('Quarter', QuarterSchema);
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ContactlistSchema=new Schema(
    {
        name: {type: String, max: 150},
        location: {type: String, max: 150},
        mobile_no: {type: String, match: /\d{10}/},
        email_address: {type: String, max: 150}
    }
);

module.exports = mongoose.model('Contactlist', ContactlistSchema);
var mongoose= require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var UserSchema= new Schema (
    {
        username: {type: String, uppercase: true, trim: true, required: true, unique: true },
        password: {type: String, required: true },
        empid: {type: String, uppercase: true, trim: true, required: true, unique: true },
        name: {type: String, uppercase: true, trim: true, required: true },
        status: {type: String, required: true, enum: ['active', 'inactive'], default: 'inactive'},
        mobilenumber: { type: Number, required: true },
        role: {type: String, required: true, enum: ['admin', 'hr', 'accounts'] },
        comments: {type: String }
    }
        
);

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);
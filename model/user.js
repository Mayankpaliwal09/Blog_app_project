const mongoose = require('mongoose');
//this passport local mongoose will automaTICALL Add the username and password in the required place
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    }
    // no need of username and password as menyioned earlier
    // username:{
    //     type:String,
    //     required:true

    // },
    // password:{
    //     type:Number,
    //     required:true
    // }
})

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User',userSchema);

module.exports = User;
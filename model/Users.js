const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    role:{
        type:String,
        enum : ['Admin','User'],
        default: 'User'
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    
},
    { timestamps: true }
)
module.exports = mongoose.model("User", UserSchema);
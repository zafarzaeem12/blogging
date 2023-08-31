const mongoose = require('mongoose');

const FollowingSchema = new mongoose.Schema({

    FollowingUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    is_following:{
        type: Boolean,
        default : false
    },
    endUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    
    
},
    { timestamps: true }
)
module.exports = mongoose.model("Followuser", FollowingSchema);
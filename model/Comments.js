const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({

    FollowingUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    Post_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    },
    Comment_user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    description :{
        type :String
    }
    
    
},
    { timestamps: true }
)
module.exports = mongoose.model("Comments", CommentsSchema);
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    image : {
        type: String,
    },
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    },
    },
    
    { timestamps: true }
)
module.exports = mongoose.model("Post", PostSchema);
const Following = require('../model/Following');
const Comment = require('../model/Comments');
var mongoose = require('mongoose');

const Comment_users = async (req,res,next) => {
try{
    const check_following = await Following.find(
       { $and : [{ FollowingUser : req.body.FollowingUser } , {endUser : req.user.id } ]}
        )
       
    if(check_following && check_following.length == 0){
        return res.status(404).send({ message : "You are not following this person"})
    }

    const Data = {
        FollowingUser : req.body.FollowingUser,
        Post_id : req.body.Post_id,
        Comment_user_id : req.user.id,
        description : req.body.description,
    }

    const CommentUser = await Comment.create(Data)
    res
    .status(200)
    .send({ 
        message : "Comment on Post Succssfully" , 
        data : CommentUser 
    })

}catch(err){
    res
    .status(404)
    .send({ 
        message : "No Comment Posted"
    })
}
}

const See_Comments_on_Post = async (req,res,next) => {
    const ids = new mongoose.Types.ObjectId(req.body.FollowingUser);
    const userid = new mongoose.Types.ObjectId(req.user.id);
try{
    const data = [
        {
          '$match': {
            'FollowingUser': ids,
            'endUser': userid
          }
        }, {
          '$lookup': {
            'from': 'posts', 
            'let': {
              'followingid': '$FollowingUser'
            }, 
            'pipeline': [
              {
                '$match': {
                  '$expr': {
                    '$eq': [
                      '$createdby', '$$followingid'
                    ]
                  }
                }
              }
            ], 
            'as': 'following'
          }
        }, {
          '$lookup': {
            'from': 'comments', 
            'localField': 'following._id', 
            'foreignField': 'Post_id', 
            'as': 'User_Comments'
          }
        }
      ]

     const allcomments =  await Following.aggregate(data)
     res.status(200).send({
        message : "Following Comments Fetched",
        data : allcomments
     })
}catch(err){
    res.status(404).send({ message : "No Comments on posts"})
}
}
module.exports = {
    Comment_users,
    See_Comments_on_Post
}
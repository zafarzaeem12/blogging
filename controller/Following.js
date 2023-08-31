const Following = require('../model/Following')
var mongoose = require('mongoose');
const Follow_Users = async (req,res,next) => {
try{
    const Data = {
        FollowingUser : req.body.FollowingUser,
        is_following : true,
        endUser : req.user.id
    }

    const Followed = await Following.create(Data)
    res.status(200).send({
        message : "Following now",
        data : Followed
    })
}catch(err){
    res.status(404).send({
        message : "Not Following"
    })
}
}

const News_Feed = async (req,res,next) => {
    const ids = new mongoose.Types.ObjectId(req.body.FollowingUser);
    const userid = new mongoose.Types.ObjectId(req.user.id);
    console.log(ids  , userid)

try{

 const data =   [
    {
      '$match': {
        'FollowingUser': ids, 
        'endUser': userid
      }
    }, {
      '$lookup': {
        'from': 'posts', 
        'let': {
          'followingUserId': '$FollowingUser'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  '$createdby', '$$followingUserId'
                ]
              }
            }
          }
        ], 
        'as': 'user_posts'
      }
    }, {
      '$sort': {
        'createdAt': -1
      }
    }
  ]

      const News_Feeds = await Following.aggregate(data);
      res
      .status(200)
      .send({ 
        message : "News Feed Successfully " , 
        data : News_Feeds
    })

}catch(err){
    res.status(404).send({ message : "no News feed " })
}
}

module.exports = {
    Follow_Users,
    News_Feed
}
const Posts = require('../model/Posts');
const Users = require('../model/Users');

const create_Posts = async (req, res, next) => {
    try{


        const Data = {
            title : req.body.title,
            description : req.body.description,
            image : req.file ? req.file.path.replace(/\\/g, "/") : req.body.image,
            createdby : req.user.id,
            Category : req.body.Category
        }

        const checkAdmin = await Users.findOne({ _id : Data.createdby } )
       
        if(checkAdmin && checkAdmin.role == 'User') {
            return res.status(404).send({ message : "You are not admin" })
        }else{
            const savedPosts = await Posts.create(Data);
          return  res
            .status(200)
            .send({ 
                message : "Post Created Successfully" , 
                data : savedPosts 
            })
        }

    }catch(err){
        res.status(500).send({
            message : "No Post Created"
        })
    }
}
const Update_Posts = async (req, res, next) => {
    const id = req.params.id
    try {
        const Data = {
   
            title: req.body.title,
            description: req.body.description,
            createdby: req.user.id, // Assuming req.user.id is correct and authorized
            image: req.file ? req.file.path.replace(/\\/g, "/") : req.body.image,
            Category: req.body.Category,
        } 
      const UpdatedPost = await Posts.findByIdAndUpdate(
        { _id: id },
        { $set: Data  },
        { new: true }
      );
  
      if (!UpdatedPost) {
        return res.status(404).send({ message: "Post not found" });
      }
  
      res.status(200).send({ message: "Updated Successfully", data: UpdatedPost });
    } catch (err) {
      console.error(err); // Log the actual error for debugging
  
      res.status(500).send({ message: "Error updating post" });
    }
  };
  
  
const Delete_Posts = async (req, res, next) => {
    console.log(req.params.id)
    try{

        const notfound = await Posts.find({ _id : req.params.id })
        if(notfound.length == 0){
            return res.status(404).send({ message : "No Post Found"})

        }
      

       const deletePost = await Posts.deleteOne({ _id : req.params.id })
       const { acknowledged , deletedCount } = deletePost;
        if(acknowledged === true , deletedCount === 1){
           return res.status(200).send({ message : "Post Deleted Successfully"})
        }


    }catch(err){
        res.status(500).send({ message : "Post not deleted"})
    }
}

module.exports = {
    create_Posts,
    Update_Posts,
    Delete_Posts,
}
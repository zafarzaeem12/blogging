const router = require('express').Router();
const {verifyToken} = require('../middleware/authenticate');
const File = require('../middleware/ImagesandVideosData');
const { 
    Register_New_User ,
    LoginRegisteredUser 
} = require('../controller/Users')

const {
    create_Category,
    getCategory,
    SpecficCategory,
    UpdateCategory,
    DeleteCategory
} = require("../controller/Categories")

const {
    create_Posts,
    Update_Posts,
    Delete_Posts,
    Get_All_Post,
    SpecficPost
} = require("../controller/Posts")


// user api start here
router.post('/create_new_User' , Register_New_User);
router.post('/login' ,  LoginRegisteredUser);
// user api end here



/** Category api start here  */
router.post("/createCategory" ,verifyToken ,create_Category )
router.get("/getallcategory" ,verifyToken , getCategory )
router.get("/get/:id" ,verifyToken ,SpecficCategory )
router.put("/updateCategory/:id" ,verifyToken ,UpdateCategory )
router.post("/deleteCategory/:id" ,verifyToken ,DeleteCategory )
/** Category api end here  */

/** Posts api start here  */
router.post("/createPost" , File.user ,verifyToken ,create_Posts )
router.get("/getallpost" ,verifyToken , Get_All_Post )
router.get("/gets/:id" ,verifyToken ,SpecficPost )
router.put("/updatePost/:id" , File.user , verifyToken ,Update_Posts )
router.delete("/deletePost/:id" ,verifyToken ,Delete_Posts )
/** Posts api end here  */


module.exports = router
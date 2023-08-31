const router = require('express').Router();
const {verifyToken} = require('../middleware/authenticate');
//const File = require('../middleware/ImagesandVideosData');
const { 
    Register_New_User ,
    LoginRegisteredUser 
} = require('../controller/Users')

const {
    Get_All_Post,
} = require("../controller/Posts")


// user api start here
router.post('/create_new_User' , Register_New_User);
router.post('/login' ,  LoginRegisteredUser);
// user api end here

/** Posts api start here  */
router.get("/getallpost" ,verifyToken , Get_All_Post )
/** Posts api end here  */

module.exports = router
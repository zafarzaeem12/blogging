const router = require('express').Router();
const verifyToken = require('../middleware/authenticate');
//const File = require('../middleware/ImagesandVideosData');
const { 
    Register_New_User ,
    LoginRegisteredUser 
} = require('../controller/Users')



// user api start here
router.post('/create_new_User' , Register_New_User);
router.post('/login' ,  LoginRegisteredUser);
// user api end here



module.exports = router
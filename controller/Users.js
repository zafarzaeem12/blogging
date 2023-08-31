const User = require("../model/Users");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const Register_New_User = async (req, res) => {
    const typed_Email = req.body.email;
  
    try {
      const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const check_email = await User.findOne({ email: typed_Email });
      const pass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  
      if (check_email?.email == typed_Email) {
        res.send({
          message: "this email is already exists",
          status: 400,
        });
      } else if (!typed_Email) {
        res.send({
          message: "Email is required",
          status: 404,
        });
      } else if (!typed_Email.match(emailValidation)) {
        res.send({
          message: "Email is not valid",
          status: 404,
        });
      } else if (!req.body.password) {
        res.send({
          message: "Password is required",
          status: 404,
        });
      } else if (!req.body.password.match(pass)) {
        res.send({
          message:
            "Password should be 8 characters long (should contain uppercase, lowercase, numeric and special character)",
          status: 404,
        });
      } else if (!req.body.username) {
        return res.send({ message: "User name Field is required", status: 400 });
      } else {
        const newUser = {
          email: typed_Email,
          password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
          ).toString(),
          username : req.body.username,
          role : req.body.role
        };
        const Register = await User.create(newUser);
  
        const { password , ...others } = Register._doc;
  
        
        return res.status(201).send({
          message: "User Register Successfully",
          status: 201,
          data: others
        });
      }
    } catch (err) {
      res
      .status(500).send({
        message: "User not found",
      });
    }
  };


  const LoginRegisteredUser = async (req, res, next) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
  
      const LoginUser = await User.findOne({
        email: email,
      });
      const gen_password = CryptoJS.AES.decrypt(
        LoginUser?.password,
        process.env.SECRET_KEY
      );
      const original_password = gen_password.toString(CryptoJS.enc.Utf8);
  
      if (email !== LoginUser?.email) {
       return res.status(404).send({ message: "Email Not Matched" });
      } else if (password !== original_password) {
        return res.status(404).send({ message: "Password Not Matched" });
      } else {
        const token = jwt.sign(
          {
            id: LoginUser._id,
          },
          process.env.SECRET_KEY,
          { expiresIn: "5h" }
        );
        const save_token = await User.findByIdAndUpdate(
          { _id: LoginUser?._id?.toString() },
          { $set: { user_authentication: `${token}` } },
          { new: true }
        );
        const { user_authentication , user_image , email , name , _id } = save_token;
  
       return res.status(200).send({
          message: "Login Successful",
          status : 200,
          data:  {user_authentication , user_image , email , name , _id} ,
        });
      }
    } catch (err) {
      res.status(404).send({
        message: "Login Failed",
        status: 404,
      });
    }
  };


module.exports = {
    Register_New_User,
    LoginRegisteredUser
}
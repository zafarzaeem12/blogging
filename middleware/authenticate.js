const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../model/Users');
const { decode } = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {

if(!req.headers['authorization']) {
    return res.status(401).send({ status: 0, message: 'Unauthorized' });
}

try {
    // Get token from header
    token = req.headers['authorization'].split(' ')[1]

    //verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY)

    // console.log('token ** ', decoded);

    //Get user from the token
    req.id = decoded.id
    req.user = await User.findById(req.id).select('-password')
  if(!req.user){
        return res.status(401).send({ status: 0, message: 'Unauthorized' });
    }
    else if(req.user.user_authentication != token){
        return res.status(401).send({ status: 0, message: 'Unauthorized' });
    }
    else{
        next()
    }
  } catch (error) {
    console.log(error)
    return res.status(401).send({ status: 0, message: 'Unauthorized' });
}
};

module.exports = {verifyToken};
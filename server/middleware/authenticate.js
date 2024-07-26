const jwt = require("jsonwebtoken");
const userdb = require("../models/userSchema");
const keysecret = "abcdefghijklmnopqrstuvwxyzaaaaaa"


const authenticate = async(req,res,next)=>{

    try {
        const token = req.cookies.usercookie;
        const verifytoken = jwt.verify(token,keysecret);
        const rootUser = await userdb.findOne({_id:verifytoken._id,"tokens.token":token});
        if(!rootUser) {throw new Error("user not found")}
        
        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        next();

    } catch (error) {
        res.status(401).json({status:401,message:"Unauthorized no token provide"})
    }
}


module.exports = authenticate
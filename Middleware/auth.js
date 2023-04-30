const jwt=require('jsonwebtoken')
const User=require('../Models/user')
require('dotenv').config()

const auth= async(req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user=await User.findOne({
            _id:decoded._id,
            'tokens.token':token
        })

        if(!user)
        {
            throw new Error
        }

        req.token=token
        req.user=user
        next()
    }
    catch(err)
    {
        res.status(401).send({error:"Authentication Required"})
    }
}


// const reqlogger=(req,res,next)=>{
// console.log(`Request: ${req.method}`)
// next()
// }
module.exports=auth
// module.exports=reqlogger
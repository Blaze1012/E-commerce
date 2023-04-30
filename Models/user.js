const mongoose=require('mongoose')
require('dotenv').config()
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const userSchema=new mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim:true,      //removes white spaces from both ends
        lowercase:true

    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        // validate(value){
        //     if(!this.validate.isEmail(value))
        //     throw new error('Email is invalid')
        // }
    },
    password:{
        type:String,
        required:true,
        minLength:7,
        trim:true,
        // validate(value){
        //     if(value.toLowerCase().includes('password'))
        //     throw new Error('password must\'t contain password')
        // }

    },
    tokens:[{
        token:{
            type:String,
            required:true,
        }

    }]
},
{
    timestamps:true,
}

)

//called using a user object
//generates a jwt token using user id,add the token in the user's document and returns the token

userSchema.methods.generateAuthToken = async function () {
    const user = this
     const token = jwt.sign({ _id: user._id.toString()},      process.env.JWT_SECRET)
 user.tokens = user.tokens.concat({token})
    await user.save()
    return token
 }


 //a function that checks if the password field in a user model has been modified and hash the password just before saving the user.

 //middleware which runs before every save operation
 userSchema.pre('save',async function(next){
const user=this
if(user.isModified('password'))
user.password=await bcrypt.hash(user.password,8)
 next()
 })

 userSchema.statics.findByCredentials=async(email,password)=>{
     const user=await User.findOne({
        email})
        if(!user)
        throw new Error('Unable to log in')

        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            throw new Error('Wrong Password')
        }

        return user
 }
const User=mongoose.model('User',userSchema)
module.exports=User
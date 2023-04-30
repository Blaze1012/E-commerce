const express=require('express')
const User=require('../Models/user')
const Auth=require('../Middleware/auth')

const router=new express.Router()


//Register
router.post('/users',async(req,res)=>{
    console.log('new user registration started')
        const user=new User(req.body)
        try{
            await user.save()
            const token=await user.generateAuthToken()
            res.status(201).send({user,token}) 
            
        }
        catch(err)
        {
            res.status(400).send(err)
            console.log(err)
        }
        
})


//Login
router.post('/users/login', async(req,res)=>{
    try{
    const user=await User.findByCredentials(req.body.email,req.body.password)

    const token=await user.generateAuthToken()

    res.send({user,token})
    }
    catch(err)
    {
        res.status(400).send(err)
    }
})

//Logout
router.post('/users/logout',Auth,async(req,res)=>{

    try{
        //removes the token send by frontend from the tokens array in User Database
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token !==req.token
        })

        await req.user.save()
        console.log(`logged out`)
        res.send()
    }
    catch(err)
    {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', Auth, async(req, res) => {
    try {
       req.user.tokens = []
       await req.user.save()
       res.send()
    } catch (err) {  
       res.status(500).send()
    }
    })


router.get('/allusers',async(req,res)=>{
    try{
        var users=[];
        users=await User.find({},'-tokens -__v -createdAt -updatedAt -password',)
        res.status(200).send({
            users:users
        })

    }
    catch(err){
        
        res.status(500).send(err);
    }
})

module.exports=router
const express=require('express')
require('dotenv').config()
const Database=require('./db/mongoose.js')
const cartRouter=require('./Routers/cart')
const itemRouter=require('./Routers/item')
const userRouter=require('./Routers/user')
const adminRouter=require('./Routers/admin')

const payRouter=require('./Routers/payment')
const orderRouter=require('./Routers/order')
const app=express();
// const reqlogger=require('./Middleware/auth')



const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.json());
// app.use(reqlogger)
app.use(userRouter)
app.use(itemRouter)
app.use(cartRouter)
app.use(payRouter)
app.use(orderRouter)
// app.use('/admin',adminRouter)
app.use(express.static('public'))


app.get('/hello',(req,res)=>{
    res.send({
        message:'hello'
    })
})




const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`listening on port:${PORT}`);
})

Database();


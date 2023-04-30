const express = require("express");
const Cart = require("../models/cart");
const Item = require("../models/item");
const Order=require("../Models/order")
const Auth = require("../middleware/auth");
const router = new express.Router();


router.post('/order',Auth,async (req,res)=>{
    const owner=req.user._id;
    const items=req.body.items
    const bill=req.body.bill
    try{
    const data=await Order.findOne({
        owner
    })
    if(data){
        //if order of user exists
        console.log(`data: ${data}`)
        
        const orders=data.orders
        console.log(`Orders: ${orders}`)
        orders.push({
            items,
            bill
        })
        data.orders=orders
        await data.save();
        return res.status(201).send(data)
    }
    else
    {
        // if no order exist for user
        const newOrder=await Order.create({
            owner,
            orders:[{
                items,
                bill
            }]

        })

        return res.status(201).send(newOrder)
     }
}
catch(err)
{
    console.log(err);
res.status(500).send("something went wrong");
}

    
})

router.get('/order',Auth,async (req,res)=>{
    try{
    const owner=req.user._id;
    const data=await Order.findOne({
        owner 

       
})
    return res.status(201).send(data)

    }
    catch(error)
    {
        console.log(error);
    res.status(500).send("something went wrong");
    }

})
module.exports=router
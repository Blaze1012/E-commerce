const express=require('express')
const mongoose=require('mongoose')
// const Item=require('../Models/item')
const Item=mongoose.model('Item')
const Auth=require('../Middleware/auth')
const router=new express.Router()


// adding item
router.post('/items/',Auth,async(req,res)=>{
    try{
        const newItem= new Item({
            ...req.body,
            owner:req.user._id
        })
            await newItem.save();
            res.status(201).send(newItem)
    }
    catch(err)
    {
        res.status(400).send({
            message:'err'
        })
    }
})


// fetching item

router.post('/items/:id',async(req,res)=>{
    try{
    const item= await Item.findOne({
        _id:req.params.id
    })
    if(!item)
    res.status(404).send({
        error:'item not found'
    })

    res.status(200).send(item)
}
catch(err)
{
    res.send(400).send(err)
}
})

// fetch all items

router.get('/items', async(req, res) => {
    try {
      const items = await Item.find({})
      res.status(200).send(items)
    } catch (error) {
      res.status(400).send(error)
    }
    })


    router.patch('/items/:id', Auth, async(req, res) => {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'description', 'category', 'price']
        const isValidOperation = updates.every((update) =>              allowedUpdates.includes(update))
           if(!isValidOperation) {
             return res.status(400).send({ error: 'invalid updates'})
        }
        try {
          const item = await Item.findOne({ _id: req.params.id})
          if(!item){
              return res.status(404).send()
          }
          updates.forEach((update) => item[update] = req.body[update])
          await item.save()
          res.send(item)
        } catch (error) {
        res.status(400).send(error)
        }
        })  


router.delete('/items/:id', Auth, async(req, res) => {
    try {
    const deletedItem = await Item.findOneAndDelete( {_id: req.params.id} )
       if(!deletedItem) {
        res.status(404).send({error: "Item not found"})
    }
       res.send(deletedItem)
    } catch (error) {
       res.status(400).send(error)
    }
    })

    module.exports=router
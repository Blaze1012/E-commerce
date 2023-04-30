const mongoose=require('mongoose')
const ObjectID=mongoose.Schema.Types.ObjectId
const orderSchema=new mongoose.Schema({

    owner:{
        type:ObjectID,
        required:true,
        ref:'User'
    },
    orders:[
        {
            items:[
                {
                    itemId:{
                        type:ObjectID,
                        ref:'Item',
                        required:true
                    },
                    name:String,
                    quantity:{
                        type:Number,
                        required:true,
                        min:1,
                        default:1
                    
                    },
                    price:Number,
                    imageURL:{type:String}
                }
            ],
            bill:{
                type:Number,
                required:true,
                default:0
            },
            delivered:{
                type:Boolean,
                default:false
            }
        }
    ]


},{
    timestamps:true
}
)

const Order = mongoose.model('Order', orderSchema)
module.exports = Order
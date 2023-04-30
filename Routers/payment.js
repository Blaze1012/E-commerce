const express=require('express')
const mongoose=require('mongoose')
const Auth=require('../Middleware/auth')
const stripe = require('stripe')('sk_test_51Mj5DvSG8CifBg7AGGNzdZbJTq249NWtBsO4ow7WRd5i9EInfReXT1Xm6ksgk9E0RLGgTehCyF7CMA1NkUOMDR9t00CYlmesUf');
const path=require('path')
const cors=require('cors')
const Cart=mongoose.model('Cart')
const router=new express.Router();
const endpointSecret = 'whsec_...';
// router.post('/create-checkout-session',async (req,res)=>{
//     console.log('initiating paymnet')
//     const {product}=req.body;
//     const session=await stripe.checkout.sessions.create({
//         payment_method_types:['card'],
//         line_items: [
//             {
//               // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//               price: 'price_1MjF20SG8CifBg7AffIooSHv',
//               quantity: 1,
//             },
//           ],
      
//         mode:'payment',
//         success_url: "http://localhost:3000/success", 
//     cancel_url: "http://localhost:3000/cancel",
//     })
//     res.redirect(303,session.url)
//     })
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
 router.use(cors(corsOptions))
router.options('*', cors())

// router.post('/create-checkout-session',Auth, async (req, res) => {

//     const userid=req.user._id;
//     const userBill=Cart.findOne({
//         owner:userid
        
//     })
    

//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//           price: 'price_1MjF20SG8CifBg7AffIooSHv',
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: `http://localhost:3000/success.html`,
//       cancel_url: `http://localhost:3000/cancel.html`,
//     });
  
//     res.redirect(303, session.url);
//   });

router.post('/create-checkout-session',Auth, async (req, res) => {

    const owner=req.user._id;
    const userBill=await Cart.findOne({ owner });

    console.log(`${owner}`)
    console.log(`${userBill.bill}00`)
    

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price_data:{
            currency:'inr',
            product_data:{
                name:'E-Commerce'
            },
            unit_amount:`${userBill.bill}00`
          },
            
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3000/success.html`,
      cancel_url: `http://localhost:3000/cancel.html`,
    })
  res.json({url:session.url});
    
  })
 
  // router.post('/webhook', function(request, response) {
  //   const sig = request.headers['stripe-signature'];
  //   const body = request.body;
  
  //   let event = null;
  
  //   try {
  //     event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  //   } catch (err) {
  //     // invalid signature
  //     console.log(`invalid signature stripe`)
  //     response.status(400).end();
  //     return;
  //   }
  
  //   let intent = null;
  //   switch (event['type']) {
  //     case 'payment_intent.succeeded':
  //       intent = event.data.object;
  //       console.log("Succeeded:", intent.id);
  //       break;
  //     case 'payment_intent.payment_failed':
  //       intent = event.data.object;
  //       const message = intent.last_payment_error && intent.last_payment_error.message;
  //       console.log('Failed:', intent.id, message);
  //       break;
  //   }
  
  //   response.sendStatus(200);
  // });
  


module.exports=router;
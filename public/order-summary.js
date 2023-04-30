const userTab=document.getElementById('currentUser')
const Username=sessionStorage.getItem('Name')
const userTabDropDown=document.getElementsByClassName('user-dropdown')
if(Username)
userTab.innerHTML=`<b>${Username}</b>`
console.log(`${Username}  here`)

const LogoutBtn=document.getElementById('logout')
LogoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    const token=sessionStorage.getItem('JWT')
    const auth='Bearer '+token
    fetch('http://localhost:3000/users/logout', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth
    },
    
})
   .then((res)=>{
    console.log(`Response : ${res}`)
    sessionStorage.removeItem('JWT')
    sessionStorage.removeItem('Name')
    
    // location.reload()
    window.location="http://localhost:3000/homepage.html";
    

   })

})

async function getOrder(){
    var orders=[];
    var products=[];
    var cards=[];
    const token=sessionStorage.getItem('JWT')
    const auth='Bearer '+token
    await fetch('http://localhost:3000/order',{
        method:'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': auth
        }
    })
    .then(response=>response.json())
    .then(async(data)=>{
        orders=data.orders
        console.log(orders)
        
        var orderidcards=[];
        for(const i in orders)
        {
            var cards=[];
            var id=orders[i]._id;
            var items=orders[i].items;
            var grandtotal=orders[i].bill;
        

        var orderidcard=`<div class="order-id${i}">
    
        <h4 class="order-heading"><b>Order Id:${id}</b></h4>
      
    
      <div class="container">
        <div class="row" id="card-container${i}">
            <!--More cards will be add here-->
        </div>
    
    </div>
    
      
    
    <div class="totals">
        
        
    
      <div class="totals-item totals-item-total">
        <label>Grand Total</label>
        <div class="totals-value" id="cart-total">${grandtotal}</div>
      </div>
    </div>
    
        
    
      
    </div>
    `

            orderidcards.push(orderidcard)





        }

        $("#order-summary-container").ready(async function() {
        
        
            for (const index in orderidcards) {
                var card = orderidcards[index];
                $("#order-summary-container").append(card);
            }
        });

        for( const i in orders)
        {
            var cards=[];
            var items=orders[i].items;
            for(const j in items)
            {
                var product=items[j]
                var id=product.itemId
                var name=product.name
                var quantity=product.quantity
                var price=product.price
                var subtotal=quantity*price
                

                var card=`<div class="product">
            <div class="product-image">
              <img src="https://media.istockphoto.com/id/182436004/photo/green-check-mark.jpg?b=1&s=170667a&w=0&k=20&c=XepXFPB-1vjZ7aOD8ekO2n-IIcdPLVQouXdXYIz7Y2A=">
            </div>
            <div class="product-details">
              <div class="product-title">${name}</div>
              <p class="product-description"></p>
            </div>
            <div class="product-price">${price}</div>
            <div class="product-quantity">${quantity}</div>
            <div class="product-removal">
              <button class="remove-product" id="${id}" onClick="deleteCart(this.id)">
                Not Delivered
              </button>
            </div>
            <div class="product-line-price">${subtotal}</div>
          </div>
                            `

                cards.push(card)
            }

            await populate(i,cards)

            
            

        }


        
    })
    
}

function populate(i,cards){
    var target=`#card-container${i}`
            $(target).ready(async function() {
        
                for (const index in cards) {
                    var card = cards[index];
                    
                    await $(target).append(card);
                }
                
            });
        }
getOrder()
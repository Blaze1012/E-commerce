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
    
    location.reload()
    

   })

})

async function getCart(){
    var products=[];
    var cards=[];
    const token=sessionStorage.getItem('JWT')
    const auth='Bearer '+token
    await fetch('http://localhost:3000/cart',{
        method:'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': auth
        }
    })
    .then(response=>response.json())
    .then(async(data)=>{
        products=data.items
        console.log(data)
        
        for(const index in products)
        {   var product=products[index]
            var id=product.itemId
            var name=product.name
            var quantity=product.quantity
            var price=product.price
            var subtotal=quantity*price
            var total=data.bill
            var imageURL=await GetImageURL(id)
            
            card=`<div class="product">
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
                Remove
              </button>
            </div>
            <div class="product-line-price">${subtotal}</div>
          </div>
        `

        cards.push(card)
        }
       
        document.getElementById('cart-total').innerHTML=total|| 0
        $("#card-container").ready(async function() {
        
        
            for (const index in cards) {
                var card = cards[index];
                $("#card-container").append(card);
            }
        });
        
    })
    .catch((err)=>console.log(err))
}
async function deleteCart(id){
    const token=sessionStorage.getItem('JWT')
    const auth='Bearer '+token
    await fetch(`http://localhost:3000/cart?itemId=${id}`,{
        method:'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': auth
        }
    })
    .then(response=>response.json())
    .then(async()=>{
        document.getElementById('card-container').innerHTML=""
        await getCart()
    })
}
getCart()

async function createcheckoutsession(){

    const token=sessionStorage.getItem('JWT')
    const auth='Bearer '+token
    const body1={
        quantity:4
    }
        fetch('http://localhost:3000/create-checkout-session', {
    method: 'POST',
    mode: 'cors',
    headers: {
            
        'Access-Control-Allow-Origin':'*',
        'Authorization': auth
        
    },
    
})
    .then(res=>res.json())
   .then((res)=>{

    console.log(res.url)
    window.location.href=res.url
   })
    .catch((err)=>{
        console.log(`error : ${err}`)
        
   })
    
    

}

async function createcheckoutsession2(){
    await fetch('http:localhost-3000/checkout',{
        method:'POST',
        headers:{

        }
    })
}

async function GetImageURL(id){
    const token=sessionStorage.getItem('JWT')
    const auth='Bearer '+token
    await fetch(`http://localhost:3000/items/${id}`,{
        method:'POST',
        header:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': auth
        },
        body:{}

    })
    .then(response=>response.json())
    .then((response)=>{
        img=response.imageURL
        console.log(`images: ${img}`)
        return img
    })
}

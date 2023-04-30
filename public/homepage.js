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

async function getAllProducts(){

    var products=[];
    var cards=[];
    const token=sessionStorage.getItem('JWT')
    const auth='Bearer '+token
    await fetch('http://localhost:3000/items',{
        method:'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': auth
        }
    })
    .then(response=>response.json())
    .then(data=>products=data)
    .catch((err)=>console.log(err))

    if(products.length>0 && cards.length<1)
    {
        for(const index in products)
        {
            var product=products[index]
            var productId=product._id
            var name=product.name;
            var description=product.description;
            var category=product.category;
            var price=product.price
            var imageURL=product.imageURL

            var card=`
            <div class="col-sm" id=${productId}>
            <div class="card bg-dark" style="width: 18rem;">
                <img class="card-img-top" src=${imageURL} alt="Product Image">
                <div class="card-body text-white">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">${description}</p>
                    <br />
                    <p><strong>Price: $</strong> ${price}</p>
                </div>
                <div class="card-footer bg-transparent text-center row">
                    <button type="button" class="btn btn-outline-warning btn-sm col" id=${productId} onClick='ViewProduct(this.id)'>View Product</button>
                    <button type="button" class="btn btn-outline-warning btn-sm col offset-md-1" id="${productId}" onClick='AddtoCart(this.id,1)'>Add to Cart</button>
                </div>
            </div>
        </div>
        `;

        cards.push(card);
        }
    }

    return cards;

}



$("#card-container").ready(async function() {
    var cards = await getAllProducts();

    for (const index in cards) {
        var card = cards[index];
        $("#card-container").append(card);
    }
});


// $("#card-container").on("click", "#buy-btn", function() {
//     const id=document.getElementsByClassName('col-sm')[0].id
//     alert("Product Id:",);
// });

function ViewProduct(id){
    var item;
    fetch(`http://localhost:3000/items/${id}`,{
        method:'POST',
    })
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        item=data
        var itemid=id;
        var itemname=item.name;
        var description=item.description;
        var category=item.category;
        var price=item.price;
        var imageURL=item.imageURL
    
        document.getElementsByClassName('container main')[0].innerHTML=`<div class="container">
            <div class="card">
                <div class="container-fliud">
                    <div class="wrapper row">
                        <div class="preview col-md-6">
                            
                            <div class="preview-pic tab-content">
                              <div class="tab-pane active" id="pic-1"><img src=${imageURL}
                              /></div>
                              <div class="tab-pane" id="pic-2"><img src="http://placekitten.com/400/252" /></div>
                              <div class="tab-pane" id="pic-3"><img src="http://placekitten.com/400/252" /></div>
                              <div class="tab-pane" id="pic-4"><img src="http://placekitten.com/400/252" /></div>
                              <div class="tab-pane" id="pic-5"><img src="http://placekitten.com/400/252" /></div>
                            </div>
                            <ul class="preview-thumbnail nav nav-tabs">
                              <li class="active"><a data-target="#pic-1" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
                              <li><a data-target="#pic-2" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
                              <li><a data-target="#pic-3" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
                              <li><a data-target="#pic-4" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
                              <li><a data-target="#pic-5" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
                            </ul>
                            
                        </div>
                        <div class="details col-md-6">
                            <h3 class="product-title">${itemname}</h3>
                            <div class="rating">
                                <div class="stars">
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                </div>
                                
                            </div>
                            <p class="product-description">${description}</p>
                            <h4 class="price">current price: <span> Rs.${price}</span></h4>
                            <p class="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p>
                            <h5 class="sizes">sizes:
                                <span class="size" data-toggle="tooltip" title="small">s</span>
                                <span class="size" data-toggle="tooltip" title="medium">m</span>
                                <span class="size" data-toggle="tooltip" title="large">l</span>
                                <span class="size" data-toggle="tooltip" title="xtra large">xl</span>
                            </h5>
                            <h5 class="colors">colors:
                                <span class="color orange not-available" data-toggle="tooltip" title="Not In store"></span>
                                <span class="color green"></span>
                                <span class="color blue"></span>
                            </h5>
                            
                            <form class="form-inline">
                            <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Quantity:</label>
                            <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                                <option selected>Choose...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                                <option value="4">Four</option>
                                <option value="5">Five</option>
                                
                            </select>

                            </form>
                            <div class="action">
                                <button class="add-to-cart btn btn-default" type="button" id=${itemid} onClick='AddtoCart2(this.id)'>add to cart</button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    })
    .catch((err)=>console.log(err))
    


//     alert(`Product Id:${id}`);
}


async function AddtoCart(id,quantity){
    const token=sessionStorage.getItem('JWT')
    const auth='Bearer '+token
    const body={
        itemId: id,
    quantity: Number(quantity)
    }
   await fetch('http://localhost:3000/cart',{
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': auth
        },
        body:JSON.stringify(body)
    })
    .then(response=>response.JSON)
    .then((response)=>{
        alert('Product Added to Cart ');
        
    })
    
}

async function AddtoCart2(id){
    const token=sessionStorage.getItem('JWT')
    const auth='Bearer '+token
    const quan=document.getElementById('inlineFormCustomSelectPref').value
    if(quan=='Choose...')
    return alert('Wrong Quantity')
    const body={
        itemId: id,
    quantity:Number(quan)
    }
   await fetch('http://localhost:3000/cart',{
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': auth
        },
        body:JSON.stringify(body)
    })
    .then(response=>response.JSON)
    .then((response)=>{
        alert('Product Added to Cart ');
        
    })
    
}
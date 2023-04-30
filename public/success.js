

const token=sessionStorage.getItem('JWT')
const auth=`Bearer ${token}`
var items=[]
var bill;
function CreateOrder(){
fetch('http://localhost:3000/cart', {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth
    },
    
})
   .then(response=>response.json())
   .then((response)=>{
    items=response.items
    bill=response.bill
    newitem=JSON.stringify(items)
    console.log(`Bill: ${bill}`)
    console.log(`Items:${newitem}`)

    SendOrdertoServer(items,bill);
   })
   .catch(error)
   {
   console.log(error)
   }
}

function SendOrdertoServer(items,bill){

    var newbody={items:items,
        bill:bill}
    fetch('http://localhost:3000/order', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': auth
        },

        body:JSON.stringify(newbody)
        
    })
       .then(response=>response.json())
       .then((response)=>{
        console.log(`Order Created: ${response}`)
       })
    //    .catch(error){
    //     console.log(error)
    //    }

}
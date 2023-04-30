const { get } = require("mongoose");

async function getUsers(){
    
    await fetch('http://localhost/3000/allusers',{
        method:'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response=>response.json())
    .then((response)=>{
        var users=response.users;
        var updatedData=[];
        for(const i in users)
        {   
            var data=user[i];
            var name=data.name;
            var email=data.email;
            var id=data._id;

            var card=`<tr>
            <th scope="row">${i+1}</th>
            <td>${name}</td>
            <td>${email}</td>
            <td>null</td>
          </tr>`

          updatedData.push(card)
        }

        $('#user-table-body').ready(async function() {
        
            for (const index in updatedData) {
                var card = updatedData[index];
                
                await $('#user-table-body').append(card);
            }
            
        });

    })
}
getUsers();
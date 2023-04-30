const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");

const loginErrorMsg = document.getElementById("login-error-msg");
var delayInMilliseconds = 2000; //1 second
loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    const userlogin={
        email:username,
        password:password
    }
    // if (username === "user" && password === "web_dev") {
    //     alert("You have successfully logged in.");
    //     location.reload();
    // } else {
    //     loginErrorMsg.style.opacity = 1;
    // }

    fetch('http://localhost:3000/users/login', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(userlogin)
})
   .then(response => response.json())
   .then(async(response) => {
     const token=await response.token
     const user=await response.user.name   //todo:remove password from here
    console.log(`token recieved: ${token} and user ${user}`)
    if(token)
    {
        
loginErrorMsg.innerHTML='<p id="login-msg">Login Successful</p>'
        loginErrorMsg.style.opacity = 1
        loginErrorMsg.style.color= '#008a0e';
        loginErrorMsg.style.border= '1px solid #008a0e';
        loginErrorMsg.style.backgroundColor='#8fe5b0';
    }

    // store JWT in session storage
sessionStorage.setItem('JWT', token);
sessionStorage.setItem('Name',user);



    setTimeout(function() {
      //your code to be executed after 1 second
      window.location = "/homepage.html";
    }, delayInMilliseconds);
    })

    .catch((err)=>{
        loginErrorMsg.style.opacity = 1;
        setTimeout(()=>{
            location.reload();
        },delayInMilliseconds)
    })

    
    
})

function RegisterButton(){
    document.getElementById('login-form').innerHTML=`
    <input type="text" name="name" id="name-field" class="login-form-field" placeholder="Name">

    <input type="text" name="username" id="username-field" class="login-form-field" placeholder="Email">

    <input type="password" name="password" id="password-field" class="login-form-field" placeholder="Password">


    <input type="button" value="Register Now" id="register2-form-submit" onClick="RegisterNewUser()">
    `
}
function RegisterNewUser(){
const RegisterBtn=document.getElementById('register2-form-submit')

RegisterBtn.addEventListener("click", (e) => {
    e.preventDefault();
// async function RegisterNewUser(){
    // preventDefault();

    console.log('Button clicked')
    const name=loginForm.name.value
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    const userRegister={
        name:name,
        email:username,
        password:password
    }

    fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(userRegister)
})
   .then(response => response.json())
   .then(async(response) => {
     const token=await response.token
     const user=await response.user.name   //todo:remove password from here
     console.log(`response ${response}`)
    console.log(`token recieved: ${token} and user ${user}`)
    
    if(token)
    {
        
loginErrorMsg.innerHTML='<p id="login-msg">Registration Successful</p>'
        loginErrorMsg.style.opacity = 1
        loginErrorMsg.style.color= '#008a0e';
        loginErrorMsg.style.border= '1px solid #008a0e';
        loginErrorMsg.style.backgroundColor='#8fe5b0';
    }

    // store JWT in session storage
sessionStorage.setItem('JWT', token);
sessionStorage.setItem('Name',user);



    setTimeout(function() {
      //your code to be executed after 1 second
      window.location = "/homepage.html";
    }, delayInMilliseconds);
    })
    
    
})
.catch((err)=>{
    loginErrorMsg.innerHTML="User Email Exists"
    loginErrorMsg.style.opacity = 1;
})

}
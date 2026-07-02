const form =
document.getElementById(
"loginForm"
);

form.addEventListener(
"submit",
function(e){

e.preventDefault();

const username =
document.getElementById(
"username"
).value;

const password =
document.getElementById(
"password"
).value;

if(
username === "suci" &&
password === "090225"
){

localStorage.setItem(
"isLogin",
"true"
);

window.location.href =
"cms.html";

}else{

alert(
"Username atau password salah!"
);

}

}
);
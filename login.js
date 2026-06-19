// Dummy akun
const dummyUser = {
  username: "admin",
  password: "12345"
};

// simpan user
localStorage.setItem("user", JSON.stringify(dummyUser));

const form = document.getElementById("loginForm");

form.addEventListener("submit", function(e){

  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = JSON.parse(localStorage.getItem("user"));

  if(
    username === user.username &&
    password === user.password
  ){

    localStorage.setItem("isLogin", "true");

    // pindah ke CMS
    window.location.href = "cms.html";

  } else {

    document.getElementById("error").innerText =
      "Username atau password salah!";

  }

});
function showLogin() {
  document.getElementById("login").classList.remove("hidden");
  document.getElementById("register").classList.add("hidden");
}

function showRegister() {
  document.getElementById("register").classList.remove("hidden");
  document.getElementById("login").classList.add("hidden");
}

function register() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  let email = document.getElementById("registerEmail").value;
  let pass = document.getElementById("registerPassword").value;
  //NUEVO!!
  let name = document.getElementById("registerName").value;
  let surname = document.getElementById("registerSurname").value;

  var urlencoded = new URLSearchParams();
  urlencoded.append("username", email);
  urlencoded.append("email", email);
  urlencoded.append("password", pass);
  //NUEVO!!
  urlencoded.append("name", name);
  urlencoded.append("surname", surname);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch("http://localhost:1337/api/auth/local/register", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      access(result);
    })
    .catch((error) => console.log("error", error));
}

function login() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  let email = document.getElementById("loginEmail").value;
  let pass = document.getElementById("loginPassword").value;

  var urlencoded = new URLSearchParams();
  urlencoded.append("identifier", email);
  urlencoded.append("password", pass);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch("http://localhost:1337/api/auth/local", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      access(result);
    })
    .catch((error) => console.log("error", error));
}

function access(result) {
  if (result.jwt) {
    localStorage.setItem("token", result.jwt);
    localStorage.setItem("id", result.user.id);
    window.location = "http://127.0.0.1:5500/profile.html";
  } else {
    alert("Error en el acceso");
  }
}

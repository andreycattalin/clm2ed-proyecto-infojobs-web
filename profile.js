// detectar si el usuairio esta logueado, si no esta ECHARLEEEE!!!
function checkToken() {
  let token = localStorage.getItem("token");
  if (!token) {
    window.location = "http://127.0.0.1:5500/access.html";
  }
}

checkToken();

function loadUser() {
  let token = localStorage.getItem("token");

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("http://localhost:1337/api/users/me?populate=*", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      document.getElementById("bienvenido").innerHTML = "Hola " + result.name + " " + result.surname;

      console.log(result);

      result.jobsOwner.forEach((oferta) => {
        document.getElementById("ofertas").innerHTML += `<a href="detail.html?id=${oferta.id}" class="flex border bg-white rounded p-4 mt-4">

        <div class="ml-4">
            <p class="font-bold">${oferta.title}</p>
            <p class="text-slate-400">${oferta.city}</p>
        </div>
    </a>`;
      });
    })
    .catch((error) => console.log("error", error));
}

loadUser();

function logOut() {
  localStorage.clear();
  window.location = "http://127.0.0.1:5500/";
}

function loadApplicadas() {
  let token = localStorage.getItem("token");
  let idUser = localStorage.getItem("id");

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`http://localhost:1337/api/jobs?filters[$and][0][applicants][id][$eq]=${idUser}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      result.data.forEach((oferta) => {
        document.getElementById("ofertas-aplicadas").innerHTML += `<a href="detail.html?id=${oferta.id}" class="flex border bg-white rounded p-4 mt-4">

        <div class="ml-4">
            <p class="font-bold">${oferta.attributes.title}</p>
            <p class="text-slate-400">${oferta.attributes.city}</p>
        </div>
    </a>`;
      });
    })
    .catch((error) => console.log("error", error));
}

loadApplicadas();

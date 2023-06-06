let titulo = document.getElementById("titulo");
let logo = document.getElementById("logo");
let descripcion = document.getElementById("descripcion");
let ciudad = document.getElementById("ciudad");
let localizacion = document.getElementById("localizacion");
let sueldo = document.getElementById("sueldo");

let inscritosActuales = [];
let token = localStorage.getItem("token");
let idUser = localStorage.getItem("id");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

function loadData() {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`http://localhost:1337/api/jobs/${id}?populate=*`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      let attr = result.data.attributes;
      const { title, description, location, salary, city } = attr;

      titulo.innerHTML = title;
      descripcion.innerHTML = description;
      ciudad.innerHTML = city;
      sueldo.innerHTML = salary;
      localizacion.innerHTML = location;

      let img = getSRC(result.data);

      if (img == null) {
        img = "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
      } else {
        img = "http://localhost:1337" + img;
      }

      logo.src = img;
      result.data.attributes.applicants.data.forEach((inscrito) => {
        inscritosActuales.push(inscrito.id);

        if (inscrito.id == idUser) {
          console.log("Estas!!");
          document.getElementById("boton").classList.add("hidden");
        }
      });
    })
    .catch((error) => console.log("error", error));
}

loadData();

function inscribir() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  inscritosActuales.push(parseInt(idUser));
  var raw = JSON.stringify({
    data: {
      applicants: inscritosActuales,
    },
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`http://localhost:1337/api/jobs/${id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      window.location.reload();
    })
    .catch((error) => console.log("error", error));
}

function getSRC(oferta) {
  let existAttributes = oferta.attributes.logo.data;

  if (existAttributes) {
    let img = oferta.attributes.logo.data.attributes.url;
    let formats = oferta.attributes.logo.data.attributes.formats;
    if (formats != null) {
      if (formats.small != null) {
        img = formats.small.url;
      }
    }

    return img;
  } else {
    return null;
  }
}

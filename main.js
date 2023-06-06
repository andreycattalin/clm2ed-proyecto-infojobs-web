function loadData() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("http://localhost:1337/api/jobs?populate=*", requestOptions)
    .then((response) => response.json()) // transforma los datos a JSON
    .then((result) => {
      document.getElementById("ofertas").innerHTML = "";

      result.data.forEach((oferta) => {
        let img = getSRC(oferta);

        if (img == null) {
          img = "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
        } else {
          img = "http://localhost:1337" + img;
        }

        document.getElementById("ofertas").innerHTML += `<a href="detail.html?id=${oferta.id}" class="flex bg-white rounded p-4 mt-4">
            <img src="${img}" alt="" class="rounded w-32 h-32 object-cover">

            <div class="ml-4">
                <p class="font-bold">${oferta.attributes.title}</p>
                <p class="text-slate-400">${oferta.attributes.city}</p>
            </div>
        </a>`;
      });
    })
    .catch((error) => console.log("error", error));
}

loadData();

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

function searchByCity() {
  let city = document.getElementById("search").value;
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`http://localhost:1337/api/jobs?populate=*&filters[city][$containsi]=${city}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      document.getElementById("ofertas").innerHTML = "";

      result.data.forEach((oferta) => {
        let img = getSRC(oferta);

        document.getElementById("ofertas").innerHTML += `<a href="detail.html?id=${oferta.id}" class="flex bg-white rounded p-4 mt-4">
            <img src="http://localhost:1337${img}" alt="" class="rounded w-32 h-32 object-cover">

            <div class="ml-4">
                <p class="font-bold">${oferta.attributes.title}</p>
                <p class="text-slate-400">${oferta.attributes.city}</p>
            </div>
        </a>`;
      });
    })
    .catch((error) => console.log("error", error));
}

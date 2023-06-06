// detectar si el usuairio esta logueado, si no esta ECHARLEEEE!!!
function checkToken() {
  let token = localStorage.getItem("token");
  if (!token) {
    window.location = "http://127.0.0.1:5500/access.html";
  }
}

checkToken();

function publicarOferta() {
  let token = localStorage.getItem("token");
  let id = localStorage.getItem("id");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  var raw = JSON.stringify({
    data: {
      title: document.getElementById("title").value,
      isActive: true,
      description: document.getElementById("desc").value,
      location: document.getElementById("location").value,
      salary: document.getElementById("salary").value,
      city: document.getElementById("city").value,
      author: id,
    },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:1337/api/jobs", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.data) {
        window.location = "http://127.0.0.1:5500/profile.html";
      } else {
        alert("Ha ocurrido un error");
      }
    })
    .catch((error) => console.log("error", error));
}

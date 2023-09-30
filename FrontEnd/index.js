let works = []; // Tableau pour stocker les données de la galerie
let currentCategory = "Tous"; // Catégorie actuellement sélectionnée

const allButton = document.getElementById("all");
const objetButton = document.querySelector(".btn.objet");
const appartementsButton = document.getElementById("Appartements");
const hrButton = document.getElementById("H&r");
const gallery = document.querySelector(".gallery");
const form = document.querySelector(".form-login");
const lemail = document.querySelector(".test");
const lpassword = document.querySelector("#login-password");
const submitBtn = document.querySelector(".submitbtn");
const modifierMod = document.querySelector(".modification");
const backMod = document.querySelector(".modal-back");
const xMark = document.querySelector(".fa-xmark");
const formModal = document.querySelector(".form-modal");
const imageModal = document.getElementById("file");
const titreModal = document.getElementById("title-modal");
const categorieModal = document.getElementById("categorie-modal");

async function fetcher() {
  await fetch(`http://localhost:5678/api/works`)
    .then((res) => res.json())
    .then((data) => (works = data));

  filterWorksByCategory(currentCategory);
}

function galeriesDisplay(filteredWorks) {
  gallery.innerHTML = filteredWorks
    .map(
      (work) =>
        `
        <figure>
          <img src=${work.imageUrl}>
          <figcaption>${work.title}</figcaption>
        </figure>
      `
    )
    .join("");
}

function filterWorksByCategory(category) {
  const filteredWorks =
    category === "Tous"
      ? works
      : works.filter((work) => work.category.name === category);
  console.log(filteredWorks);
  galeriesDisplay(filteredWorks);
  currentCategory = category; // Mettre à jour la catégorie actuelle
}

allButton.addEventListener("click", () => {
  filterWorksByCategory("Tous");
});

objetButton.addEventListener("click", () => {
  filterWorksByCategory("Objets");
});

appartementsButton.addEventListener("click", () => {
  filterWorksByCategory("Appartements");
});

hrButton.addEventListener("click", () => {
  filterWorksByCategory("Hotels & restaurants");
});

window.addEventListener("load", fetcher);

modifierMod.addEventListener("click", () => {
  document.getElementById("modal").style.display = "block";
});

backMod.addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

xMark.addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

/* modal */

formModal.addEventListener("submit", (event) => {
  event.preventDefault();

  // const data = {
  //   title: titreModal.value,
  //   image: imageModal.files[0].name,
  //   category: categorieModal.value,
  // };

  // console.log(data);

  // fetch("http://localhost:5678/api/works", {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     Authorization: `Bearer ${localStorage.getItem("token de connexion")}`,
  //     "Content-Type": "multipart/form-data",
  //   },
  //   body: JSON.stringify(data),
  // })
  //   .then((res) => {
  //     console.log(res);
  //     return res.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((error) => {
  //     console.error("Erreur lors de la requête:", error);
  //   });

  const file = imageModal.files[0];

  // Vérifiez si un fichier a été sélectionné
  if (file) {
    // Créez un objet FormData et ajoutez le fichier en tant que Blob
    const formData = new FormData();
    formData.append("image", file);

    // Les autres données du formulaire
    formData.append("title", `${titreModal.value}`);
    formData.append("category", `${categorieModal.value}`); // Remplacez 123 par la valeur de votre catégorie

    // Configuration de la requête
    const requestOptions = {
      method: "POST",
      body: formData,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token de connexion")}`,
      },
    };

    // Envoi de la requête à l'URL spécifiée
    fetch("http://localhost:5678/api/works", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Faites quelque chose avec la réponse JSON
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la requête:", error);
      });
  } else {
    console.error("Aucun fichier sélectionné.");
  }
});

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
const xMark = document.querySelectorAll(".fa-xmark");
const formModal = document.querySelector(".form-modal");
const imageModal = document.getElementById("file");
const titreModal = document.getElementById("title-modal");
const categorieModal = document.getElementById("categorie-modal");
const displayModal = document.querySelector(".display-works-modal");

async function fetcher() {
  await fetch(`http://localhost:5678/api/works`)
    .then((res) => res.json())
    .then((data) => (works = data));

  filterWorksByCategory(currentCategory);
  galeriesDisplayModal(works);
}

function galeriesDisplay(filteredWorks) {
  gallery.innerHTML = filteredWorks
    .map(
      (work) =>
        `
        <figure id=${work.id}>
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

xMark.forEach((mark) =>
  mark.addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
  })
);

/* modal */

/* navigation in the modal */

const modalAdding = document.querySelector(".modal-adding");
const modalDelete = document.querySelector(".modal-delete");
const addImages = document.querySelector(".add-images");
const arrowLeft = document.querySelector(".back-modal");

addImages.addEventListener("click", () => {
  modalAdding.style.display = "block";
  modalDelete.style.display = "none";
});

arrowLeft.addEventListener("click", () => {
  modalAdding.style.display = "none";
  modalDelete.style.display = "block";
});

/* adding images */

formModal.addEventListener("submit", (event) => {
  event.preventDefault();
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

/* DELETE SECTION */

function galeriesDisplayModal(worksModal) {
  displayModal.innerHTML = worksModal
    .map(
      (work) =>
        `
        <figure id=${work.id} class="works">
          <i class="fa-solid fa-trash-can"></i>
          <img src=${work.imageUrl}>
        </figure>
        `
    )
    .join("");

  const figures = document.querySelectorAll(".works");

  figures.forEach(function (figure) {
    figure.addEventListener("click", function (event) {
      // Obtenez l'ID de l'élément sur lequel le clic a eu lieu
      const elementId = event.currentTarget.id;

      // Faites quelque chose avec l'ID (par exemple, affichez-le dans la console)
      console.log("ID de l'élément cliqué :", elementId);
      const requestOptionsDelete = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token de connexion")}`,
        },
      };

      fetch(
        `http://localhost:5678/api/works/${elementId}`,
        requestOptionsDelete
      );
    });
  });
}

/* gestion login-side of the site */

const modifieBtn = document.querySelector(".modification");
const tri = document.querySelector(".tri");

const connected = localStorage.getItem("token de connexion") ? true : false;

if (connected) {
  modifieBtn.style.display = "flex";
  tri.style.display = "none";
}

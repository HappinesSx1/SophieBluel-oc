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

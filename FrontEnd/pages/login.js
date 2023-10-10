const form = document.querySelector(".form-login");
const lemail = document.querySelector("#login-email");
const lpassword = document.querySelector("#login-password");
const submitBtn = document.querySelector(".submitbtn");
const spanBadPassword = document.querySelector(".bad-login");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(lemail.value)) {
    alert("Adresse email invalide");
    return false;
  }
  if (lpassword.value.length < 6) {
    alert("Le mot de passe doit contenir au moins 6 caractères");
    return false;
  }

  const data = {
    email: lemail.value,
    password: lpassword.value,
  };

  await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error("mauvais mdp!");
      }
    })
    .then((data) => {
      localStorage.setItem("token de connexion", data.token);
      document.location.href = "../index.html";
    })
    .catch((error) => {
      console.log(error);
      spanBadPassword.style.display = "block";
    });
});

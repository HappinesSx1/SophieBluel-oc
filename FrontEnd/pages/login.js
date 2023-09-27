const form = document.querySelector(".form-login");
const lemail = document.querySelector("#login-email");
const lpassword = document.querySelector("#login-password");
const submitBtn = document.querySelector(".submitbtn");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

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
      const statusCode = res.status;
      console.log(statusCode);

      if (statusCode >= 200 && statusCode <= 299) {
        return res.json();
      } else {
        console.log("mauvais mdp");
      }
    })
    .then((data) => (response = data));

  localStorage.setItem("token de connexion", response.token);
  // document.location.href = "http://127.0.0.1:5500/FrontEnd/index.html";
});

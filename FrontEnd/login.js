function connexionForm() {
  const form = document.querySelector("form");
  let errorMessage = document.querySelector("form > span");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let user = {
      email: event.target.querySelector("[name=email]").value,
      password: event.target.querySelector("[name=password]").value,
    };

    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.token) {
          sessionStorage.setItem("token", response.token);
          document.location.href = "index.html";
          sessionStorage.token = response.token;
        } else {
          errorMessage.innerHTML +=
            "L'email et le mot de passe ne correspondent pas";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

connexionForm();

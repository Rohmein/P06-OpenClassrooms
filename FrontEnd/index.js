// Envoi d'une requête à l'API pour récupérer (GET) les ressources du site
const listeProjet = await fetch("http://localhost:5678/api/works");
const projets = await listeProjet.json();

// Création d'une fonction qui va permettre d'afficher les projets sur le site
function genererProjets(projets) {
  for (let i = 0; i < projets.length; i++) {
    const article = projets[i];

    const projetElements = document.querySelector(".gallery");

    const projetElement = document.createElement("figure");

    const photoElement = document.createElement("img");
    photoElement.src = article.imageUrl;

    const nomElement = document.createElement("figcaption");
    nomElement.innerText = article.title;

    projetElements.appendChild(projetElement);

    projetElement.appendChild(photoElement);
    projetElement.appendChild(nomElement);
  }
}

// Appel de la fonction qui affiche les projets sur le site
genererProjets(projets);

// Création de l'écouteur d'évènement qui supprime la classe 'active' des filtres
const filtres = document.querySelector("#filters");

const buttons = filtres.getElementsByClassName("btn-filter");

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", () => {
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace("active", "");
  });
}

// Création des écouteurs d'évènement qui affichent les projets selon les filtres choisis
const filtreTous = document.querySelector(".tous");

filtreTous.addEventListener("click", function () {
  const tousFiltre = projets.filter(function (projet) {
    filtreTous.classList.add("active");
    return projet.categoryId;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererProjets(tousFiltre);
});

const filtreObjets = document.querySelector(".objets");

filtreObjets.addEventListener("click", function () {
  const objetsFiltre = projets.filter(function (projet) {
    filtreObjets.classList.add("active");
    return projet.categoryId === 1;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererProjets(objetsFiltre);
});

const filtreAppartements = document.querySelector(".appartements");

filtreAppartements.addEventListener("click", function () {
  const appartementsFiltre = projets.filter(function (projet) {
    filtreAppartements.classList.add("active");
    return projet.categoryId === 2;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererProjets(appartementsFiltre);
});

const filtreHotels = document.querySelector(".hotels");

filtreHotels.addEventListener("click", function () {
  const hotelsFiltre = projets.filter(function (projet) {
    filtreHotels.classList.add("active");
    return projet.categoryId === 3;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererProjets(hotelsFiltre);
});

// Gestion de la page d'accueil si le token est récupéré

console.log(sessionStorage.token);

const hiddenElements = document.querySelectorAll(".edition__visibility");

if (!sessionStorage.token) {
  hiddenElements.forEach((elements) =>
    elements.classList.add("edition__visibility")
  );
  logout.style.display = "none";
} else {
  hiddenElements.forEach((elements) =>
    elements.classList.remove("edition__visibility")
  );
  login.style.display = "none";
  filters.style.display = "none";
}

logout.addEventListener("click", () => {
  document.location.href = "http://127.0.0.1:5501/FrontEnd/login.html";
  sessionStorage.removeItem("token");
});

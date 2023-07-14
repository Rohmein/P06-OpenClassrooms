let projets = [];
let projectIdDeleted = [];

// Création d'une fonction qui va permettre d'afficher les projets sur le site
function genererProjets(projets) {
  const projetElements = document.querySelector(".gallery");
  projetElements.innerHTML = "";

  for (let i = 0; i < projets.length; i++) {
    const article = projets[i];

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

// Appel de la fonction qui affiche les projets sur le site
document.addEventListener("DOMContentLoaded", async function () {
  const reponse = await fetch("http://localhost:5678/api/works/");
  projets = await reponse.json();

  genererProjets(projets);
  modalProjets(projets);
});

// Création de l'écouteur d'évènement qui supprime la classe 'active' des filtres

const buttons = document.getElementsByClassName("btn-filter");

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
  hiddenElements.forEach((element) =>
    element.classList.add("edition__visibility")
  );
  logout.style.display = "none";
} else {
  hiddenElements.forEach((element) =>
    element.classList.remove("edition__visibility")
  );
  login.style.display = "none";
  filters.style.display = "none";
}

logout.addEventListener("click", () => {
  document.location.href = "http://127.0.0.1:5501/FrontEnd/login.html";
  sessionStorage.removeItem("token");
});

// Gestion de l'ouverture et de la fermeture de la modale

function switchModal() {
  const modalContainer = document.querySelector(".modal-container");
  const modalTriggers = document.querySelectorAll(".modal-trigger");

  const modalContainer2 = document.querySelector(".modal-container2");
  const modalTriggers2 = document.querySelectorAll(".modal-trigger2");
  const addPicture = document.getElementById("add-picture-btn");
  const modalArrow = document.querySelector(".modal-arrow");
  const confirmButton = document.getElementById("formulaire_confirm");

  function toggleModal() {
    modalContainer.classList.toggle("active");
  }

  modalTriggers.forEach((trigger) =>
    trigger.addEventListener("click", toggleModal)
  );

  function toggleModal2() {
    modalContainer2.classList.toggle("active");
  }

  modalTriggers2.forEach((trigger) =>
    trigger.addEventListener("click", toggleModal2)
  );

  function nextModal() {
    modalContainer.classList.toggle("active");
    modalContainer2.classList.toggle("active");
  }

  addPicture.addEventListener("click", nextModal);

  function previousModal() {
    modalContainer2.classList.toggle("active");
    modalContainer.classList.toggle("active");
  }

  modalArrow.addEventListener("click", previousModal);
  confirmButton.addEventListener("click", previousModal);
}

switchModal();

// Intégration des photos à la modale

function modalProjets(projets) {
  const picturesContainer = document.querySelector(".modal-pictures");
  picturesContainer.innerHTML = "";

  for (let i = 0; i < projets.length; i++) {
    const article = projets[i];

    const pictures = document.createElement("figure");
    pictures.classList.add("gallery-picture");

    const pictureElement = document.createElement("img");
    pictureElement.src = article.imageUrl;

    const editionText = document.createElement("figcaption");
    editionText.textContent = "éditer";
    editionText.classList.add("modal-edition-btn");

    const deleteButtons = document.createElement("div");
    deleteButtons.innerHTML = `<i class="fa-solid fa-trash-can fa-sm"></i>`;
    deleteButtons.classList.add("modal-delete-picture");

    const hoverButtons = document.createElement("div");
    hoverButtons.innerHTML = `<i class="fa-solid fa-arrows-up-down-left-right"></i>`;
    hoverButtons.classList.add("modal-arrow-picture");

    picturesContainer.appendChild(pictures);

    pictures.appendChild(pictureElement);
    pictures.appendChild(editionText);
    pictures.appendChild(deleteButtons);
    pictures.appendChild(hoverButtons);

    // Suppression de projets

    deleteButtons.addEventListener("click", async (event) => {
      event.preventDefault;

      const projectId = article.id;

      const projectDeleted = await fetch(
        `http://localhost:5678/api/works/${projectId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${sessionStorage.token}` },
        }
      );
      projets = projets.filter((projet) => {
        return projet.id != projectId;
      });
      modalProjets(projets);
      genererProjets(projets);
      projectIdDeleted = [...projectIdDeleted, projectId];
    });
  }
}

// Ajout de la preview d'une image à envoyer via le formulaire

const inputLoad = document.getElementById("image");
const confirmButton = document.getElementById("formulaire_confirm");

function showPreview(event) {
  let output = document.querySelector(".image");
  let icon = document.querySelector(".image_icon");
  let src = URL.createObjectURL(event.target.files[0]);
  let preview = document.getElementById("image_preview");
  if (event.target.files.length > 0) {
    preview.src = src;
    preview.style.display = "block";
    output.style.display = "none";
    icon.style.display = "none";
    confirmButton.style.background = "#1D6154";
    confirmButton.disabled = false;
  } else {
    //confirmButton.style.background = "#A7A7A7";
    confirmButton.disabled = true;
    preview.style.display = "none";
    output.style.display = "block";
    icon.style.display = "block";
  }
}

inputLoad.addEventListener("click", (event) => {
  inputLoad.value = null;
  confirmButton.disabled = true;
});
inputLoad.addEventListener("change", showPreview);

// Envoi des projets sur le serveur

function sendProject() {
  const selectedPicture = document.getElementById("image");
  const selectedTitle = document.getElementById("title").value;
  const selectedCategory = parseInt(document.getElementById("category").value);
  const confirmButton = document.getElementById("formulaire_confirm");

  if (selectedPicture.files[0] && selectedTitle.length > 0) {
    confirmButton.setAttribute("disabled", false);
    const formData = new FormData();
    formData.append("image", selectedPicture.files[0]);
    formData.append("title", selectedTitle);
    formData.append("category", selectedCategory);

    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: { Authorization: `Bearer ${sessionStorage.token}` },
      body: formData,
    })
      .then((response) => response.json())
      .then((projet) => {
        projets = [...projets, projet];
        if (projectIdDeleted.length) {
          projets = projets.filter(
            (projet) => !projectIdDeleted.includes(projet.id)
          );
        }

        modalProjets(projets);
        genererProjets(projets);
        resetForm();
        //confirmButton.disabled = true;
      })
      .catch((error) => console.log(error));
  } else {
    confirmButton.setAttribute("disabled", true);
    return;
  }
}

const sendForm = document.getElementById("formulaire");
confirmButton.addEventListener("click", (event) => {
  event.preventDefault();
  sendProject();
});

function resetForm() {
  let preview = document.getElementById("image_preview");
  let output = document.querySelector(".image");
  let icon = document.querySelector(".image_icon");
  let title = document.getElementById("title");
  let category = document.getElementById("category");
  title.value = "";
  category.value = "1";
  preview.style.display = "none";
  output.style.display = "block";
  icon.style.display = "block";
  const confirmButton = document.getElementById("formulaire_confirm");
  confirmButton.disabled = true;
  confirmButton.style.background = "#a7a7a7";
}

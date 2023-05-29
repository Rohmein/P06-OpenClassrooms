// Envoi d'une requête à l'API pour récupérer (GET) les ressources du site
const reponse = await fetch('http://localhost:5678/api/works');
const projets = await reponse.json();

// Création d'une fonction qui va permettre d'afficher les projets sur le site
function genererProjets() {
    // Création d'une boucle "for" pour parcourir la liste des projets et les intégrer au site
    for (let i = 0; i < projets.length; i++) {

        const article = projets[i];

        const projetElements = document.querySelector('.gallery');
        
        const projetElement = document.createElement('figure');

        const photoElement = document.createElement('img');
        photoElement.src = article.imageUrl;

        const nomElement = document.createElement('figcaption');
        nomElement.innerText = article.title;

        projetElements.appendChild(projetElement);

        projetElement.appendChild(photoElement);
        projetElement.appendChild(nomElement);
    }
}

genererProjets();



fetch("http://localhost:5678/api/works")
.then(reponse => reponse.json())
.then(data => {
    const galleryElement = document.querySelector(".gallery");
     data.forEach(work => {
        let figureElement = document.createElement("figure");
        let imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        let figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerHTML = work.title;
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
        galleryElement.appendChild(figureElement);
    });
})

fetch("http://localhost:5678/api/categories")
.then(reponse3 => reponse3.json())
.then(reponse4 => console.table(reponse4))

// const createFigure = (projet) => {
//     let figureElement = document.createElement("figure");
//     let imageElement = document.createElement("img");
//     imageElement.src = "./assets/images/";
//     let figcaptionElement = document.createElement("figcaption");
//     figcaptionElement.innerHTML = projet.texte;
// };





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
    })
});

fetch("http://localhost:5678/api/categories")
.then(reponse => reponse.json())
.then(data => {
    const categoryElement = document.querySelector(".filtre");
    data.forEach(category => {
        let buttonElement = document.createElement("button");
        let pElement = document.createElement("p");
        
        categoryElement.appendChild(buttonElement);
        pElement.innerHTML = category.name;
        buttonElement.appendChild(pElement);
    })
});
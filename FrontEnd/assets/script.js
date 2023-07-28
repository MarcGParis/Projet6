fetch("http://localhost:5678/api/works")
.then(reponse => reponse.json())
.then(data => {
    const galleryElement = document.querySelector(".gallery");
    data.forEach(work => {
        let figcaptionElement = document.createElement("figcaption");
        let figureElement = document.createElement("figure");
        let imageElement = document.createElement("img");

        imageElement.src = work.imageUrl;
        figcaptionElement.innerHTML = work.title;
        figureElement.dataset.categoryId = work.categoryId;
        figureElement.classList.add("work");

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

        buttonElement.addEventListener("click", function() {
            console.log(category.id);
            let works = document.getElementsByClassName("work");
            Array.from(works).forEach(work =>{
                if (category.id != work.dataset.categoryId) {
                    work.style.display="none";
                }else{
                    work.style.display="block";
                }
            })
        })
    })
});

window.addEventListener("load", function(){
    let tousElement = document.querySelector(".tousElement");
    console.log(tousElement);
    tousElement.addEventListener("click", function(){
        let works = document.getElementsByClassName("work");
        Array.from(works).forEach(work =>{
            work.style.display="block";
        })
    })
})
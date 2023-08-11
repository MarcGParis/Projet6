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
        
        pElement.innerHTML = category.name;

        categoryElement.appendChild(buttonElement);
        buttonElement.appendChild(pElement);

        buttonElement.addEventListener("click", function() {
            // console.log(category.id);
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
    // console.log(tousElement);
    tousElement.addEventListener("click", function(){
        let works = document.getElementsByClassName("work");
        Array.from(works).forEach(work =>{
            work.style.display="block";
        })
    })
})

//Modale
//Permet de savoir quelle boite modale est ouverte
let modal = null

const openModal = function(e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href="#modale1"'))
    //affichage de la boite modale
    modal.style.display = null
    modal.removeAttribute('aria-hidden', 'false')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModale)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModale)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation) 
}

//Fermeture de la modale
const closeModale = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    target.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModale).removeEventListener('click', closeModale)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModale)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation) 
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation
}

document.querySelectorAll(".js-modal").forEach(a =>{
    a.addEventListener('click', openModal)
})

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModale(e)
    }
})
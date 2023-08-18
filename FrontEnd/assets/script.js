fetch("http://localhost:5678/api/works")
  .then((reponse) => reponse.json())
  .then((data) => {
    const galleryElement = document.querySelector(".gallery");
    data.forEach((work) => {
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
    });
  });

fetch("http://localhost:5678/api/categories")
  .then((reponse) => reponse.json())
  .then((data) => {
    const categoryElement = document.querySelector(".filtre");
    data.forEach((category) => {
      let buttonElement = document.createElement("button");
      let pElement = document.createElement("p");

      pElement.innerHTML = category.name;

      categoryElement.appendChild(buttonElement);
      buttonElement.appendChild(pElement);

      buttonElement.addEventListener("click", function () {
        // console.log(category.id);
        let works = document.getElementsByClassName("work");
        Array.from(works).forEach((work) => {
          if (category.id != work.dataset.categoryId) {
            work.style.display = "none";
          } else {
            work.style.display = "block";
          }
        });
      });
    });
  });

window.addEventListener("load", function () {
  let tousElement = document.querySelector(".tousElement");
  isAuthenticated();
  toggleModal();
  // console.log(tousElement);
  tousElement.addEventListener("click", function () {
    let works = document.getElementsByClassName("work");
    Array.from(works).forEach((work) => {
      work.style.display = "block";
    });
  });
});

function isAuthenticated() {
  let token = sessionStorage.getItem("token");
  if (token) {
    let login = document.getElementById("login");
    login.innerHTML = "logout";
    login.addEventListener("click", () => {
      sessionStorage.removeItem("token");
      location.reload();
    });
    document.getElementsByClassName("filtre")[0].style.display="none";

  }
}

//Modale

const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", toggleModal)
);

function toggleModal() {
   const modalContainer = document.querySelector(".modal");
   const modalBtn = document.querySelector(".modal-toggle");
   modalBtn.addEventListener("click",() =>{
    modalContainer.classList.toggle("active");
   })
  console.log(modalBtn);
}
// let modal = null //Permet de savoir quelle boite modale est ouverte

// //Ouverture de la modale
// const openModal = function (e) {
//     e.preventDefault()
//     const target = document.querySelector(e.target.getAttribute('href'))
//     modal.style.display = null
//     modal.removeAttribute('aria-hidden')
//     modal.setAttribute('aria-modal', 'true')
//     modal.addEventListener('click', closeModal)
//     modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
//     modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
// }

// //Fermetire de la modale
// const closeModal = function (e) {
//     if (modal === null) return
//     e.preventDefault()
//     modal.style.display = "none"
//     modal.setAttribute('aria-hidden', 'true')
//     modal.removeAttribute('aria-modal')
//     modal.removeEventListener('click', closeModal)
//     modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
//     modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
//     modal = null
// }
// document.querySelectorAll('.js-modal').forEach(a => {
//     a.addEventListener('click', openModal)
// })

// const stopPropagation = function (e) {
//     e.stopPropagation
// }

// window.addEventListener('keydown', function (e) {
//     if (e.key === "Escape" || e.key === "Esc") {
//         closeModal(e)
//     }
// })

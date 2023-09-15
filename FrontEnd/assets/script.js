fetch("http://localhost:5678/api/works")
  .then((reponse) => reponse.json())
  .then((data) => {
    const galleryElement = document.querySelector(".gallery");
    data.forEach((work) => {
      displayWorks(work);
      let figcaptionElement = document.createElement("figcaption");
      let figureElement = document.createElement("figure");
      let imageElement = document.createElement("img");

      imageElement.src = work.imageUrl;
      figcaptionElement.innerHTML = work.title;
      figureElement.dataset.categoryId = work.categoryId;
      figureElement.classList.add("work");
      figureElement.dataset.galleryWorkId = work.id;

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
    blackHeader();
  }
}


function blackHeader() {
  const editionHeader = document.querySelector(".editionHeader");
  editionHeader.style.display = "flex";
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
}
window.addEventListener("load", function () {
const modalClose = document.querySelector(".close-modal");
const modalAddImage = document.querySelector(".add");
const arrowLeft = document.querySelector(".arrow-left");
const modalWrapper = document.querySelector(".modal-wrapper");
  const modal2 = document.querySelector(".modal2");
arrowLeft.addEventListener("click",() => {
  modalWrapper.style.display = "block";
  modal2.style.display = "none";
})
modalClose.addEventListener("click",() =>{
  const modalContainer = document.querySelector(".modal")
  modalContainer.classList.toggle("active");
})
modalAddImage.addEventListener("click",() =>{
  modalWrapper.style.display = "none";
  modal2.style.display = "block";
})
})

function displayWorks(work) {
  const galleryModal = document.querySelector(".galleryModal")
  let figureModal = document.createElement("figure");
  let imageModal = document.createElement("img");
  imageModal.src = work.imageUrl;
  let trashIcone = document.createElement("i");
  trashIcone.classList = "fa-solid fa-trash-can";
  let edit = document.createElement("p");
  edit.innerText = "éditer";
  figureModal.appendChild(imageModal);
  figureModal.appendChild(trashIcone);
  figureModal.appendChild(edit);
  galleryModal.appendChild(figureModal);
  imageModal.dataset.workId = work.id;
  trashIcone.addEventListener("click", function(e) {
    e.preventDefault();
    deleteWork(e.target.previousElementSibling.dataset.workId);
  }) 
}

function deleteWork(workId) {
  let token = sessionStorage.getItem("token");
  fetch(`http://localhost:5678/api/works/${workId}`, {
    method: "DELETE",
    headers: {Authorization: `Bearer ${token}`}
  })
  .then(reponse => {
    if (!reponse.ok) {
      throw new Error(reponse.statusText)
    }
  })
  .then(() => {
    const galleryModal = document.querySelector(".galleryModal");
    const deleteImageModal = document.querySelector(`[data-work-id="${workId}"]`);
    const deleteFigure = document.querySelector(`[data-gallery-work-id="${workId}"]`);
    console.log(deleteFigure.parentNode);
    deleteImageModal.parentNode.remove();
    deleteFigure.remove();
  })
  .catch (erreur => {
    console.error(erreur.message);
  })
}
window.addEventListener("load", function() {
  const fileImput = document.querySelector("#file");
  fileImput.addEventListener("change", function(event) {
    console.log(event);
  })
})

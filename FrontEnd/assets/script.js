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

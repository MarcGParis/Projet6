fetch("http://localhost:5678/api/works")
  .then((reponse) => reponse.json())
  .then((data) => {
    const galleryModal = document.querySelector(".galleryModal");
    const galleryElement = document.querySelector(".gallery");
    data.forEach((work) => {
      displayWorks(work, true, galleryModal);
      displayWorks(work, false, galleryElement);
    });
  });

fetch("http://localhost:5678/api/categories")
  .then((reponse) => reponse.json())
  .then((data) => {
    const categoryElement = document.querySelector(".filtre");
    data.forEach((category) => {
      let buttonElement = document.createElement("button");

      buttonElement.innerHTML = category.name;

      categoryElement.appendChild(buttonElement);

      buttonElement.addEventListener("click", function () {
        const buttonElementVert =
          categoryElement.getElementsByTagName("button");
        Array.from(buttonElementVert).forEach((button) => {
          button.classList.remove("btnactive");
        });

        buttonElement.classList.toggle("btnactive");
        let works = document.getElementsByClassName("work");
        Array.from(works).forEach((work) => {
          if (category.id != work.dataset.categoryId) {
            work.style.display = "none";
          } else {
            work.style.display = "block";
          }
        });
      });
      const buttonTous = document.querySelector(".tousElement");
      buttonTous.addEventListener("click", function () {
        const buttonElementVert =
          categoryElement.getElementsByTagName("button");
        Array.from(buttonElementVert).forEach((button) => {
          button.classList.remove("btnactive");
        });
        buttonTous.classList.toggle("btnactive");
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
    document.getElementsByClassName("filtre")[0].style.display = "none";
    blackHeader();
    modifier();
  }
}

function modifier() {
  const modifierButton = document.querySelector(".modal-toggle");
  modifierButton.style.display = "flex";
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
  modalBtn.addEventListener("click", () => {
    modalContainer.classList.toggle("active");
  });
}
window.addEventListener("load", function () {
  const modalClose = document.querySelector(".close-modal");
  const modalAddImage = document.querySelector(".add");
  const arrowLeft = document.querySelector(".arrow-left");
  const modalWrapper = document.querySelector(".modal-wrapper");
  const modal2 = document.querySelector(".modal2");

  arrowLeft.addEventListener("click", () => {
    displayModalWrapper();
  });
  modalClose.addEventListener("click", () => {
    const modalContainer = document.querySelector(".modal");
    modalContainer.classList.toggle("active");
  });

  modalAddImage.addEventListener("click", () => {
    modalWrapper.style.display = "none";
    modal2.style.display = "block";
  });
});

function displayWorks(work, isModalGallery, galleryElement) {
  let figureElement = document.createElement("figure");
  let imageElement = document.createElement("img");
  imageElement.src = work.imageUrl;
  figureElement.appendChild(imageElement);
  if (isModalGallery === true) {
    let trashIcone = document.createElement("i");
    trashIcone.classList = "fa-solid fa-trash-can";
    let edit = document.createElement("p");
    edit.innerText = "éditer";
    figureElement.appendChild(trashIcone);
    figureElement.appendChild(edit);
    imageElement.dataset.workId = work.id;

    trashIcone.addEventListener("click", function (e) {
      e.preventDefault();
      deleteWork(e.target.previousElementSibling.dataset.workId);
    });
  } else {
    let figcaptionElement = document.createElement("figcaption");
    figureElement.appendChild(figcaptionElement);
    figcaptionElement.innerHTML = work.title;
    figureElement.dataset.categoryId = work.categoryId;
    figureElement.classList.add("work");
    figureElement.dataset.galleryWorkId = work.id;
  }
  galleryElement.appendChild(figureElement);
 
}

function deleteWork(workId) {
  let token = sessionStorage.getItem("token");
  fetch(`http://localhost:5678/api/works/${workId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((reponse) => {
      if (!reponse.ok) {
        throw new Error(reponse.statusText);
      }
    })
    .then(() => {
      const galleryModal = document.querySelector(".galleryModal");
      const deleteImageModal = document.querySelector(
        `[data-work-id="${workId}"]`
      );
      const deleteFigure = document.querySelector(
        `[data-gallery-work-id="${workId}"]`
      );
      deleteImageModal.parentNode.remove();
      deleteFigure.remove();
    })
    .catch((erreur) => {
      console.error(erreur.message);
    });
}

window.addEventListener("load", function () {
  const fileInput = document.querySelector("#file");
  fileInput.addEventListener("change", function (event) {
    const previewURL = URL.createObjectURL(fileInput.files[0]);
    const previewImage = document.querySelector(".previewImage");
    const addPhoto = document.querySelector(".add-photo");
    const photoAdded = document.querySelector(".previewImage");
    previewImage.src = previewURL;
    addPhoto.style.display = "none";
    photoAdded.style.display = "flex";
    console.log(previewImage);
  });
});

fetch("http://localhost:5678/api/categories")
  .then((reponse) => reponse.json())
  .then((data) => {
    const categoryModal = document.querySelector(".category-modal2");
    data.forEach((option) => {
      let newOption = document.createElement("option");
      newOption.value = option.id;
      newOption.innerText = option.name;
      categoryModal.append(newOption);
    });
  });

window.addEventListener("load", function () {
  const valider = document.querySelector(".valider");
  valider.addEventListener("click", function () {
    const formData = new FormData();
    const photoAdd = document.getElementById("file");
    const textAdd = document.querySelector(".title-modal2");
    const categoryAdd = document.querySelector(".category-modal2");
    formData.append("image", photoAdd.files[0]);
    formData.append("title", textAdd.value);
    formData.append("category", categoryAdd.value);
    let token = sessionStorage.getItem("token");
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then((reponse) => {
        console.log(reponse.ok);
        displayModalWrapper();
        const galleryModal = document.querySelector(".galleryModal");
        let figureModal = document.createElement("figure");
        let imageModal = document.createElement("img");
        let trashIcone = document.createElement("i");
        trashIcone.classList = "fa-solid fa-trash-can";
        let edit = document.createElement("p");
        edit.innerText = "éditer";
        imageModal.src = URL.createObjectURL(photoAdd.files[0]);
        console.log(URL.createObjectURL(photoAdd.files[0]));
        figureModal.appendChild(imageModal);
        galleryModal.appendChild(figureModal);
        figureModal.appendChild(trashIcone);
        figureModal.appendChild(edit);
        let image = document.createElement("img");
        let figcaptionElement = document.createElement("figcaption");
        let figureElement = document.createElement("figure");
        const galleryElement = document.querySelector(".gallery");
        image.src = URL.createObjectURL(photoAdd.files[0]);
        figureElement.appendChild(image);
        figcaptionElement.innerHTML = textAdd.value;
        figureElement.appendChild(figcaptionElement);
        galleryElement.appendChild(figureElement);

        throw new Error("Ajoutez un titre et une catégorie");
      })
      .catch((erreur) => {
        console.log(erreur);
      });
  });
});

window.addEventListener("load", function () {
  const photoAdd = document.getElementById("file");
  const textAdd = document.querySelector(".title-modal2");
  const categoryAdd = document.querySelector(".category-modal2");
  photoAdd.addEventListener("change", function () {
    checkForm();
  });
  textAdd.addEventListener("change", function () {
    checkForm();
  });
  categoryAdd.addEventListener("change", function () {
    checkForm();
  });
});

function boutonGris() {
  const validerVert = document.querySelector(".valider");
  validerVert.classList.remove("validerVert");
}

function boutonVert() {
  const validerGris = document.querySelector(".valider");
  validerGris.classList.add("validerVert");
}

function checkForm() {
  const photoAdd = document.getElementById("file");
  const textAdd = document.querySelector(".title-modal2");
  const categoryAdd = document.querySelector(".category-modal2");

  if (
    photoAdd.files.length > 0 &&
    textAdd.value !== "" &&
    categoryAdd.value !== ""
  ) {
    boutonVert();
    document.querySelector(".valider").disabled = false;
  } else {
    boutonGris();
    document.querySelector(".valider").disabled = true;
  }
}

// Changement d'image au clic sur l'image modale 2
function viderForm() {
  const previewImage = document.querySelector(".previewImage");
  const addPhoto = document.querySelector(".add-photo");
  const titreImage = document.querySelector(".title-modal2");
  const categoryImage = document.querySelector(".category-modal2");
  previewImage.src = "";
  titreImage.value = "";
  categoryImage.value = "";
  addPhoto.style.display = "flex";
  previewImage.style.display = "none";
}

window.addEventListener("load", function () {
  const arrowLeft = document.querySelector(".arrow-left");
  arrowLeft.addEventListener("click", function () {
    viderForm();
  });
});

window.addEventListener("load", function () {
  const modal2Cross = document.getElementById("cross");
  modal2Cross.addEventListener("click", function () {
    viderForm();
  });
});

window.addEventListener("load", function () {
  const previewImage = document.querySelector(".previewImage");
  previewImage.addEventListener("click", function () {
    const addPhoto = document.querySelector(".add-photo");
    previewImage.style.display = "none";
    addPhoto.style.display = "flex";
  });
});

window.addEventListener("load", function () {
  const modal2Cross = document.getElementById("cross");
  modal2Cross.addEventListener("click", function () {
    const modal = document.querySelector(".modal");
    modal.classList.toggle("active");
    displayModalWrapper();
  });
});

function displayModalWrapper() {
  const modalWrapper = document.querySelector(".modal-wrapper");
  const modal2 = document.querySelector(".modal2");
  modalWrapper.style.display = "block";
  modal2.style.display = "none";
}

function worksAPI() {}

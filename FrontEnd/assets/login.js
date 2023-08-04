const formElement = document.getElementById("contact");

// Ajout d'un écouteur d'événement sur le formulaire pour écouter le submit
formElement.addEventListener("submit", (event) => {
    // évite le rechargement de la page
    event.preventDefault()
    const emailElement = document.getElementById("email").value;
    const passwordElement = document.getElementById("password").value;
    connect(emailElement, passwordElement);
});

function connect(email, password) {
    console.log(email);
    console.log(password);
    fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'email': email, 'password': password})
    });
};
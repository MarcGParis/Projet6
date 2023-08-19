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
    let myHeaders = {method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'email': email, 'password': password})};

    fetch('http://localhost:5678/api/users/login', myHeaders)
            .then(reponse => {
                if (reponse.ok) {
                    return reponse.json()
                } else {
                    throw new Error('Erreur dans l’identifiant ou le mot de passe');
                };})
            .then(data => {
                sessionStorage.setItem("token", data.token)
                window.location.href = "index.html" // renvoie à la page d'accueil
            })
            .catch(erreur => {
                document.getElementsByClassName("erreur")[0].innerHTML=erreur.message;
                document.getElementById("email").style.border="red 1px solid";
                document.getElementById("password").style.border="red 1px solid";   
            })            
    };
;


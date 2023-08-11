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
                    throw new Error("Mauvais e-mail");
                };})
            .then(data => {
                console.log(data);
                sessionStorage.setItem("token", data.token)
            })
            .catch(erreur => {
                console.log(erreur);
                
            })
            
    };
    
;




// localStorage.getItem( "userId": 1,
// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4")

// {
//     "userId": 1,
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MTM5NjkzNCwiZXhwIjoxNjkxNDgzMzM0fQ.JJ_FUcP1HgynMBbEgQ-BEl0J7dhE5hqiujK1Kv40ZfE"
// }
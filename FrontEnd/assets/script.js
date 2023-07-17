fetch("http://localhost:5678/api/works")
.then(reponse => reponse.json())
.then(reponse2 => console.table(reponse2))
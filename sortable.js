function api() {
    fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
        .then(response => response.json())
        .then(response => alert(JSON.stringify(response)))
        .catch(error => alert("Erreur : " + error))
}
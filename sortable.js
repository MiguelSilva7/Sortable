const loadData = heroes => {
    console.log(heroes)
  }
fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
    .then((response) => response.json()) // parse the response from JSON
   .then(loadData) // .then will call the `loadData` function with the JSON value.
 
    const myInput = document.querySelector("#myInput")
    btn.onclick = (e) => {
        e.preventDefault()
        fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
        .then((response) => response.json()) // parse the response from JSON
        .then (loadData => {
            const result = document.querySelector("#result")
            const input = document.querySelector("#champ").value
            const newFilter = loadData.filter(instant => instant.name.toLowerCase().includes(input.toLowerCase()))
            result.textContent = "";
            newFilter.map(element => {
                    console.log('test')
                    const tr = document.createElement("tr")  
                    const th = document.createElement("th")
                    tr.appendChild(th);
                    th.textContent = element.name;
                    result.append(tr)
                })
            })
    }
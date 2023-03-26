
function loadData2(heroes) {
    const heroArrays = Object.values(heroes);
  
    const heroimage = heroArrays.map((hero) => hero.images.xs);
    const heroname = heroArrays.map((hero) => hero.name);
    const herofullname = heroArrays.map((hero) => hero.biography.fullName);
    const heropowers = heroArrays.map((hero) => hero.powerstats);
    const herorace = heroArrays.map((hero) => hero.appearance.race);
    const herogender = heroArrays.map((hero) => hero.appearance.gender);
    const heroheight = heroArrays.map((hero) => hero.appearance.height);
    const heroweight = heroArrays.map((hero) => hero.appearance.weight);
    const herobirth = heroArrays.map((hero) => hero.biography.placeOfBirth);
    const heroalignement = heroArrays.map((hero) => hero.biography.alignment);
  
    let hero = [];
    let temp = [];
    
    for (let i = 0; i < heroname.length; i++) {
      temp.push(heroimage[i]); //0
      temp.push(heroname[i]); // 1
      temp.push(herofullname[i]); //2
      temp.push(heropowers[i]);
      temp.push(herorace[i]);
      temp.push(herogender[i]);
      temp.push(heroheight[i]);
      temp.push(heroweight[i]);
      temp.push(herobirth[i]);
      temp.push(heroalignement[i]);
      hero.push(temp);
  
      temp = [];
    }
    // console.log(hero[1][1]);
    return hero;
  }

const loadData = heroes => {
    console.log(heroes)
  }
fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
    .then((response) => response.json()) // parse the response from JSON
    // .then will call the `loadData` function with the JSON value.
    .then((loadData) => {
    hero = loadData2(loadData);

    console.log(hero);

    function newRow(hero) {
      let table = document.getElementById("table-sortable");
      
      for (let i = 0; i < hero.length; i++) {
        
        const row = table.insertRow();
        
        const iconCell = row.insertCell();
        let icon = document.createElement('img')
        icon.src = hero[i][0];
        iconCell.appendChild(icon);
        
        const nameCell = row.insertCell();
        nameCell.textContent = hero[i][1];
        
        const fullNameCell = row.insertCell();
        fullNameCell.textContent = hero[i][2];
        
        const powerstatCell = row.insertCell();
        powerstatCell.textContent = hero[i][3];
        
        const raceCell = row.insertCell();
        raceCell.textContent = hero[i][4];
        
        const genderCell = row.insertCell();
        genderCell.textContent = hero[i][5];
        
        const heightCell = row.insertCell();
        heightCell.textContent = hero[i][6][1];
        
        const weightCell = row.insertCell();
        weightCell.textContent = hero[i][7][1];
        
        const birthCell = row.insertCell();
        birthCell.textContent = hero[i][8];
        
        const alignementCell = row.insertCell();
        alignementCell.textContent = hero[i][9];
      }
    }
    newRow(hero); 
});

const myInput = document.querySelector("#myInput")

    btn.onclick = (e) => {
        e.preventDefault()
        fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
        .then((response) => response.json()) // parse the response from JSON
        .then (loadData => {
            const input = document.querySelector("#nomhero").value
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


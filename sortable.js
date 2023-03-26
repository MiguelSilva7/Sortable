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
   .then(loadData) // .then will call the `loadData` function with the JSON value.
 
    const myInput = document.querySelector("#myInput")
    btn.onclick = (e) => {
        e.preventDefault()
        fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
        .then((response) => response.json()) // parse the response from JSON
        .then (loadData => {
            const result = document.querySelector("#result")
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


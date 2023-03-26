// This function is called only after the data has been fetched, and parsed.
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
  return hero;
}

// Request the file with fetch, the data will downloaded to your browser cache.
fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
  .then((response) => response.json()) // parse the response from JSON
  .then((loadData) => {
    hero = loadData2(loadData);

    // console.log(hero);

    function newRow(hero) {
      let table = document.getElementById("table-sortable");

      for (let i = 0; i < hero.length; i++) {
        const row = table.insertRow();

        const iconCell = row.insertCell();
        let icon = document.createElement("img");
        icon.src = hero[i][0];
        iconCell.appendChild(icon);

        const nameCell = row.insertCell();
        nameCell.textContent = hero.sortByName(hero)[i][1];

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

function sortByName(hero) {
  heroname.sort((a, b) => a[1].localeCompare(b[1]));
}

function sortByFullName(hero) {
  herofullname.sort((a, b) => a[2].localeCompare(b[2]));
}

function sortByRace(hero) {
  herorace.sort((a, b) => a[4].localeCompare(b[4]));
}

function sortByGender(hero) {
  herogender.sort((a, b) => a[5].localeCompare(b[5]));
}

function sortByHeight(hero) {
  heroheight.sort((a, b) => {
    const aHeight = parseInt(a[6][1]);
    const bHeight = parseInt(b[6][1]);
    return aHeight - bHeight;
  });
}

function sortByWeight(hero) {
  heroweight.sort((a, b) => {
    const aWeight = parseInt(a[7][1]);
    const bWeight = parseInt(b[7][1]);
    return aWeight - bWeight;
  });
}

function sortByBirth(hero) {
  herobirth.sort((a, b) => a[8].localeCompare(b[8]));
}

function sortByAlignement(array) {
  let goodArray = [];
  let badArray = [];
  let sortArray = goodArray.concat(badArray);
  for (let i = 0; i < array.length; i++) {
    if (array[i] == "good") {
      goodArray.push(array[i]);
    } else {
      badArray.push(array[i]);
    }
  }
  return sortArray;
}

console.log(sortByAlignement(['good','bad','good','bad','good','good','bad','good','bad','bad','bad','bad','good','good',]));
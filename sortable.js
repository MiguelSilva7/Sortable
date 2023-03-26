
// function loadData2(heroes) {
//     const heroArrays = Object.values(heroes);
  
//     const heroimage = heroArrays.map((hero) => hero.images.xs);
//     const heroname = heroArrays.map((hero) => hero.name);
//     const herofullname = heroArrays.map((hero) => hero.biography.fullName);
//     const heropowers = heroArrays.map((hero) => hero.powerstats.intelligence);
//     const herorace = heroArrays.map((hero) => hero.appearance.race);
//     const herogender = heroArrays.map((hero) => hero.appearance.gender);
//     const heroheight = heroArrays.map((hero) => hero.appearance.height);
//     const heroweight = heroArrays.map((hero) => hero.appearance.weight);
//     const herobirth = heroArrays.map((hero) => hero.biography.placeOfBirth);
//     const heroalignement = heroArrays.map((hero) => hero.biography.alignment);
  
//     let hero = [];
//     let temp = [];
    
//     for (let i = 0; i < heroname.length; i++) {
//       temp.push(heroimage[i]); //0
//       temp.push(heroname[i]); // 1
//       temp.push(herofullname[i]); //2
//       temp.push(heropowers[i]);
//       temp.push(herorace[i]);
//       temp.push(herogender[i]);
//       temp.push(heroheight[i]);
//       temp.push(heroweight[i]);
//       temp.push(herobirth[i]);
//       temp.push(heroalignement[i]);
//       hero.push(temp);
  
//       temp = [];
//     }
//     // console.log(hero[1][1]);
//     return hero;
//   }

// const loadData = heroes => {
//     console.log(heroes)
//   }
// fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
//     .then((response) => response.json()) // parse the response from JSON
//     // .then will call the `loadData` function with the JSON value.
//     .then((loadData) => {
//     hero = loadData2(loadData);

//     console.log(hero);

//     function newRow(hero) {
//       let table = document.getElementById("table-sortable");
      
//       for (let i = 0; i < hero.length; i++) {
        
//         const row = table.insertRow();
        
//         const iconCell = row.insertCell();
//         let icon = document.createElement('img')
//         icon.src = hero[i][0];
//         iconCell.appendChild(icon);
        
//         const nameCell = row.insertCell();
//         nameCell.textContent = hero[i][1];
        
//         const fullNameCell = row.insertCell();
//         fullNameCell.textContent = hero[i][2];
        
//         const powerstatCell = row.insertCell();
//         powerstatCell.textContent = hero[i][3];
        
//         const raceCell = row.insertCell();
//         raceCell.textContent = hero[i][4];
        
//         const genderCell = row.insertCell();
//         genderCell.textContent = hero[i][5];
        
//         const heightCell = row.insertCell();
//         heightCell.textContent = hero[i][6][1];
        
//         const weightCell = row.insertCell();
//         weightCell.textContent = hero[i][7][1];
        
//         const birthCell = row.insertCell();
//         birthCell.textContent = hero[i][8];
        
//         const alignementCell = row.insertCell();
//         alignementCell.textContent = hero[i][9];
//       }
//     }
//     newRow(hero); 
// });

document.addEventListener("DOMContentLoaded", init, false);

let data, table, sortCol;
let sortAsc = false;
let pageSize = 20;
let curPage = 1;

async function init() {
  // Select the table (well, tbody)
  table = document.querySelector("#table-sortable tbody");
  // get the cats
  let resp = await fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json");
  data = await resp.json();
  renderTable();

  // listen for sort clicks
  document.querySelectorAll("#table-sortable thead tr th").forEach((t) => {
    t.addEventListener("click", sort, false);
  });

  // listen for page size select changes
  document.querySelector("#page-size-select").addEventListener("change", (event) => {
    pageSize = parseInt(event.target.value);
    curPage = 1;
    renderTable();
  });
}

document.querySelector("#nextButton").addEventListener("click", nextPage, false);
document.querySelector("#prevButton").addEventListener("click", previousPage, false);

function renderTable() {
  // create html
  let result = "";
  data
    .filter((row, index) => {
      let start = (curPage - 1) * pageSize;
      let end = curPage * pageSize;
      if (index >= start && index < end) return true;
    })
    .forEach((c) => {
      result += `<tr>
<td><img src="${c.images.xs}" alt=""></td>
<td>${c.name}</td>
<td>${c.biography.fullName}</td>
<td>Intelligence:${c.powerstats.intelligence}/
   strength :${c.powerstats.strength}/
    Speed :${c.powerstats.speed}/
    Durability :${c.powerstats.durability}/
    Power :${c.powerstats.power}/
    Combat :${c.powerstats.combat}</td>
<td>${c.appearance.race}</td>
<td>${c.appearance.gender}</td>
<td>${c.appearance.height[1]}</td>
<td>${c.appearance.weight[1]}</td>
<td>${c.biography.placeOfBirth}</td>
<td>${c.biography.alignment}</td>
</tr>`;
    });
  table.innerHTML = result;
}

function sort(e) {
  let thisSort = e.target.dataset.sort;
  if (sortCol === thisSort) sortAsc = !sortAsc;
  sortCol = thisSort;
  console.log("sort dir is ", sortAsc);
  data.sort((a, b) => {
    if (a[sortCol] < b[sortCol]) return sortAsc ? 1 : -1;
    if (a[sortCol] > b[sortCol]) return sortAsc ? -1 : 1;
    data.sort((a, b) => 
    (a.appearance.race > b.appearance.race && b.appearance.race != "null" || a.appearance.race == "null" ? 1 : -1))
    return 0;
  });
  renderTable();
}

function previousPage() {
  if (curPage > 1) curPage--;
  renderTable();
}

function nextPage() {
  if (curPage * pageSize < data.length) curPage++;
  renderTable();
}

function search() {
    const input = document.querySelector('#myInput').value.toLowerCase();
    const tr = table.querySelectorAll('tr');
    tr.forEach(tr => {
      const name = tr.querySelector('td').textContent.toLowerCase();
      if (name.includes(input)) {
        tr.classList.add('visible');
      } else {
        tr.classList.remove('visible');
      }
    });
  }

// const myInput = document.querySelector("#myInput")

//     btn.onclick = (e) => {
//         e.preventDefault()
//         fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
//         .then((response) => response.json()) // parse the response from JSON
//         .then (loadData => {
//             const input = document.querySelector("#nomhero").value
//             const newFilter = loadData.filter(instant => instant.name.toLowerCase().includes(input.toLowerCase()))
//             result.textContent = "";
//             newFilter.map(element => {
//                     console.log('test')
//                     const tr = document.createElement("tr")  
//                     const th = document.createElement("th")
//                     tr.appendChild(th);
//                     th.textContent = element.name;
//                     result.append(tr)
//                 })
//             })
//     }

// 		function myFunction() {
//     // Declare variables
//     let input, filter, table, tr, td, i, txtValue;
//     input = document.getElementById("myInput");
//     filter = input.value.toUpperCase();
//     table = document.getElementById("table-sortable");
//     tr = table.getElementsByTagName("tr");

// // Loop through all table rows, and hide those who don't match the search query
//     for (i = 0; i < tr.length; i++) {
//       td = tr[i].getElementById("td")[1];
//       if (td) {
//         txtValue = td.textContent || td.innerText
//             if (txtValue.toUpperCase().indexOf(filter) > -1) {
//           tr[i].style.display = "";
//             }else {
//           tr[i].style.display = "none";
//             }
//          }
//     }
// }
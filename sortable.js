
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
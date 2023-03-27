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
<td><div>Intelligence:${c.powerstats.intelligence}</div>
    <div>strength :${c.powerstats.strength}</div>
    <div>Speed :${c.powerstats.speed}</div>
    <div>Durability :${c.powerstats.durability}</div>
    <div>Power :${c.powerstats.power}</div>
    <div>Combat :${c.powerstats.combat}</div>
    </td>
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
    if (sortCol === "fullName") {
      return sortAsc ? a.biography.fullName.localeCompare(b.biography.fullName) : b.biography.fullName.localeCompare(a.biography.fullName);
    } else if (sortCol === "powerstats") {
      return sortAsc ? a.powerstats.power - b.powerstats.power : b.powerstats.power - a.powerstats.power;
    } else if (sortCol === "race") {
        return sortAsc ? a.appearance.race.toLowerCase().localeCompare(b.appearance.race.toLowerCase()) : b.appearance.race.toLowerCase().localeCompare(a.appearance.race.toLowerCase());
    } else if (sortCol === "gender") {
      return sortAsc ? a.appearance.gender.localeCompare(b.appearance.gender) : b.appearance.gender.localeCompare(a.appearance.gender);
    } else if (sortCol === "height") {
      return sortAsc ? parseInt(a.appearance.height[1]) - parseInt(b.appearance.height[1]) : parseInt(b.appearance.height[1]) - parseInt(a.appearance.height[1]);
    } else if (sortCol === "weight") {
      return sortAsc ? parseInt(a.appearance.weight[1]) - parseInt(b.appearance.weight[1]) : parseInt(b.appearance.weight[1]) - parseInt(a.appearance.weight[1]);
    } else if (sortCol === "placeOfBirth") {
      return sortAsc ? a.biography.placeOfBirth.localeCompare(b.biography.placeOfBirth) : b.biography.placeOfBirth.localeCompare(a.biography.placeOfBirth);
    } else if (sortCol === "alignment") {
      return sortAsc ? a.biography.alignment.localeCompare(b.biography.alignment) : b.biography.alignment.localeCompare(a.biography.alignment);
    }else if (sortCol === "name") {
        return sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
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
    const rows = table-sortable.querySelectorAll('tr');
    rows.forEach(row => {
      const name = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
      if (name.includes(input)) {
        row.classList.add('visible');
      } else {
        row.classList.remove('visible');
      }
    });
  }

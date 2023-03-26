document.addEventListener("DOMContentLoaded", init, false);

let data, table, sortCol;
let sortAsc = false;

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
}

function renderTable() {
  // create html
  let result = "";
  data.forEach((c) => {
    result += `<tr>
<td><img src="${c.images.xs}" alt=""></td>
<td>${c.name}</td>
<td>${c.biography.fullName}</td>
<td>${c.powerstats}</td>
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
  data.sort((a, b) => {
    if (a[sortCol] < b[sortCol]) return sortAsc ? 1 : -1;
    if (a[sortCol] > b[sortCol]) return sortAsc ? -1 : 1;
    return 0;
  });
  renderTable();
}

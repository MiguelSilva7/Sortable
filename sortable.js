document.addEventListener("DOMContentLoaded", init, false);

let data, table, sortCol;
let sortAsc = false;
let pageSize = 20;
let curPage = 1;

async function init() {
  // Select the table (well, tbody)
  table = document.querySelector("#table-sortable tbody");

  // Fetch data
  let resp = await fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json");
  data = await resp.json();
  
  renderTable();

  // Add event listeners for sorting
  document.querySelectorAll("#table-sortable thead tr th").forEach((t) => {
    t.addEventListener("click", sort, false);
  });

  // Listen for page size select changes
  document.querySelector("#page-size-select").addEventListener("change", (event) => {
    pageSize = parseInt(event.target.value);
    curPage = 1;
    renderTable();
  });

  // Add event listener for search functionality
  document.querySelector("#myInput").addEventListener("input", search);
}

document.querySelector("#nextButton").addEventListener("click", nextPage, false);
document.querySelector("#prevButton").addEventListener("click", previousPage, false);

function renderTable() {
  let result = "";
  data
    .filter((row, index) => {
      let start = (curPage - 1) * pageSize;
      let end = curPage * pageSize;
      return index >= start && index < end;
    })
    .forEach((c) => {
      result += `<tr>
        <td><img src="${c.images.xs}" alt="${c.name}"></td>
        <td>${c.name}</td>
        <td>${c.biography.fullName || "Unknown"}</td>
        <td>
          <div>Intelligence: ${c.powerstats.intelligence}</div>
          <div>Strength: ${c.powerstats.strength}</div>
          <div>Speed: ${c.powerstats.speed}</div>
          <div>Durability: ${c.powerstats.durability}</div>
          <div>Power: ${c.powerstats.power}</div>
          <div>Combat: ${c.powerstats.combat}</div>
        </td>
        <td>${c.appearance.race || "Unknown"}</td>
        <td>${c.appearance.gender}</td>
        <td>${c.appearance.height[1]}</td>
        <td>${c.appearance.weight[1]}</td>
        <td>${c.biography.placeOfBirth || "Unknown"}</td>
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
    let aValue, bValue;
    
    switch (sortCol) {
      case "fullName":
        aValue = a.biography.fullName || "";
        bValue = b.biography.fullName || "";
        break;
      case "powerstats":
        aValue = a.powerstats.power;
        bValue = b.powerstats.power;
        break;
      case "race":
        aValue = a.appearance.race || "";
        bValue = b.appearance.race || "";
        break;
      case "gender":
        aValue = a.appearance.gender;
        bValue = b.appearance.gender;
        break;
      case "height":
        aValue = parseInt(a.appearance.height[1]);
        bValue = parseInt(b.appearance.height[1]);
        break;
      case "weight":
        aValue = parseInt(a.appearance.weight[1]);
        bValue = parseInt(b.appearance.weight[1]);
        break;
      case "placeOfBirth":
        aValue = a.biography.placeOfBirth || "";
        bValue = b.biography.placeOfBirth || "";
        break;
      case "alignment":
        aValue = a.biography.alignment;
        bValue = b.biography.alignment;
        break;
      default:
        aValue = a.name;
        bValue = b.name;
        break;
    }

    return sortAsc ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
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
  const filteredData = data.filter(hero =>
    hero.name.toLowerCase().includes(input) ||
    (hero.biography.fullName && hero.biography.fullName.toLowerCase().includes(input))
  );

  // Render the filtered results
  let result = "";
  filteredData.forEach((c) => {
    result += `<tr>
      <td><img src="${c.images.xs}" alt="${c.name}"></td>
      <td>${c.name}</td>
      <td>${c.biography.fullName || "Unknown"}</td>
      <td>
        <div>Intelligence: ${c.powerstats.intelligence}</div>
        <div>Strength: ${c.powerstats.strength}</div>
        <div>Speed: ${c.powerstats.speed}</div>
        <div>Durability: ${c.powerstats.durability}</div>
        <div>Power: ${c.powerstats.power}</div>
        <div>Combat: ${c.powerstats.combat}</div>
      </td>
      <td>${c.appearance.race || "Unknown"}</td>
      <td>${c.appearance.gender}</td>
      <td>${c.appearance.height[1]}</td>
      <td>${c.appearance.weight[1]}</td>
      <td>${c.biography.placeOfBirth || "Unknown"}</td>
      <td>${c.biography.alignment}</td>
    </tr>`;
  });
  table.innerHTML = result;
}

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const ul = document.getElementById("authors");
const url = "https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json";

fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    let tables = data.results;
    return tables.map(function (table) {
      let tr = createNode("tr");
      let td= createNode("td");
      let img = createNode("img");
      td.innerHTML = `${author} ${author.name.last}`;
      append(tr, img);
      append(tr, td);
      append(tbody, tr);
    });
  })
  .catch(function (error) {
    console.log(error);
  });

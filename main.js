fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
  .then((resp) => resp.json())
  .then((apiData) => {
    
  })
  .catch(function (error) {
    console.log(error);
  });

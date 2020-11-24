// * Get HTML DOM
const button = document.getElementById("sw_subm");
const search = document.getElementById("sw_search");

// * Get Properties DOM 
const name = document.getElementById("name");
const bYear = document.getElementById("bYear");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const homeworld = document.getElementById("homeworld");
const gender = document.getElementById("gender");
const hColor = document.getElementById("hColor");


// * Callback function for Event listener
function getPj() {
  // * In case of a void search input
  let randomNum = Math.floor(Math.random() * 88 + 1);

  // * Fetching the API with Axios (Ajax)
  if (search.value === '') {
    axios
      .get("https://swapi.dev/api/people/" + randomNum)
      .then(function (response) {
        updateInfo(response.data);
      });
  }

  else {
    axios.get("https://swapi.dev/api/people/?search=" + search.value)
      .then(function (response) {
        if (response.data.count === 0) {
          alert("That name doesn't match any character")
        } else {
          updateInfo(response.data.results[0]);
        }
      });
  }

}

// * Render function
function updateInfo(data) {
  name.innerText = `Name: ${data.name}`;
  bYear.innerText = `Birth year: ${data.birth_year}`;
   height.innerText = `Height: ${(data.height/100).toFixed(2)} mts.`;
  weight.innerText = `Weight: ${data.mass} Kg.`;
  if (data.gender !== 'n/a') gender.innerText = `Gender: ${data.gender}`; else data.gender = '';
  if (data.hair_color !== 'n/a')hColor.innerText =`Hair color: ${data.hair_color}`; else hColor.innerText = '';
}


// * Event Listeners
button.addEventListener("click", getPj);
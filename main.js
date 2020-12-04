// * Get HTML DOM
const button = document.getElementById("sw_subm");
const search = document.getElementById("sw_search");

// * Get Properties DOM 
const name = document.getElementById("name");
const bYear = document.getElementById("bYear");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const gender = document.getElementById("gender");
const hColor = document.getElementById("hColor");
const homeworld = document.getElementById("homeworld");

// * Callback function for Event listener
function getPj() {

  

  // * In case of a void search input
  let randomNum = Math.floor((Math.random() * 88) + 1);
  const apiUrl = 'https://swapi.dev/api/people/';

  loadingIcon();

  // * Fetching the API with Axios (Ajax)
  if (search.value === '') {
    axios
      .get('https://swapi.dev/api/people/' + randomNum)
      .then(response => {
        updateInfo(response.data);
        getHomeworld(response.data.homeworld);
      }).catch(e => {
        updateInfoWithError();
      });
  }

  else {
    axios.get(apiUrl+'?search=' + search.value)
      .then(response => {
        if (response.data.count === 0) {
          alert("That name doesn't match any character")
        } else {
          updateInfo(response.data.results[0]);
          getHomeworld(response.data.results[0].homeworld);
        }
      }).catch(e => {
         updateInfoWithError();
      });
  }

}


// * Get extra data ( another API call )
function getHomeworld(url) {
  let planetName;
  axios.get(url)
    .then(function (response) {
      // console.log(response.data.name);
      // planetName = response.data.name;
      // console.log(planetName);
      // return planetName;
      homeworld.innerText = `Homeworld: ${response.data.name}`;
    })
};


// * Render functions
function updateInfo(data) {
  name.innerText = `Name: ${data.name}`;
  bYear.innerText = `Birth year: ${data.birth_year}`;
  height.innerText = `Height: ${(data.height / 100).toFixed(2)} mts.`;
  // ! Datos opcionales
  if (data.mass !== 'unknown') weight.innerText = `Weight: ${data.mass} Kg.`;
  else weight.innerText = `Weight: ${data.mass}`;

  if (data.gender !== 'n/a') gender.innerText = `Gender: ${data.gender}`;
  else data.gender = '';

  if (data.hair_color !== 'n/a') hColor.innerText = `Hair color: ${data.hair_color}`;
  else hColor.innerText = '';

}

function updateInfoWithError() {
  name.innerText = `Oh no! That name doesn't match any character.`;
  bYear.innerText = ``;
  height.innerText = ``;
  weight.innerText = ``;
  gender.innerText = ``;
  hColor.innerText = ``;
  homeworld.innerText=``;
}


function loadingIcon() {
  name.innerHTML = `<div class="loader"></div>`;
  bYear.innerText = ``;
  height.innerText = ``;
  weight.innerText = ``;
  gender.innerText = ``;
  hColor.innerText = ``;
  homeworld.innerText=``;
}


// * Event Listeners
button.addEventListener("click", getPj);
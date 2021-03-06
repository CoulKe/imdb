let apiKey = ''/*Put your api key here*/;
let details = document.querySelector("#movie_details");
let result = "";
//parameters
let title = document.querySelector("#title");
let type = document.querySelector("#type");
let plot = document.querySelector("#plot");
let year = document.querySelector("#year");

const search = document.querySelector("#search");
search.addEventListener("click", function (e) {
  e.preventDefault();
  if (title.value.trim() === "") {
    title.focus();
    alert("Title must be filled");
  } else if(!navigator.onLine)  {
      alert('You appear to be offline, this app requires internet connection');
  } else  {
    searchMovie();
  }
});

function searchMovie() {
  let xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    `http://www.omdbapi.com/?t=${title.value}
    &type=${type.value}&plot=${plot.value}&y=${year.value}&apikey=${apiKey}`
  );
  xhr.onprogress = function(){
    let loader = document.querySelector('#movie_details');
    loader.innerHTML = `
    <img src="./assets/win/Spinner-0.6s-200px.svg"
    alt="Loading">
    <p style="text-align: center; font-weight: bold;">Loading...</p>
    `;
  }
  xhr.timeout = 10000;
  xhr.ontimeout = function (){
    let loader = document.querySelector('#movie_details');
    loader.innerHTML = `
    <h1>Oops</h1>
    <p>It's taking unexpectedly long, check your connection or try to be more
    specific with your search.</p>
    `;
  }
  xhr.onload = function () {
    if (this.status === 200) {
      let data = [];
      let output = "";

      result = JSON.parse(this.responseText);
      if (result["Response"].toLowerCase() === "false") {
        output += `
            <div>
            <h1>Movie not found!</h1>
            </div>
            `;
      } else {
        data.push(result);

        for (i in data) {
          output += `<div class="movie">
            <h1>${data[i].Title} (${data[i].Released})</h1>
            <p id='type_name'><b>Type:</b> ${data[i].Type}</p>
            <p><b>Language:</b> ${data[i].Language}</p>
            <p><b>Country:</b> ${data[i].Country}</p>
            <p><b>Genre:</b> ${data[i].Genre}</p>
            <p><b>Awards:</b> ${data[i].Awards}</p>
            <p><b>Writer:</b> ${data[i].Writer}</p>
            <p><b>Casts:</b> ${data[i].Actors}</p>
            <p><b>Plot:</b> ${data[i].Plot}</p>
            <p><b>Imdb Rating:</b> ${data[i].imdbRating}</p>
            <p><b>Ratings:</b> ${data[i].Ratings[0].Source} ${data[i].Ratings[0].Value}</p>
            </ul>
            </div>
            `;
        }
      }

      details.innerHTML = output;
    }
  };
  xhr.send();
}

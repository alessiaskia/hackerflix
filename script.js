import './styles.scss';
import { movies } from './src/movies';

const app = document.getElementById('app');

// every files in "static" folder can be used directly like that
// app.innerHTML += '<img src="images/kitten.jpg" style="width:100px;" />';

// --- PART ONE : STATIC JS --- //

// create section recent field only
const recent = '<button type="button" class="btn btn-dark" id="recent">Recent films only</button>';

// create card for each movie with image, assign numeric ID
let card = '';
let container = '<section class="flex-wrap">';
let movieId = 0;
for (const movie of movies) {
  if (movie.year < 2000) {
    card = `
              <div class="card old" id="${movieId}">`;
  } else {
    card = `<div class="card" id="${movieId}">`;
  }
  // verify if poster available
  if (movie.img) {
    card += `<img src="images/${movie.imdb}.jpg" alt="${movie.title}" />`;
  } else {
    card += `<div class="card empty"><h3>${movie.title}</h3></div>`;
  }
  card += '</div>';
  // increase id
  movieId++;
  // add to container
  container += card;
}
container += '</div>';
// show in 'app'
app.innerHTML = `${recent + container}</section>`;

// --- PART TWO: DYNAMIC JS --- //
// create botton to filter recent movies
const oldMovies = document.querySelectorAll('.old');
document.body.addEventListener('click', (e) => {
  if (e.target.matches('#recent')) {
    if (e.target.innerHTML === 'Recent movies only') {
      e.target.innerHTML = 'See all movies';
    } else {
      e.target.innerHTML = 'Recent movies only';
    }
    // select all movies < 2000
    for (const oldMovie of oldMovies) {
      oldMovie.classList.toggle('invisible');
    }
  }
});

// popup with info about movie
let popup = '';
document.body.addEventListener('click', (e) => {
  if (e.target.matches('.card')) {
    movies.forEach(selectedMovie) => {
      if (e.target.title === selectedMovie.title){
        popup = `<div class="card" style="width: 18rem">
        <div class="card-header">Title: ${selectedMovie.title}</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Genres: ${selectedMovie.genres}</li>
          <li class="list-group-item">Year: ${selectedMovie.year}</li>
          <li class="list-group-item">Plot: ${selectedMovie.plot}</li>
          <li class="list-group-item">Rating: ${selectedMovie.note}</li>
          <li class="list-group-item">IMBD code: ${selectedMovie.imdb}</li>
          </ul><button class="close">X</button></div>`;
        app.innerHTML += popup;
      }
    });
});

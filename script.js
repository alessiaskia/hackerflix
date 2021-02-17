import './styles.scss';
import { movies } from './src/movies';

const app = document.getElementById('app');

// every files in "static" folder can be used directly like that
// app.innerHTML += '<img src="images/kitten.jpg" style="width:100px;" />';

// --- PART ONE : STATIC JS --- //

// create section recent field only
const recent = '<button type="button" class="btn btn-dark" id="recent">Recent movies only</button>';
let popup = '';
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
    card += `<img src="images/${movie.imdb}.jpg" alt="${movie.title}" class="poster" />`;
  } else {
    card += `<h3 class="empty poster">${movie.title}</h3>`;
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
const oldMovies = document.querySelectorAll('.old');
document.body.addEventListener('click', (e) => {
  // create botton to filter recent movies
  // select all movies < 2000
  if (e.target.matches('#recent')) {
    console.log(e.target);
    for (const oldMovie of oldMovies) {
      oldMovie.classList.toggle('invisible');
    }
    // change text in button
    if (e.target.innerHTML === 'Recent movies only') {
      e.target.innerHTML = 'See all movies';
    } else {
      e.target.innerHTML = 'Recent movies only';
    }
  } else if (e.target.matches('.poster')) {
    // popup with info about movie
    const selectedMovie = e.target.parentNode;
    const movie = movies[selectedMovie.id]; // aller chercher le film avec son index !!!! rien de plus simple
    popup = `
    <div class="card popup">
     <div class="card">
       <h2 class="card-title">${movie.title}</h2>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Genres: ${movie.genres}</li>
          <li class="list-group-item">Year: ${movie.year}</li>
          <li class="list-group-item">Plot: ${movie.plot}</li>
          <li class="list-group-item">Rating: ${movie.note}</li>
          <li class="list-group-item">IMBD code: ${movie.imdb}</li>
          </ul>
          <button class="close">X</button>
      </div>
    </div>`;
    app.innerHTML += popup;
    // fermer le popup = l'effacer du HTML
  } else if (e.target.matches('.close')) {
    const popups = document.querySelectorAll('.popup');
    for (popup of popups) {
      const popupContainer = e.target.parentNode.parentNode.parentNode;
      // console.log(popupContainer);
      popupContainer.removeChild(popup);
      // popup.classList.add('invisible');
    }
  }
});

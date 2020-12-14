import './styles.scss';
import { movies } from './src/movies';

const app = document.getElementById('app');

// every files in "static" folder can be used directly like that
// app.innerHTML += '<img src="images/kitten.jpg" style="width:100px;" />';
// create section recent field only
const recent = '<button id="recent">Recent films only</button>';

// create card for each movie with image, assign numeric ID
let card = '';
let container = '<section class="flex-wrap">';
let movieId = 0;

for (const movie of movies) {
  card = `
        <div class="card" id="${movieId}">`;
  // verify if poster available
  if (movie.img) {
    card += `<img src="images/${movie.imdb}.jpg" alt="poster ${movie.title}" />`;
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

document.body.addEventListener('click', (e) => {
  if (e.target.matches('#recent')) {
    console.log('ok');
  }
});

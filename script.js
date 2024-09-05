let movieLibrary = [];

function Movie(title, rate, prodyear, seasons, watched) {
    this.title = title;
    this.rate = rate;
    this.prodyear = prodyear;
    this.seasons = seasons;
    this.watched = watched;
}

function addtolibrary(movie) {
    movieLibrary.push(movie);
    displayMovies();
}

function displayMovies() {
    const library = document.getElementById('library');
    library.innerHTML = '';

    movieLibrary.forEach((movie, index) => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie-card');

        movieDiv.innerHTML = `
            <h3>${movie.title}</h3>
            <p><strong>Rating:</strong> ${movie.rate}/10</p>
            <p><strong>Production Year:</strong> ${movie.prodyear}</p>
            <p><strong>Seasons:</strong> ${movie.seasons}</p>
            <p><strong>Watched:</strong> <span id="watchedStatus-${index}" class="watched-status ${movie.watched ? 'yes' : 'no'}">${movie.watched ? 'Yes' : 'No'}</span></p>
            <button class="toggle-watched-btn" data-index="${index}">${movie.watched ? 'Mark as Unwatched' : 'Mark as Watched'}</button>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        library.appendChild(movieDiv);
    });

    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeMovie);
    });

    const toggleWatchedButtons = document.querySelectorAll('.toggle-watched-btn');
    toggleWatchedButtons.forEach(button => {
        button.addEventListener('click', toggleWatchedButton);
    });
}

function removeMovie(event) {
    const index = event.target.dataset.index;
    movieLibrary.splice(index, 1);
    displayMovies();
}

function toggleWatchedButton(event) {
    const index = event.target.dataset.index;
    const movie = movieLibrary[index];

    movie.watched = !movie.watched;

    const watchedStatus = document.getElementById(`watchedStatus-${index}`);
    const toggleButton = event.target;

    if (movie.watched) {
        watchedStatus.textContent = 'Yes';
        watchedStatus.className = 'watched-status yes';
        toggleButton.textContent = 'Mark as Unwatched';
    } else {
        watchedStatus.textContent = 'No';
        watchedStatus.className = 'watched-status no';
        toggleButton.textContent = 'Mark as Watched';
    }
}

// Modal controls
const movieModal = document.getElementById('movieModal');
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');

openModalBtn.addEventListener('click', () => {
    movieModal.showModal();
});

closeModalBtn.addEventListener('click', () => {
    movieModal.close();
});

document.getElementById('movieForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const rate = document.getElementById('rate').value;
    const prodyear = document.getElementById('prodyear').value;
    const seasons = document.getElementById('seasons').value;
    const watched = document.getElementById('watched').checked;

    const newMovie = new Movie(title, rate, prodyear, seasons, watched);
    addtolibrary(newMovie);
    document.getElementById('movieForm').reset();
    movieModal.close();
});

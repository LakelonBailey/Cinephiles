const searchBtn = document.getElementById('search-submit');

// unhides the movie name input if the user chooses to search by name
const handleSearchChange = (event) => {
    let type = event.target.value
    let nameInputField = document.getElementById('name-input-field')
    if (type == 'name') {
        if (nameInputField.classList.contains('is-hidden')) {
            nameInputField.classList.remove('is-hidden')
        }
        document.getElementById('name-input').required = true
    }
    else {
        if (!nameInputField.classList.contains('is-hidden')) {
            nameInputField.classList.add('is-hidden')
        }
        document.getElementById('name-input').required = false
    }
}
document.querySelector('#search-type').addEventListener('change', event => {
    handleSearchChange(event)
});

// fetches data from imdb api
const search = async (type, api_key) => {
    let url;
    if (type == 'top250') {
        url = `https://imdb-api.com/en/API/Top250Movies/${api_key}`
    }
    else if (type == 'popular') {
        url = `https://imdb-api.com/en/API/MostPopularMovies/${api_key}`
    }
    else {
        let nameInput = document.getElementById('name-input').value
        url = `https://imdb-api.com/en/API/SearchMovie/${api_key}/` + nameInput
    }

    const response = await fetch(url)
    return response;
}


// waits for the search for to submit, then retrieves data from the imdb api
document.getElementById('search-form').addEventListener('submit', event => {
    event.preventDefault();
    searchBtn.classList.add('is-loading');
    let type = document.getElementById('search-type').value;
    getApiKey().then(res => {
        res.json().then(data => {
            const api_key = data.api_key
            search(type, api_key).then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        searchBtn.classList.remove('is-loading')
        
                        let results;
                        if (type == 'name') {
                            results = data.results
                        }
                        else {
                            results = data.items
                        }
                        
                        displayResults(results)
                    })
                }
            })
        })
    })
})


// displays api data to the user
const displayResults = results => {
    let resultCont = document.getElementById('result-cont')
    if (results.length) {
        let movieList = ``
        results.forEach(movie => {
            let movieListItem = `
            <li class="movie-list-item">
                <img class="movie-img" id="${movie.id}-img" src="${movie.image}">
                <div class="movie-info">
                    <p id="${movie.id}-title" class="title is-size-6 movie-title">
                    ${movie.title}
                    </p>
                    <button value="${movie.id}" class="button is-small movie-button is-info is-outlined is-rounded" onclick="viewMovie(event)">
                    More Info
                    </button>
                    <button value="${movie.id}" class="button is-small movie-button is-success is-outlined is-rounded" onclick="addToWatchlist(event)">
                    Add to Watchlist
                    </button>
                </div>
            </li>
            `
            movieList += movieListItem
        })
        resultCont.innerHTML =`
        <ul class="result-list">
            ${movieList}
        </ul>
        `
    }
    else {
        displayMessage('No Results Found.', 'is-info')
    }
}

// handles the add to watchlist button by sending a post request to the backend with data
const addToWatchlist = event => {
    let imdbId = event.target.value;
    let movieTitle = document.getElementById(imdbId + '-title').textContent.trim();;
    let movieImage = document.getElementById(imdbId + '-img').src;

    body = {
        imdb_id: imdbId,
        title: movieTitle,
        image: movieImage
    }

    fetch('/api/movie/', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(res => {
        res.json().then(data => {
            event.target.parentElement.parentElement.remove();
            displayMessage(data.message, data.type)
        })
    })
}

// displays a message

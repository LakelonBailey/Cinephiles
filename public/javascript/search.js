const searchBtn = document.getElementById('search-submit');

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


const search = async type => {
    let url;
    if (type == 'top250') {
        url = 'https://imdb-api.com/en/API/Top250Movies/k_ee3v594a'
    }
    else if (type == 'popular') {
        url = 'https://imdb-api.com/en/API/MostPopularMovies/k_ee3v594a'
    }
    else {
        let nameInput = document.getElementById('name-input').value
        url = 'https://imdb-api.com/en/API/SearchMovie/k_ee3v594a/' + nameInput
    }

    const response = await fetch(url)

    return response;
}


document.getElementById('search-form').addEventListener('submit', event => {
    event.preventDefault();
    searchBtn.classList.add('is-loading');
    let type = document.getElementById('search-type').value;
    search(type).then(res => {
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
                    View Movie
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
        resultCont.innerHTML = `
        <p>No Results Found</p>
        `
    }
}


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


const displayMessage = (message, type) => {
    let notif = document.getElementById('notif-cont')
    notif.innerHTML = `
    <div class="notification ${type}">
        ${message}
    </div>
    `
    setTimeout(() => {
        notif.innerHTML = ``
    }, 1000)
}
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
    console.log(results)
    const resultList = document.getElementById('result-list')
    while(resultList.firstChild) {
        resultList.firstChild.remove()
    }
    results.forEach(movie => {
        let listItem = document.createElement('li')
        listItem.classList = 'movie-list-item'
        listItem.id = movie.id

        let movieImgEl = document.createElement('img')
        movieImgEl.id = movie.id + '-img'
        movieImgEl.src = movie.image
        movieImgEl.classList = 'movie-img'
        listItem.appendChild(movieImgEl)

        let movieTitleEl = document.createElement('p')
        movieTitleEl.id = movie.id + '-title'
        movieTitleEl.classList = 'title is-size-6 movie-title'
        movieTitleEl.textContent = movie.title
        listItem.appendChild(movieTitleEl)

        resultList.appendChild(listItem)
    })

}
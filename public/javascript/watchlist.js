const deleteFromWatchlist = event => {
    const movieId = event.target.value;
    const url = '/api/movie/' + movieId
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(res => {
        if (res.ok) {
            res.json().then(data => {
                event.target.parentElement.parentElement.remove();
                displayMessage(data.message, 'is-success')
            })
        }
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

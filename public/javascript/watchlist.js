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
            console.log('this')
            res.json().then(data => {
                event.target.parentElement.parentElement.remove();
                displayMessage(data.message, 'is-success')
            })
        }
    })
}


const displayMessage = (message, type) => {
    document.getElementById('notif-cont').innerHTML = `
    <div class="notification ${type}">
        <button class="delete" onclick="deleteNotif(event)"></button>
        ${message}
    </div>
    `
}


const deleteNotif = event => {
    event.target.parentElement.remove()
}
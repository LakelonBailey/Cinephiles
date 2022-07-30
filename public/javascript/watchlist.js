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
    let notifCont = document.getElementById('notif-cont')
    let notif = document.createElement('div')
    notif.innerHTML = `
    <div class="notification ${type}">
        ${message}
    </div>
    `
    notifCont.appendChild(notif)
    setTimeout(() => {
        notif.remove()
    }, 1000)
}

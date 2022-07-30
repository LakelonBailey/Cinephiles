const reviewForm = document.getElementById('review-form')

reviewForm.addEventListener('submit', event => {
    event.preventDefault();
    const movieId = parseInt(document.getElementById('movie-id').value)
    const rating = parseInt(document.getElementById('rating').value)
    const reviewText = document.getElementById('review-text').value

    const body = {
        movie_id: movieId,
        rating: rating,
        review_text: reviewText
    }
    fetch('/reviews/', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.ok) {
            document.location.reload();
        }
    })
})

const deleteReview = event => {
    const reviewId = event.target.id;

    fetch('/reviews/' + reviewId, {
        method: 'delete',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.ok) {
            document.location.reload()
        }
    })
}
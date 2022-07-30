const reviewForm = document.getElementById('review-form')
const reviewSubmitBtn = document.getElementById('review-submit')

reviewForm.addEventListener('submit', event => {
    event.preventDefault();
    reviewSubmitBtn.classList.add('is-loading')
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
        reviewSubmitBtn.classList.remove('is-loading')
    })
}
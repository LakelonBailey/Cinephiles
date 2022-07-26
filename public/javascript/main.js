// renders the movie modal with additional information retrieved from a fetch request to imdb
const viewMovie = event => {
  event.target.classList.add('is-loading')
  const modal = document.getElementById('view-movie-modal')

  const infoCont = document.getElementById('movie-info-cont')
  const imdbId = event.target.value;
  getApiKey()
  .then(res => {
    res.json().then(data => {
      const url = `https://imdb-api.com/en/API/Title/${data.api_key}/${imdbId}`
      fetch(url)
      .then(res => {
        res.json().then(data => {
          infoCont.innerHTML = `
          <h3 class="title is-size-6">${data.fullTitle}</h3>

          <div class="modal-movie-info content">
            <img src="${data.image}" class="modal-movie-img">
            <div class="movie-text">
              <p><strong>Director(s):</strong> ${data.directors}</p>
              <p><strong>Star(s):</strong> ${data.stars}</p>
              <p><strong>Writer(s):</strong> ${data.writers}</p>
              <p><strong>IMDB Rating:</strong> ${data.imDbRating}</p>
              <p><strong>Year:</strong> ${data.year}</p>
              <p><strong>Runtime:</strong> ${data.runtimeStr}</p>
              <p><strong>Revenue:</strong> ${data.boxOffice.cumulativeWorldwideGross}</p>
            </div>
          </div>
          `
          modal.classList.add('is-active')
          event.target.classList.remove('is-loading')
        })
      })
    })
  })
  

}

// gets api key from backend
const getApiKey = async () => {
  const response = await fetch('/search/api-key/', {
      method: 'GET',
      headers: {
          'Accept': 'application/json'
      }
  })
  return response
}

// displays a message
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


document.addEventListener('DOMContentLoaded', () => {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
  
        const target = el.dataset.target;
        const $target = document.getElementById(target);
  
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
  
      });
    });

  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});

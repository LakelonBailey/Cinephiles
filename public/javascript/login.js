// sends a request to log in a user and handles different login scenarios
async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/watchlist/');
    } else {
      response.json().then(data => {
        displayMessage(data.message, data.type)
      })
    }
  }
}

// signs up a new user and handles different signup errors, such as an invalid email
async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/watchlist/');
    } else {
      response.json().then(data => {
        displayMessage(data.message, data.type)
      })
    }
  }
}


// displays messages
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
  }, 3000)
}


document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

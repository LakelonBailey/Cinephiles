const handleSearchChange = (event) => {
    let type = event.target.value
    let nameInputField = document.getElementById('name-input-field')
    if (type == 'name') {
        if (nameInputField.classList.contains('is-hidden')) {
            nameInputField.classList.remove('is-hidden')
        }
    }
    else {
        if (!nameInputField.classList.contains('is-hidden')) {
            nameInputField.classList.add('is-hidden')
        }
    }
}


















document.querySelector('#search-type').addEventListener('change', event => {
    handleSearchChange(event)
});
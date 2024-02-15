// API endpoint core path to fetch from
const gameCardApiUrl = 'http://localhost:8080/api/gamecard';

const requestDiv = document.getElementById('request-json');
const responseDiv = document.getElementById('response-json');

function getGameCardById() {
    const getId = document.getElementById('get-id').value;

    // Fetch the game card data
    fetch(gameCardApiUrl + '/get/id/' + getId, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            requestDiv.innerText = 'Path variable: id = ' + getId;
            responseDiv.innerText = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Error fetching game card:', error);
        });
}

function getGameCardByTitle() {
    const getTitle = document.getElementById('get-title').value;

    // Fetch the game card data
    fetch(gameCardApiUrl + '/get/title/' + getTitle, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            requestDiv.innerText = 'Path variable: title = ' + getTitle;
            responseDiv.innerText = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Error fetching game card:', error);
        });
}

function getAllGameCards() {
    // Fetch all game cards
    fetch(gameCardApiUrl + '/get/all', {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            requestDiv.innerText = 'No arguments needed for this request.';
            responseDiv.innerText = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Error fetching game cards:', error);
        });
}

function deleteGameCardById() {
    const deleteId = document.getElementById('delete-id').value;

    // Delete the game card
    fetch(gameCardApiUrl + '/delete/id/' + deleteId, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            requestDiv.innerText = 'Path variable: id = ' + deleteId;
            responseDiv.innerText = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Error deleting game card:', error);
        });
}

function deleteGameCardByTitle() {
    const deleteTitle = document.getElementById('delete-title').value;

    // Delete the game card
    fetch(gameCardApiUrl + '/delete/title/' + deleteTitle, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            requestDiv.innerText = 'Path variable: title = ' + deleteTitle;
            responseDiv.innerText = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Error deleting game card:', error);
        });
}

function createGameCard() {
    const title = document.getElementById('create-title').value;
    const description = document.getElementById('create-description').value;
    const rules = document.getElementById('create-rules').value;
    const categories = Array.from(document.getElementById('create-categories').selectedOptions).map(option => option.value);

    const requestBody = JSON.stringify({ title: title, description: description, rules: rules, username: usernameText, categories: categories });

    // Create a new game card
    fetch(gameCardApiUrl + '/create', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: requestBody
    })
        .then(response => response.json())
        .then(data => {
            requestDiv.innerText = requestBody;
            responseDiv.innerText = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Error creating game card:', error);
        });
}

function updateGameCard() {
    const id = document.getElementById('update-id').value;
    const title = document.getElementById('update-title').value;
    const description = document.getElementById('update-description').value;
    const rules = document.getElementById('update-rules').value;
    const categories = Array.from(document.getElementById('update-categories').selectedOptions).map(option => option.value);

    const requestBody = JSON.stringify({ id: id, title: title, description: description, rules: rules, categories: categories });

    // Update the game card
    fetch(gameCardApiUrl + '/update', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: requestBody
    })
        .then(response => response.json())
        .then(data => {
            requestDiv.innerText = requestBody;
            responseDiv.innerText = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Error updating game card:', error);
        });
}
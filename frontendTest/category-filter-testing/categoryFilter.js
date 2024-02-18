// API endpoint core path to fetch from
const gameCardApiUrl = 'http://localhost:8080/api/gamecard';

const requestDiv = document.getElementById('request-json');
const responseDiv = document.getElementById('response-json');

function getGameCardsByCategory() {
    const categories = Array.from(document.getElementById('categories').selectedOptions).map(option => option.value);
    const requestBody = JSON.stringify({ categories: categories });

    // Fetch game cards by category
    fetch(gameCardApiUrl + '/get/categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: requestBody
    })
        .then(response => response.json().then(data => {
            requestDiv.innerText = 'Filter by categories: ' + categories.join(', ');
            if (response.ok) {
                responseDiv.innerText = data.map(obj => `${obj.title} [${obj.categories.join(', ')}]`).join('\n');
            } else {
                responseDiv.innerText = response.status + ' ' + data.message;
            }
        }))
        .catch(error => {
            console.error('Error getting game cards:', error);
        });
}

function getAllGameCards() {
    // Fetch all game cards
    fetch(gameCardApiUrl + '/get/all', {
        method: 'GET',
    })
        .then(response => response.json().then(data => {
            requestDiv.innerText = 'Get all cards';
            if (response.ok) {
                responseDiv.innerText = data.map(obj => obj.title).join('\n');
            } else {
                responseDiv.innerText = response.status + ' ' + data.message;
            }
        }))
        .catch(error => {
            console.error('Error fetching game cards:', error);
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
        .then(response => response.json().then(data => {
            requestDiv.innerText = 'Create new card with title: ' + title;
            if (response.ok) {
                responseDiv.innerText = data.message;
            } else {
                responseDiv.innerText = response.status + ' ' + data.message;
            }
        }))
        .catch(error => {
            console.error('Error creating game card:', error);
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
        .then(response => response.json().then(data => {
            requestDiv.innerText = 'Delete card titled: ' + deleteTitle;
            if (response.ok) {
                responseDiv.innerText = data.message;
            } else {
                responseDiv.innerText = response.status + ' ' + data.message;
            }
        }))
        .catch(error => {
            console.error('Error deleting game card:', error);
        });
}
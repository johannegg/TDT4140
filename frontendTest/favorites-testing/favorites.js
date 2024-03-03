// API endpoint core path to fetch from
const gameCardApiUrl = 'http://localhost:8080/api/gamecard';
const favoritesApiUrl = 'http://localhost:8080/api/favorites';

const requestDiv = document.getElementById('request-json');
const responseDiv = document.getElementById('response-json');

function getAllGameCards() {

    fetch(gameCardApiUrl + '/get/all', {
        method: 'GET',
    })
        .then(response => response.json().then(data => {
            requestDiv.innerText = 'Get all cards';
            if (response.ok) {
                const cards = data.map(obj => `${obj.id} - ${obj.title} - ${obj.averageRating}`).join('\n');
                responseDiv.innerText = 'ID - Title - Average Rating\n' + cards;
            } else {
                responseDiv.innerText = response.status + ' ' + data.message;
            }
        }))
        .catch(error => {
            console.error('Error fetching game cards:', error);
        });
}

function getFavorites() {

    fetch(favoritesApiUrl + '/get/all/' + usernameText, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => response.json().then(data => {
            requestDiv.innerText = 'Get favorites for username: ' + usernameText;
            if (response.ok) {
                const cards = data.map(obj => `${obj.id} - ${obj.title} - ${obj.averageRating}`).join('\n');
                responseDiv.innerText = 'ID - Title - Average Rating\n' + cards;
            } else {
                responseDiv.innerText = response.status + ' ' + data.message;
            }

        }))
        .catch(error => {
            console.error('Error getting favorites:', error);
        });
}

function toggleFavorite() {
    const gameCardId = document.getElementById('toggle-gamecard-id').value;
    const requestBody = JSON.stringify({ gameCardId: gameCardId, username: usernameText });

    fetch(favoritesApiUrl + '/toggle', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: requestBody
    })
    .then(response => response.json().then(data => {
        requestDiv.innerText = 'Toggle favorite for card ' + gameCardId + ' and username ' + usernameText;
        if (response.ok) {
            responseDiv.innerText = data.message;
        } else {
            responseDiv.innerText = response.status + ' ' + data.message;
        }
    }))
    .catch(error => {
        console.error('Error toggling favorite:', error);
    });
}

function checkFavorite() {
    const gameCardId = document.getElementById('check-gamecard-id').value;
    const requestBody = JSON.stringify({ gameCardId: gameCardId, username: usernameText });

    fetch(favoritesApiUrl + '/check', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: requestBody
    })
    .then(response => response.json().then(data => {
        requestDiv.innerText = 'Check if card ' + gameCardId + ' is favorited for username ' + usernameText;
        if (response.ok) {
            responseDiv.innerText = data.isFavorite;
        } else {
            responseDiv.innerText = response.status + ' ' + data.message;
        }
    }))
    .catch(error => {
        console.error('Error checking favorite:', error);
    });
}
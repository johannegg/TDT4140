// API endpoint core path to fetch from
const gameCardApiUrl = 'http://localhost:8080/api/gamecard';
const ratingApiUrl = 'http://localhost:8080/api/rating';

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

function getRatingsByGameCardId() {
    const gameCardId = document.getElementById('get-ratings-gamecard-id').value;

    fetch(ratingApiUrl + '/get/gamecard/' + gameCardId, {
        method: 'GET',
    })
        .then(response => response.json().then(data => {
            requestDiv.innerText = 'Get ratings for card id: ' + gameCardId;
            if (response.ok) {
                const ratings = data.map(obj => `${obj.score} - ${obj.comment} (${obj.username})`).join('\n');
                responseDiv.innerText = 'Score - Comment (Username)\n' + ratings;
            } else {
                responseDiv.innerText = response.status + ' ' + data.message;
            }

        }))
        .catch(error => {
            console.error('Error getting game cards:', error);
        });
}

function getRatingsByUsername() {
    const username = document.getElementById('get-ratings-username').value;

    fetch(ratingApiUrl + '/get/user/' + username, {
        method: 'GET',
    })
        .then(response => response.json().then(data => {
            requestDiv.innerText = 'Get ratings by user: ' + username;
            if (response.ok) {
                const ratings = data.map(obj => `${obj.score} - ${obj.comment} (${obj.gameCardId})`).join('\n');
                responseDiv.innerText = 'Score - Comment (Card ID)\n' + ratings;
            } else {
                responseDiv.innerText = response.status + ' ' + data.message;
            }
        }))
        .catch(error => {
            console.error('Error getting game cards:', error);
        });
}

function addRating() {
    const score = document.getElementById('add-score').value;
    let comment = document.getElementById('add-comment').value;
    if (comment === '') {
        comment = null;
    }
    const gameCardId = document.getElementById('add-gamecard-id').value;

    const requestBody = JSON.stringify({ score: score, comment: comment, gameCardId: gameCardId, username: usernameText });

    fetch(ratingApiUrl + '/add', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: requestBody
    })
        .then(response => response.json().then(data => {
            requestDiv.innerText = 'Add new rating to card ' + gameCardId + ' by ' + usernameText;
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

function removeRating() {
    const removeGameCardId = document.getElementById('remove-gamecard-id').value;
    const removeUsername = document.getElementById('remove-username').value;

    fetch(ratingApiUrl + '/delete/' + removeGameCardId + '/' + removeUsername, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json().then(data => {
            requestDiv.innerText = 'Remove rating for card ' + removeGameCardId + ' by ' + removeUsername;
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
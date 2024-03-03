// API endpoint core path to fetch from
const gameCardApiUrl = 'http://localhost:8080/api/gamecard';
const queueApiUrl = 'http://localhost:8080/api/queue';

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

function getQueue() {

    fetch(queueApiUrl + '/get/all/' + usernameText, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => response.json().then(data => {
            requestDiv.innerText = 'Get queue for username: ' + usernameText;
            if (response.ok) {
                const cards = data.map(obj => `${obj.id} - ${obj.title} - ${obj.averageRating}`).join('\n');
                responseDiv.innerText = 'ID - Title - Average Rating\n' + cards;
            } else {
                responseDiv.innerText = response.status + ' ' + data.message;
            }

        }))
        .catch(error => {
            console.error('Error getting queue:', error);
        });
}

function toggleInQueue() {
    const gameCardId = document.getElementById('toggle-gamecard-id').value;
    const requestBody = JSON.stringify({ gameCardId: gameCardId, username: usernameText });

    fetch(queueApiUrl + '/toggle', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: requestBody
    })
    .then(response => response.json().then(data => {
        requestDiv.innerText = 'Toggle in-queue for card ' + gameCardId + ' and username ' + usernameText;
        if (response.ok) {
            responseDiv.innerText = data.message;
        } else {
            responseDiv.innerText = response.status + ' ' + data.message;
        }
    }))
    .catch(error => {
        console.error('Error toggling in-queue:', error);
    });
}

function checkInQueue() {
    const gameCardId = document.getElementById('check-gamecard-id').value;
    const requestBody = JSON.stringify({ gameCardId: gameCardId, username: usernameText });

    fetch(queueApiUrl + '/check', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: requestBody
    })
    .then(response => response.json().then(data => {
        requestDiv.innerText = 'Check if card ' + gameCardId + ' is in queue for username ' + usernameText;
        if (response.ok) {
            responseDiv.innerText = data.isInQueue;
        } else {
            responseDiv.innerText = response.status + ' ' + data.message;
        }
    }))
    .catch(error => {
        console.error('Error checking in-queue:', error);
    });
}
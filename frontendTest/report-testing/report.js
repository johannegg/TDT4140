// API endpoint core path to fetch from
const reportApiUrl = 'http://localhost:8080/api/report';

const requestDiv = document.getElementById('request-json');
const responseDiv = document.getElementById('response-json');

function getGameCardReports() {

    // Fetch the game card data
    fetch(reportApiUrl + '/get/gamecard', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => response.json().then(data => {
            requestDiv.innerText = 'Get all game card reports';
            if (response.ok) {
                responseDiv.innerText = JSON.stringify(data, null, 2);
            } else {
                responseDiv.innerText = response.status + ' ' + data.message;
            }
        }))
        .catch(error => {
            console.error('Error fetching game card:', error);
        });
}

function getCommentReports() {
    // Fetch the comment data
    fetch(reportApiUrl + '/get/comment', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => response.json().then(data => {
            requestDiv.innerText = 'Get all comment reports';
            if (response.ok) {
                responseDiv.innerText = JSON.stringify(data, null, 2);
            } else {
                responseDiv.innerText = response.status + ' ' + data.message;
            }
        }))
        .catch(error => {
            console.error('Error fetching comment:', error);
        });
}


function deleteGameCardReport() {
    const gameCardId = document.getElementById('delete-gamecard-id').value;
    const reportingUserId = document.getElementById('delete-gamecard-reporter-id').value;

    const requestBody = JSON.stringify({ reportingUserId: reportingUserId, gameCardId: gameCardId });

    // Delete the game card report
    fetch(reportApiUrl + '/delete/gamecard', {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: requestBody
    })
        .then(response => response.json().then(data => {
            requestDiv.innerText = 'Delete game card report with game card ID ' + gameCardId + ' and reporting user ID ' + reportingUserId;
            if (response.ok) {
                responseDiv.innerText = JSON.stringify(data, null, 2);
            } else {
                responseDiv.innerText = response.status + ' ' + data.message;
            }
        }))
        .catch(error => {
            console.error('Error deleting game card report:', error);
        });
}

function deleteCommentReport() {
    const gameCardId = document.getElementById('delete-rating-gamecard-id').value;
    const reportingUserId = document.getElementById('delete-rating-reporter-id').value;
    const ratingUserId = document.getElementById('delete-rating-user-id').value;

    const requestBody = JSON.stringify({ reportingUserId: reportingUserId, gameCardId: gameCardId, ratingUserId: ratingUserId });

    // Delete the comment report
    fetch(reportApiUrl + '/delete/comment', {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: requestBody
    })
        .then(response => response.json().then(data => {
            requestDiv.innerText = 'Delete comment report with game card ID ' + gameCardId + ', reporting user ID ' + reportingUserId + ', and rating user ID ' + ratingUserId;
            if (response.ok) {
                responseDiv.innerText = JSON.stringify(data, null, 2);
            } else {
                responseDiv.innerText = response.status + ' ' + data.message;
            }
        }))
        .catch(error => {
            console.error('Error deleting comment report:', error);
        });
}

function sendGameCardReport() {
    const gameCardId = document.getElementById('send-gamecard-id').value;
    const reason = document.getElementById('send-gamecard-reason').value;    
    const comment = document.getElementById('send-gamecard-comment').value;

    const requestBody = JSON.stringify({ reportingUserId: userIdText, gameCardId: gameCardId, reason: reason, comment: comment });

    // Send the game card report
    fetch(reportApiUrl + '/send/gamecard', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: requestBody
    })
        .then(response => response.json().then(data => {
            requestDiv.innerText = 'Send game card report with game card ID ' + gameCardId;
            if (response.ok) {
                responseDiv.innerText = JSON.stringify(data, null, 2);
            } else {
                responseDiv.innerText = response.status + ' ' + data.message;
            }
        }))
        .catch(error => {
            console.error('Error sending game card report:', error);
        });
}

function sendCommentReport() {
    const gameCardId = document.getElementById('send-rating-gamecard-id').value;
    const ratingUserId = document.getElementById('send-rating-user-id').value;
    const reason = document.getElementById('send-rating-reason').value;    
    const comment = document.getElementById('send-rating-comment').value;

    const requestBody = JSON.stringify({ reportingUserId: userIdText, gameCardId: gameCardId, ratingUserId: ratingUserId, reason: reason, comment: comment });

    // Send the comment report
    fetch(reportApiUrl + '/send/comment', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: requestBody
    })
        .then(response => response.json().then(data => {
            requestDiv.innerText = 'Send comment report with game card ID ' + gameCardId + ' and rating user ID ' + ratingUserId;
            if (response.ok) {
                responseDiv.innerText = JSON.stringify(data, null, 2);
            } else {
                responseDiv.innerText = response.status + ' ' + data.message;
            }
        }))
        .catch(error => {
            console.error('Error sending comment report:', error);
        });
}
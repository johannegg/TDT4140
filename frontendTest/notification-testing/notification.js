// API endpoint core path to fetch from
const notificationApiUrl = 'http://localhost:8080/api/notification';

const requestDiv = document.getElementById('request-json');
const responseDiv = document.getElementById('response-json');

function getNotifications() {

    // Fetch the game card data
    fetch(notificationApiUrl + '/get/user/' + usernameText, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => response.json().then(data => {
            requestDiv.innerText = 'Get all notifications for user ' + usernameText;
            if (response.ok) {
                responseDiv.innerText = JSON.stringify(data, null, 2);
            } else {
                responseDiv.innerText = response.status + ' ' + data.message;
            }
        }))
        .catch(error => {
            console.error('Error getting notifications:', error);
        });
}

function sendNotification() {
    const receiver = document.getElementById('send-receiver').value;  
    const gameCardId = document.getElementById('send-gamecard-id').value;
    const comment = document.getElementById('send-comment').value;

    const requestBody = JSON.stringify({ sender: usernameText, receiver: receiver, gameCardId: gameCardId, comment: comment });

    // Send the game card report
    fetch(notificationApiUrl + '/send', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: requestBody
    })
        .then(response => response.json().then(data => {
            requestDiv.innerText = 'Send notification to ' + receiver + ' about game card ' + gameCardId;
            if (response.ok) {
                responseDiv.innerText = JSON.stringify(data, null, 2);
            } else {
                responseDiv.innerText = response.status + ' ' + data.message;
            }
        }))
        .catch(error => {
            console.error('Error sending notification:', error);
        });
}
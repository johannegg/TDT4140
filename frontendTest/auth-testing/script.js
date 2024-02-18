// API endpoint core path to fetch from
const apiUrl = 'http://localhost:8080/api/';
let token;

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch(apiUrl + 'auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })
        .then(response => response.json().then(data => {
            if (response.ok) {
                alert("Login successful!");
                token = data.accessToken;
            } else {
                alert(response.status + ' ' + data.message);
            }
        }))
        .catch(error => {
            console.error('Error logging in:', error);
        });
}

function signup() {
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    fetch(apiUrl + 'auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, email: email, password: password })
    })
        .then(response => response.json().then(data => {
            if (response.ok) {
                alert('Signup successful! Please login.');
            } else {
                alert(response.status + ' ' + data.message);
            }
        }))
        .catch(error => {
            console.error('Error signing up:', error);
        });
}

function viewToken() {
    const tokenDiv = document.getElementById('token-div');
    tokenDiv.innerText = token;
}

function logout() {
    token = null;
}

function fetchTestData(url, divID) {
    fetch(apiUrl + 'test/' + url, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => response.text().then(data => {
            if (response.ok) {
                document.getElementById(divID).innerText = data;
            } else {
                document.getElementById(divID).innerText = response.status + ' Error';
            }
        }))
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
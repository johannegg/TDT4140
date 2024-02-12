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
        .then(response => response.json())
        .then(data => {
            token = data.accessToken;
        })
        .catch(error => {
            console.error('Error logging in:', error);
            alert('Login failed. Please try again.');
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
    .then(response => response.json())
    .then(data => {
        alert('Signup successful! Please login.');
    })
    .catch(error => {
        console.error('Error signing up:', error);
        alert('Signup failed. Please try again.');
    });
}

function viewToken() {
    // Clear token and display login page again
    const tokenDiv = document.getElementById('token-div');
    tokenDiv.innerText = token;
}

function logout() {
    // Clear token and display login page again
    token = null;
}

function fetchTestData(url, divID) {
    // Fetch data from your endpoints using the token
    fetch(apiUrl + 'test/' + url, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => response.text())
        .then(data => {
            document.getElementById(divID).innerText = data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
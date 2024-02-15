// API endpoint core path to fetch from
const authApiUrl = 'http://localhost:8080/api/auth';
let token;
let usernameText;
let rolesText;

const rolesDiv = document.getElementById('roles-div');
const usernameDiv = document.getElementById('username-div');

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const requestBody = JSON.stringify({ username: username, password: password });

    // Fetch the token and roles upon successful login
    fetch(authApiUrl + '/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: requestBody
    })
        .then(response => response.json())
        .then(data => {
            token = data.accessToken;
            rolesText = data.roles.toString();
            usernameText = data.username;
            alert(data.username + ' logged in successfully!');
            rolesText = rolesText.replace(/,/g, ' ');
            rolesDiv.innerText = rolesText;
            usernameDiv.innerText = usernameText;
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
    const requestBody = JSON.stringify({ username: username, email: email, password: password });

    fetch(authApiUrl + '/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: requestBody
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error('Error signing up:', error);
            alert('Signup failed. Please try again.');
        });
}

function logout() {

    // Alert the user upon successful logout
    alert('Logged out successfully!');

    // Clear token and roles upon logout
    token = null;
    rolesText = null;
    usernameText = null;

    // Update displays
    rolesDiv.innerText = "No roles found.";
    usernameDiv.innerText = "Not logged in.";
}
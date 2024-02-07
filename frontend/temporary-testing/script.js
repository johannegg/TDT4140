document.addEventListener("DOMContentLoaded", function () {

    // API endpoint core path to fetch from
    const apiUrl = 'http://localhost:8080/api/';

    // Buttons to fetch the data
    const healthButton = document.getElementById('fetchHealthButton');
    const loginButton = document.getElementById('fetchLoginButton');

    // Div to display the response
    const responseDisplay = document.getElementById('responseDisplay');

    // Click event listeners to the buttons
    healthButton.addEventListener('click', () => fetchData('health'));
    loginButton.addEventListener('click', () => fetchData('login'));

    // Function to fetch the data from the API
    function fetchData(url) {

        // Example GET request
        fetch(apiUrl + url)
            .then(response => {

                // Check if the request was successful
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // Extract response body as text
                return response.text();
            })
            .then(data => {
                // Display the response in the div
                responseDisplay.innerText = data;
                console.log('Success:', data);
            })
            .catch(error => console.error('Error:', error));
    }
});
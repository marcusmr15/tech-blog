const LoginFormHandler = async (event) => {
    event.preventDefault();

    // Get the values of the email and password input fields
    const username = document.querySelector('#usernameLogin').value.trim();
    const password = document.querySelector('#passwordLogin').value.trim();

    // If the input fields have values
    if (username && password) {
        try {
            // Send a POST request to the login endpoint with the input values as JSON data
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            // Check if the response is successful
            if (response.ok) {
                // Redirect to the homepage after successful login
                document.location.replace('/');
            } else {
                // If the request was unsuccessful, display an error message
                const errorMessage = document.querySelector('#errorMessage');
                errorMessage.classList.remove('hide');
                // errorMessage.classList.add('show');
            }
        } catch (err) {
            console.error('Login failed:', err);
            alert('Failed to log in. Please try again later.');
        }
    } else {
        // If email or password is empty, display an alert
        alert('Please enter both username and password.');
    }
};

// Event listener for the login form
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('#loginButton');
    loginButton.addEventListener('click', LoginFormHandler);
});

// Function to handle click on "Sign up here!" button
const signupInsteadHandler = () => {
    // Redirect to the signup page
    document.location.replace('/signup');
};

const signupInstead = document.querySelector('#signup');
signupInstead.addEventListener('click', signupInsteadHandler)
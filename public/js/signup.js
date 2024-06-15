// Function to handle signup form submission
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
      try {
        const response = await fetch('/api/users/signup', {
          method: 'POST',
          body: JSON.stringify({ username, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/'); // Redirect to homepage after successful signup
        } else {
            const errorMessage = document.querySelector('#errorMessageSignup');
            errorMessage.classList.remove('hide');
            // errorMessage.classList.add('show');
        }
      } catch (err) {
        console.error('Error signing up:', err);
        alert('Failed to sign up.');
      }
    } else {
      alert('Please fill out all fields.');
    }
  };
  
  // Function to handle redirect to login page
  const redirectToLogin = () => {
    document.location.replace('/login');
  };
  
  // Event listeners
  document.querySelector('#signupBtn').addEventListener('click', signupFormHandler);
  document.querySelector('#loginIns').addEventListener('click', redirectToLogin);
  
// // Function to handle redirecting to the signup page
// const loginGreenBtn = () => {
//   document.location.replace('/login');
// };

// // Event listener for the login button
// const loginGreen = document.querySelector('#loginId');
// if (loginGreen) {
//   loginGreen.addEventListener('click', loginGreenBtn);
// }

// // Function to handle the display of login/logout buttons based on session status
// const updateLoginStatus = async () => {
//   try {
//     const response = await fetch('/api/users/check-session'); // Correct endpoint
//     if (response.ok) {
//       const data = await response.json();
//       const { logged_in } = data;

//       const loginBtn = document.querySelector('#loginId');
//       const logoutBtn = document.querySelector('#logoutId');

//       if (logged_in) {
//         if (loginBtn) loginBtn.classList.add('hideMain'); // Hide login button
//         if (logoutBtn) logoutBtn.classList.remove('hideMain'); // Show logout button
//       } else {
//         if (loginBtn) loginBtn.classList.remove('hideMain'); // Show login button
//         if (logoutBtn) logoutBtn.classList.add('hideMain'); // Hide logout button
//       }
//     } else {
//       throw new Error('Failed to check session status');
//     }
//   } catch (err) {
//     console.error('Error checking session status:', err.message);
//   }
// };

// // Event listener for document ready
// document.addEventListener('DOMContentLoaded', () => {
//   updateLoginStatus(); // Check and update login status when the page loads
// });

// // Event listener for the logout button
// const logoutBtn = document.querySelector('#logoutId');
// if (logoutBtn) {
//   logoutBtn.addEventListener('click', async () => {
//     try {
//       const response = await fetch('/api/users/logout', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//       });
//       if (response.ok) {
//         document.location.replace('/login'); // Redirect to login page after logout
//       } else {
//         throw new Error('Failed to logout');
//       }
//     } catch (err) {
//       console.error('Error logging out:', err.message);
//     }
//   });
// }

// // Variables to redirect to either homepage or dashboard views
// const redirectToHomepage = () => {
//   document.location.replace('/');
// };
// const redirectToDashboard = () => {
//   document.location.replace('/dashboard');
// };
// const redirectToNewPost = () => {
//   document.location.replace('/newPost');
// };
  
// // Event listeners for redirect functions
// document.querySelector('#homeId').addEventListener('click', redirectToHomepage);
// document.querySelector('#dashboardId').addEventListener('click', redirectToDashboard);
// document.querySelector('#newPostId').addEventListener('click', redirectToNewPost);


//! lksdjflksad
// Function to handle redirecting to the signup page
const loginGreenBtn = () => {
  document.location.replace('/login');
};

// Event listener for the login button
const loginGreen = document.querySelector('#loginId');
if (loginGreen) {
  loginGreen.addEventListener('click', loginGreenBtn);
}

// Function to handle the display of login/logout buttons based on session status
const updateLoginStatus = async () => {
  try {
    const response = await fetch('/api/users/check-session'); // Correct endpoint
    if (response.ok) {
      const data = await response.json();
      const { logged_in } = data;

      const loginBtn = document.querySelector('#loginId');
      const logoutBtn = document.querySelector('#logoutId');

      if (logged_in) {
        if (loginBtn) loginBtn.classList.add('hideMain'); // Hide login button
        if (logoutBtn) logoutBtn.classList.remove('hideMain'); // Show logout button
      } else {
        if (loginBtn) loginBtn.classList.remove('hideMain'); // Show login button
        if (logoutBtn) logoutBtn.classList.add('hideMain'); // Hide logout button
      }
    } else {
      throw new Error('Failed to check session status');
    }
  } catch (err) {
    console.error('Error checking session status:', err.message);
  }
};

// Event listener for document ready
document.addEventListener('DOMContentLoaded', () => {
  updateLoginStatus(); // Check and update login status when the page loads
  adjustContentPadding(); // Adjust the content padding when the page loads
});

// Function to adjust content padding based on header height
const adjustContentPadding = () => {
  const header = document.querySelector('header');
  const content = document.querySelector('.content');
  const headerHeight = header.offsetHeight;
  content.style.paddingTop = headerHeight + 'px';
};

// Adjust content padding on window resize
window.addEventListener('resize', adjustContentPadding);

// Event listener for the logout button
const logoutBtn = document.querySelector('#logoutId');
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/login'); // Redirect to login page after logout
      } else {
        throw new Error('Failed to logout');
      }
    } catch (err) {
      console.error('Error logging out:', err.message);
    }
  });
}

// Variables to redirect to either homepage or dashboard views
const redirectToHomepage = () => {
  document.location.replace('/');
};
const redirectToDashboard = () => {
  document.location.replace('/dashboard');
};
const redirectToNewPost = () => {
  document.location.replace('/newPost');
};

// Event listeners for redirect functions
document.querySelector('#homeId').addEventListener('click', redirectToHomepage);
document.querySelector('#dashboardId').addEventListener('click', redirectToDashboard);
document.querySelector('#newPostId').addEventListener('click', redirectToNewPost);

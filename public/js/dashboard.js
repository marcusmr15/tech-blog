// Variable to redirect to the editPost view
const redirectToEditPost = () => {
    document.location.replace('/editPost/:id');
  };

    
  // Event listeners for redirect functions
  document.querySelector('.userDashboards').addEventListener('click', redirectToEditPost);
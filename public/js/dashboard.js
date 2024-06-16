// Fetch and display posts for the logged-in user
const fetchPosts = async () => {
  try {
    const response = await fetch('/api/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const responseData = await response.json();

    if (!responseData || !responseData.posts || !Array.isArray(responseData.posts)) {
      throw new Error('Invalid response data format');
    }

    const posts = responseData.posts;

    const postsContainer = document.getElementById('postsContainer');
    if (!postsContainer) {
      throw new Error('postsContainer element not found');
    }

    postsContainer.innerHTML = '';

    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('userDashboards');
      postElement.dataset.id = post.id;

      postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p class="dateDashboard">${new Date(post.createdAt).toLocaleDateString()}</p>
      `;

      postsContainer.appendChild(postElement);
    });

  } catch (err) {
    console.error('Error fetching posts:', err.message);
  }
};

// Function to handle redirect to editPost page
const redirectToEditPost = (event) => {
  if (event.target.matches('.userDashboards')) {
    const postId = event.target.dataset.id;
    document.location.replace(`/editPost/${postId}`);
  }
};

// Event listener
document.querySelector('#postsContainer').addEventListener('click', redirectToEditPost);

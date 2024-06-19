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

    const posts = await response.json();

    console.log(posts); // Debug log

    if (!Array.isArray(posts)) {
      throw new Error('Invalid response data format');
    }

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

    // Toggle display of noPostsMessage based on posts length
    const noPostsMessage = document.getElementById('noPostsMessage');
    if (posts.length === 0) {
      noPostsMessage.classList.remove('hideNoPostsM');
    } else {
      noPostsMessage.classList.add('hideNoPostsM');
    }

  } catch (err) {
    console.error('Error fetching posts:', err.message);
  }
};

// Function to handle redirect to editPost page
const redirectToEditPost = (event) => {
  const postElement = event.target.closest('.userDashboards');
  if (postElement) {
    const postId = postElement.dataset.id;
    document.location.replace(`/editPost/${postId}`);
  }
};

// Event listener
document.querySelector('#postsContainer').addEventListener('click', redirectToEditPost);

// Call fetchPosts to load posts when the page loads
fetchPosts();

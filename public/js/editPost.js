document.addEventListener('DOMContentLoaded', async () => {
    try {
      const postId = window.location.pathname.split('/').pop(); // Get post ID from URL
      const response = await fetch(`/api/posts/${postId}`);
  
      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }
  
      const { id, title: initialTitle, content: initialContent } = await response.json();
  
      // Populate textareas with fetched post data
      document.querySelector('textarea[name="title"]').value = initialTitle;
      document.querySelector('textarea[name="content"]').value = initialContent;
  
      // Update button click handler
      document.getElementById('updateBtn').addEventListener('click', async () => {
        try {
          const newTitle = document.querySelector('textarea[name="title"]').value;
          const newContent = document.querySelector('textarea[name="content"]').value;
  
          // Check if changes were made
          if (newTitle === initialTitle && newContent === initialContent) {
            alert('No changes made!');
            return;
          }
  
          const updateResponse = await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: newTitle,
              content: newContent,
            }),
          });
  
          if (!updateResponse.ok) {
            throw new Error('Failed to update post');
          }
  
          // Redirect to dashboard or wherever appropriate
          window.location.replace('/dashboard');
        } catch (err) {
          console.error('Error updating post:', err.message);
          // Handle error (e.g., display error message)
        }
      });
  
      // Delete button click handler
      document.getElementById('deleteBtn').addEventListener('click', async () => {
        // Ask for confirmation before deleting
        const confirmed = confirm('Are you sure you want to delete this post?');
  
        if (confirmed) {
          try {
            const deleteResponse = await fetch(`/api/posts/${postId}`, {
              method: 'DELETE',
            });
  
            if (!deleteResponse.ok) {
              throw new Error('Failed to delete post');
            }
  
            // Redirect to dashboard or wherever appropriate after deletion
            window.location.replace('/dashboard');
          } catch (err) {
            console.error('Error deleting post:', err.message);
            // Handle error (e.g., display error message)
          }
        }
      });
  
      // Cancel button click handler
      document.getElementById('cancelBtn').addEventListener('click', () => {
        // Redirect to dashboard or wherever appropriate without making any changes
        window.location.replace('/dashboard');
      });
    } catch (err) {
      console.error('Error fetching post data:', err.message);
      // Handle error (e.g., display error message)
    }
  });
  
  
  
  
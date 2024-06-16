// Function to handle comment submission
const handleCommentSubmit = async () => {
    const commentText = document.querySelector('textarea').value.trim();
    const postId = document.querySelector('#postId').value; // Fetch postId from HTML

    try {
        if (commentText) {
            const response = await fetch(`/api/comments/${postId}`, {
                method: 'POST',
                body: JSON.stringify({ comment_text: commentText }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to add comment');
            }

            // Optionally handle success (e.g., redirect to post page)
            window.location.href = '/'; // Redirect to homepage
        } else {
            alert('Please enter a comment before submitting.'); // Alert if no comment text is entered
        }
    } catch (error) {
        console.error('Error adding comment:', error.message);
        alert('Failed to add comment. Please try again later.'); // Alert for general error
    }
};

// Function to handle cancel button click
const handleCancel = () => {
    // Display confirmation prompt
    const confirmCancel = confirm('Are you sure you want to cancel?');
    
    if (confirmCancel) {
        // Redirect to homepage
        window.location.href = '/';
    }
};

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#commentBtn').addEventListener('click', handleCommentSubmit);
    document.querySelector('#cancelBtn').addEventListener('click', handleCancel);
});

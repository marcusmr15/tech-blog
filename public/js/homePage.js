// Function to handle redirect to post comment view
const redirectToPostComment = (event) => {
    const postId = event.target.dataset.postid; // Retrieve postId from data attribute
    if (postId) {
        document.location.href = `/post/${postId}`;
    }
};

// Event listener
document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('addCommentBtn')) {
        redirectToPostComment(event);
    }
});

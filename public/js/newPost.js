// Function to handle form submission
const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Get form data
    const title = document.getElementById('postTitle').value.trim();
    const content = document.getElementById('postContent').value.trim();

    // Validate form data
    if (!title || !content) {
        alert(`Please fill in both 'Title' and 'Content' fields.`);
        return;
    }

    const formData = {
        title,
        content
    };

    try {
        // Make POST request to create a new post
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to create post');
        }

        // Redirect to dashboard or any other page after successful creation
        document.location.replace('/dashboard'); // Redirect to dashboard after post creation

    } catch (error) {
        console.error('Error creating post:', error.message);
        // Handle error, show alert, etc.
        alert('Failed to create post. Please try again.');
    }
};

// Event listener for form submission
document.getElementById('newPostForm').addEventListener('submit', handleFormSubmit);

// Function to handle cancel button click
const handleCancelClick = (event) => {
    event.preventDefault(); // Prevent form submission
    const confirmCancel = confirm('Are you sure you want to cancel? All entered data will be lost.');
    if (confirmCancel) {
        redirectToDashboardFromNP();
    }
};

// Function to redirect to dashboard
const redirectToDashboardFromNP = () => {
    document.location.replace('/dashboard');
};

// Event listener for cancel button
const cancelBtn = document.getElementById('cancelBtn');
if (cancelBtn) {
    cancelBtn.addEventListener('click', handleCancelClick);
}

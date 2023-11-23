let url = 'http://localhost:3030/jsonstore/messenger'

let messages = document.getElementById('messages');

let authorInput = document.querySelector('[name="author"]');
let messageInput = document.querySelector('[name="content"]');

function attachEvents() {
    let submitBtn = document.getElementById('submit');
    let refreshBtn = document.getElementById('refresh');

    submitBtn.addEventListener('click', submitComment);
    refreshBtn.addEventListener('click', refreshComments);
}

async function submitComment() {
    try {
        if (authorInput.value && messageInput.value) {
            let data = { 'author': authorInput.value, 'content': messageInput.value };
            let options = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }
            let response = await fetch(url, options);

            if (response.ok) {
                // Clear input fields after successful submission
                authorInput.value = '';
                messageInput.value = '';
                // Optionally, trigger a refresh of comments
                refreshComments();
            } else {
                // Handle unsuccessful submission
                console.error('Submission failed:', response.statusText);
            }
        }

    } catch (error) {
        console.error('Error submitting comment:', error);
    }
}

async function refreshComments() {
    messages.textContent = '';
    try {
        let response = await fetch(url);
        let result = await response.json();

        Object.values(result).forEach(x => {
            messages.textContent += `${x.author}: ${x.content}\n`;
        })
    } catch (error) {
        console.error('Error refreshing comments:', error);
    }
}

attachEvents();

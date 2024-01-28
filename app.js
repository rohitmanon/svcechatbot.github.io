function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message !== '') {
        appendUserMessage(message);
        // Replace 'your_botpress_webhook_url' with your actual Botpress webhook URL
        fetch('https://cors-anywhere.herokuapp.com/https://webhook.botpress.cloud/0588cceb-5aa3-4301-9b1e-70cc68496bb5', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        })
        .then(response => response.json())
        .then(data => {
            const botResponse = data.response; // Modify this based on your actual response structure
            appendBotMessage(botResponse);
        })
        .catch(error => console.error('Error:', error));

        messageInput.value = '';
    }
}

function appendUserMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'user-message';
    userMessageDiv.textContent = message;
    chatMessages.appendChild(userMessageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function appendBotMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const botMessageDiv = document.createElement('div');
    botMessageDiv.className = 'bot-message';
    botMessageDiv.textContent = message;
    chatMessages.appendChild(botMessageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

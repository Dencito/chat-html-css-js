const usernameInput = document.getElementById('username'),
    newMessageInput = document.getElementById('newMessage'),
    messagesContainer = document.getElementById('messages-container'),
    buttonSend = document.getElementById('button-send');
let websocket;

function validateAndToggleButton() {
    if (newMessageInput.value === "") {
        buttonSend.disabled = true;
    } else {
        buttonSend.disabled = false;
    }
}

newMessageInput.addEventListener("input", () => {
    validateAndToggleButton();
});

validateAndToggleButton();

const urlParams = new URLSearchParams(window.location.search);
let username = urlParams.get('username')
let token = urlParams.get('token')
if (username) {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
} {
    username = localStorage.getItem('username');
    token = localStorage.getItem('token');
}

function connectWebSocket() {
    websocket = new WebSocket(`ws://localhost:5555?user=${username}&token=${token}`);
    if (history.replaceState) {
        const newUrl = window.location.pathname;
        history.replaceState({}, document.title, newUrl);
    }
    websocket.onmessage = function (event) {
        console.log(event.data)
        const message = event.data.split("|")[1].split(":")[1]
        const date = event.data.split("|")[0]
        const time = date.split("-")[3]
        const userSend = event.data.split("|")[1].split(":")[0].trim()
        console.log(userSend)
        console.log(username)
        if (userSend == username) {
            messagesContainer.innerHTML += `<div class="myMessage message">
        <span class="message-p">${message} <span>${time}</span></span>
        
    </div>`
        } else {
            messagesContainer.innerHTML += `<div class="otherMessage message">
        <span class="username">${userSend} dice:</span>
        <span class="message-p">${message} <span>${time}</span></span>
        
    </div>`
        }

    };
}

function sendMessage() {
    const newMessage = newMessageInput.value;

    if (!newMessage) {
        buttonSend.disabled = true;
        return;
    }

    const formattedMessage = ` ${newMessage}`;
    websocket.send(formattedMessage);
    newMessageInput.value = '';
}

newMessageInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});


function getCurrentTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

connectWebSocket();
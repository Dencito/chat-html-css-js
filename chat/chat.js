const usernameInput = document.getElementById('username');
const newMessageInput = document.getElementById('newMessage');
const messagesContainer = document.getElementById('messages-container');
let websocket;

const urlParams = new URLSearchParams(window.location.search);
let username = urlParams.get('username')
if (username) {
    localStorage.setItem('username', username);
} {
    username = localStorage.getItem('username');
}

console.log(username)

function connectWebSocket() {
    //const username = usernameInput.value;
    websocket = new WebSocket(`ws://localhost:5555?username=${username}`);
    if (history.replaceState) {
        const newUrl = window.location.pathname;
        history.replaceState({}, document.title, newUrl);
    }
    websocket.onmessage = function (event) {
        const message = event.data.split("|")[1].split(":")[1]
        const date = event.data.split("|")[0]
        const time = event.data.split("|")[0].split("-")[3]
        const userSend = event.data.split("|")[1].split(":")[0].trim()
        console.log(userSend)
        console.log(username)
        if(userSend == username) {
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
    //const username = usernameInput.value;
    const newMessage = newMessageInput.value;

    if (!username || !newMessage) {
        alert('Please enter a username and message');
        return;
    }

    const formattedMessage = `${username}: ${newMessage}`;
    websocket.send(formattedMessage);
    newMessageInput.value = '';
}

function getCurrentTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

connectWebSocket();
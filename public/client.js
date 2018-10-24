// Make connection
const socket = io.connect('http://localhost:4000');

// Query DOM
function element(id) {
    return document.getElementById(id);
}

const status = element('status');
const messages = element('messages');
const textarea = element('textarea');
const username = element('username');
const clearBtn = element('clear');

// emit chat message
textarea.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
        socket.emit('input', {
            message: textarea.value,
            username: username.value
        });
        event.preventDefault();
    }
});

// emit keypress event
textarea.addEventListener('keypress', () => {
    socket.emit('typing', username.value);
})

// listen for chat event
socket.on('output', (data) => {
    const msgText = `<div class="username"> ${data.username}: </div><div class="message">${data.message}</div> `
    messages.innerHTML += msgText
    messages.classList.add('message-block');
    element('message-container').appendChild(messages);
    textarea.value = '';
    status.innerText = '';
})

// listen for typing event
socket.on('typing', (data) => {
    status.innerText =  data + ' is typing a message...'
})
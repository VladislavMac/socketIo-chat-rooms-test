const chatForm    = document.querySelector('#chat-form');
const inputMsg    = document.querySelector('#msg');
const socket = io();

socket.on('message', msg => writeMessage(msg))
inputMsg.addEventListener('input', writeStatus)
chatForm.addEventListener('submit', (event) => sendMessageToServer(event) )

function sendMessageToServer(event){
    event.preventDefault()
    // get message text
    this.msg = event.target.elements.msg.value;
    // emmit message to server
    socket.emit('chatMessage', this.msg)
    
    event.target.elements.msg.value = '';
}

function getItemMessage(name, data, text){
    this.item           = document.createElement('div');
    this.item.className = 'message';
    this.item.innerHTML = (
        `
            <p class="meta">${name} <span>${data}</span></p>
            <p class="text">
                ${text}
            </p>
        `
    );
    
    return this.item
}

function getTimeNow(){
    this.date = new Date()
    this.hour = this.date.getHours();
    this.min  = this.date.getMinutes();

    if( this.hour < 10 ){
        return `0${this.hour}:${this.min}`
    }
    return `${this.hour}:${this.min}`
}

// Message to DOM
function writeMessage(message){
    // get message div
    this.messageItem = getItemMessage('Me', getTimeNow(), message);
    
    // append new div in all messages
    this.messagesDiv = document.querySelector('.chat-messages')
    this.messagesDiv.appendChild(this.messageItem)
}

function writeStatus(){
    console.log('....')    
}
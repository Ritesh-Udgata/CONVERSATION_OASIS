// Connect to the server using Socket.IO
const socket = io('http://localhost:8000');

// Get DOM elements in respective JS variables
const form = document.getElementById('send-container'); // Form element
const messageInput = document.getElementById('messageInp') // Input field for messages
const messageContainer = document.querySelector(".container") // Container for displaying messages

// Audio that will play on receiving messages
var audio = new Audio('mixkit-sci-fi-click-900.wav');

// Function to append a message to the container
const append = (message, position) => {
    const messageElement = document.createElement('div');

    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);

    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play(); // Play audio for incoming messages
    }
}

// Ask the new user for their name and inform the server
const name = prompt(" Throw in Your Name to Join the Crew! ");
socket.emit('new-user-joined', name);
append(`Glad you're here  ${name.toUpperCase()}  :)`, 'right');

// If a new user joins, receive their name from the server
socket.on('user-joined', name => {
    append(`${name} hopped into the server`, 'right') // Display a message when a user joins
})

// If the server sends a message, receive and display it
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left') // Display received messages
})

// If a user leaves the chat, append the info to the container
socket.on('left', name => {
    append(`${name} left the chat`, 'right') // Display a message when a user leaves
})

// If the form gets submitted, send the message to the server
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right'); // Display the user's own message
    socket.emit('send', message); // Send the message to the server
    messageInput.value = ''
})

//BONUS :)
document.addEventListener("DOMContentLoaded", function () {
    const follower = document.querySelector(".follower");

    document.addEventListener("mousemove", function (e) {
        const x = e.clientX-7;
        const y = e.clientY-150;

        follower.style.transform = `translate(${x}px, ${y}px)`;
    });
});

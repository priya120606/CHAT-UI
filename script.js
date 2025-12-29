const input = document.querySelector('.input-box input');
const button = document.querySelector('.input-box button');
const messages = document.querySelector('.messages');
const contacts = document.querySelectorAll('.sidebar li');
const chatHeader = document.querySelector('.chat-header h3');
const status = document.querySelector('.chat-header span');

// Preloaded messages
const chatData = {
  "Alice": [
    {type: "received", text: "Hi there! 👋"},
    {type: "sent", text: "Hello! How are you?"}
  ],
  "Bob": [
    {type: "received", text: "Hey! Are you coming to the meeting?"},
    {type: "sent", text: "Yes, I’ll be there in 10 mins."},
    {type: "received", text: "Great! See you soon."}
  ],
  "Charlie": [
    {type: "received", text: "Good morning! 🌞"},
    {type: "sent", text: "Morning! How’s your day going?"},
    {type: "received", text: "Pretty good, thanks! You?"}
  ]
};

// Load messages for a contact
function loadMessages(contactName) {
  messages.innerHTML = '';
  chatHeader.textContent = contactName;
  status.textContent = "Online";

  chatData[contactName].forEach(msg => {
    const div = document.createElement('div');
    div.classList.add('message', msg.type);
    div.textContent = msg.text;
    messages.appendChild(div);
  });

  messages.scrollTop = messages.scrollHeight;
}

// Initial load (Alice)
loadMessages('Alice');

// Click to switch contacts
contacts.forEach(contactEl => {
  contactEl.addEventListener('click', () => {
    // Remove active class
    contacts.forEach(c => c.classList.remove('active'));
    contactEl.classList.add('active');

    const contactName = contactEl.dataset.name; // use data-name
    loadMessages(contactName);
  });
});

// Send message
button.addEventListener('click', () => {
  const text = input.value.trim();
  if(text !== '') {
    const msg = document.createElement('div');
    msg.classList.add('message', 'sent');
    msg.textContent = text;
    messages.appendChild(msg);

    // Add to current contact's data
    const currentContact = chatHeader.textContent;
    chatData[currentContact].push({type: 'sent', text: text});

    input.value = '';
    messages.scrollTop = messages.scrollHeight;
  }
});

input.addEventListener('keypress', (e) => {
  if(e.key === 'Enter') button.click();
});


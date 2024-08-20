import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";

// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");
if (formSendData) {
  formSendData.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value;

    if (content) {
      socket.emit("CLIENT_SEND_MESSAGE", content);
      e.target.elements.content.value = "";
    }
  });
}

// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const myId = document.querySelector("[my-id]").getAttribute("my-id");
  const body = document.querySelector(".chat .inner-body");

  const div = document.createElement("div");

  let htmlFullName = "";

  if (myId == data.userId) {
    div.classList.add("inner-outgoing");
  } else {
    div.classList.add("inner-incoming");
    htmlFullName = `<div class="inner-name">${data.fullName}</div>`;
  }

  div.innerHTML = `
    ${htmlFullName}
    <div class="inner-content">${data.content}</div>
    `;

  body.appendChild(div);

  body.scrollTop = body.scrollHeight;
});

// Scroll chat to bottom
const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
  bodyChat.scrollTop = bodyChat.scrollHeight;
}
// End Scroll chat to bottom

// Emoji picker

// Show Popup
const buttonIcon = document.querySelector(".button-icon");
const tooltip = document.querySelector(".tooltip");

if (buttonIcon && tooltip) {
  Popper.createPopper(buttonIcon, tooltip);

  buttonIcon.onclick = () => {
    tooltip.classList.toggle("shown");
  };

  // Close the tooltip when clicking outside
  document.addEventListener("click", (event) => {
    if (!buttonIcon.contains(event.target) && !tooltip.contains(event.target)) {
      tooltip.classList.remove("shown");
    }
  });
}

// Insert Emoji into Input
const emojiPicker = document.querySelector("emoji-picker");
const inputChat = document.querySelector(".chat .inner-form input[name='content']");

if (emojiPicker && inputChat) {
  emojiPicker.addEventListener("emoji-click", (event) => {
    const icon = event.detail.unicode;
    inputChat.value += icon;
  });
}
// End emoji picker

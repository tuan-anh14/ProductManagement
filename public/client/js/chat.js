import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";

// File Upload With Preview
const upload = new FileUploadWithPreview.FileUploadWithPreview("upload-image", {
  multiple: true,
  maxFileCount: 6,
});

// End File Upload With Preview

// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");
if (formSendData) {
  formSendData.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value;
    const images = upload.cachedFileArray || [];

    console.log(images)

    if (content || images.length > 0) {
      // Gửi content hoặc ảnh lên server
      socket.emit("CLIENT_SEND_MESSAGE", content);
      e.target.elements.content.value = "";
      socket.emit("CLIENT_SEND_TYPING", "hidden");
    }
  });
}

// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const myId = document.querySelector("[my-id]").getAttribute("my-id");
  const body = document.querySelector(".chat .inner-body");
  const boxTyping = document.querySelector(".inner-list-typing");

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

  body.insertBefore(div, boxTyping);

  body.scrollTop = body.scrollHeight;
});

// Scroll chat to bottom
const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
  bodyChat.scrollTop = bodyChat.scrollHeight;
}
// End Scroll chat to bottom

// Show typing
var timeOut;
const showTyping = () => {
  socket.emit("CLIENT_SEND_TYPING", "show");

  clearTimeout(timeOut);

  timeOut = setTimeout(() => {
    socket.emit("CLIENT_SEND_TYPING", "hidden");
  }, 3000);
};

// End show typing

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
const inputChat = document.querySelector(
  ".chat .inner-form input[name='content']"
);

if (emojiPicker && inputChat) {
  emojiPicker.addEventListener("emoji-click", (event) => {
    const icon = event.detail.unicode;
    inputChat.value += icon;

    const end = inputChat.value.length;
    inputChat.setSelectionRange(end, end);
    inputChat.focus();

    showTyping();
  });

  inputChat.addEventListener("keyup", () => {
    showTyping();
  });
}
// End emoji picker

// SERVER_RETURN_TYPING
const elementListTyping = document.querySelector(".chat .inner-list-typing");
if (elementListTyping) {
  socket.on("SERVER_RETURN_TYPING", (data) => {
    if (data.type == "show") {
      const exitsTyping = elementListTyping.querySelector(
        `[user-id="${data.userId}"]`
      );

      if (!exitsTyping) {
        const boxTyping = document.createElement("div");
        const bodyChat = document.querySelector(".chat .inner-body");
        boxTyping.classList.add("box-typing");
        boxTyping.setAttribute("user-id", data.userId);

        boxTyping.innerHTML = `
            <div class="inner-name">${data.fullName}</div>
            <div class="inner-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          `;
        elementListTyping.appendChild(boxTyping);
        bodyChat.scrollTop = bodyChat.scrollHeight;
      }
    } else {
      const boxTypingRemove = elementListTyping.querySelector(
        `[user-id="${data.userId}"]`
      );
      if (boxTypingRemove) {
        elementListTyping.removeChild(boxTypingRemove);
      }
    }
  });
}

// END SERVER_RETURN_TYPING

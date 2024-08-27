// Chức năng gửi yêu cầu
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if (listBtnAddFriend.length > 0) {
  listBtnAddFriend.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("add");

      const userId = button.getAttribute("btn-add-friend");
      console.log(userId);

      socket.emit("CLIENT_ADD_FRIEND", userId)
    });
  });
}
// Hết Chức năng gửi yêu cầu

// Chức năng huỷ yêu cầu
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if (listBtnCancelFriend.length > 0) {
  listBtnCancelFriend.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.remove("add");

      const userId = button.getAttribute("btn-cancel-friend");
      console.log(userId);

      socket.emit("CLIENT_CANCEL_FRIEND", userId)
    });
  });
}
// Hết Chức năng huỷ yêu cầu
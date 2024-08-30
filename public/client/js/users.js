// Chức năng gửi yêu cầu
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if (listBtnAddFriend.length > 0) {
  listBtnAddFriend.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("add");

      const userId = button.getAttribute("btn-add-friend");
      // console.log(userId);

      socket.emit("CLIENT_ADD_FRIEND", userId);
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
      // console.log(userId);

      socket.emit("CLIENT_CANCEL_FRIEND", userId);
    });
  });
}
// Hết Chức năng huỷ yêu cầu

// Chức năng từ chối kết bạn
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if (listBtnRefuseFriend.length > 0) {
  listBtnRefuseFriend.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("refuse");

      const userId = button.getAttribute("btn-refuse-friend");
      // console.log(userId);

      socket.emit("CLIENT_REFUSE_FRIEND", userId);
    });
  });
}
// Hết Chức năng từ chối kết bạn

// Chức năng chấp nhận kết bạn
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if (listBtnAcceptFriend.length > 0) {
  listBtnAcceptFriend.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("accepted");

      const userId = button.getAttribute("btn-accept-friend");
      // console.log(userId);

      socket.emit("CLIENT_ACCEPT_FRIEND", userId);
    });
  });
}
// Hết Chức năng chấp nhận kết bạn

// SERVER_RETURN_LENGTH_ACCEPT_FRIEND
socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
  const badgeUsersAccept = document.querySelector("[badge-users-accept]");
  const userId = badgeUsersAccept.getAttribute("badge-users-accept");

  if (userId == data.userId) {
    badgeUsersAccept.innerHTML = data.lengthAcceptFriends;
  }
});

// END SERVER_RETURN_LENGTH_ACCEPT_FRIEND

// SERVER_RETURN_INFO_ACCEPT_FRIEND

socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND", (data) => {
  // Trang lời mời kết bạn
  const dataUsersAccept = document.querySelector("[data-users-accept]");
  if (dataUsersAccept) {
    const userId = dataUsersAccept.getAttribute("data-users-accept");

    if (userId == data.userId) {
      // Vẽ user ra giao diện
      const newBoxUser = document.createElement("div");
      newBoxUser.classList.add("col-6");
      newBoxUser.setAttribute("user-id", data.infoUserA._id);

      newBoxUser.innerHTML = `
        <div class="box-user">
            <div class="inner-avatar">
              <img src="/client/images/avatar.jpg" alt="${data.infoUserA.fullName}">
            </div>
            <div class="inner-info">
              <div class="inner-name">${data.infoUserA.fullName}</div>
              <div class="inner-buttons">
                <button 
                  class="btn btn-sm btn-primary mr-1" 
                  btn-accept-friend="${data.infoUserA._id}">
                    Chấp nhận
                </button>
                <button 
                  class="btn btn-sm btn-secondary mr-1" 
                  btn-refuse-friend="${data.infoUserA._id}">
                    Xoá
                </button>
                <button 
                  class="btn btn-sm btn-secondary mr-1" 
                  btn-deleted-friend="${data.infoUserA._id}" disabled="">
                    Đã xoá
                </button>
                <button 
                  class="btn btn-sm btn-primary mr-1" 
                  btn-accepted-friend="${data.infoUserA._id}" disabled="">
                    Đã chấp nhận
                </button>
              </div>
            </div>
          </div>
      `;

      dataUsersAccept.appendChild(newBoxUser);
      // Hết vẽ user ra giao diện

      // Xoá lời mời kết bạn
      const btnRefuseFriend = newBoxUser.querySelector("[btn-refuse-friend]");
      btnRefuseFriend.addEventListener("click", () => {
        btnRefuseFriend.closest(".box-user").classList.add("refuse");

        const userId = btnRefuseFriend.getAttribute("btn-refuse-friend");

        socket.emit("CLIENT_REFUSE_FRIEND", userId);
      });
      // Hết Xoá lời mời kết bạn

      // Chấp nhận lời mời kết bạn
      const btnAcceptFriend = newBoxUser.querySelector("[btn-accept-friend]");
      btnAcceptFriend.addEventListener("click", () => {
        btnAcceptFriend.closest(".box-user").classList.add("accepted");

        const userId = btnAcceptFriend.getAttribute("btn-accept-friend");

        socket.emit("CLIENT_ACCEPT_FRIEND", userId);
      });
      // Hết Chấp nhận lời mời kết bạn
    }
  }
  // Hết trang lời mời kết bạn

  // Trang danh sách người dùng
  const dataUsersNotFriend = document.querySelector("[data-users-not-friend]");
  if (dataUsersNotFriend) {
    const userId = dataUsersNotFriend.getAttribute("data-users-not-friend");

    if (userId == data.userId) {
      // Xoá A khỏi danh sách của B
      const boxUserRemove = dataUsersNotFriend.querySelector(
        `[user-id="${data.infoUserA._id}"]`
      );
      if (boxUserRemove) {
        dataUsersNotFriend.removeChild(boxUserRemove);
      }
    }
  }

  // Hết trang danh sách người dùng
});

// END SERVER_RETURN_INFO_ACCEPT_FRIEND

// SERVER_RETURN_ID_CANCEL_FRIEND
socket.on("SERVER_RETURN_ID_CANCEL_FRIEND", (data) => {
  const dataUsersAccept = document.querySelector("[data-users-accept]");
  const userId = dataUsersAccept.getAttribute("data-users-accept");

  if (userId == data.userId) {
    // Xoá A khỏi danh sách của B
    const boxUserRemove = dataUsersAccept.querySelector(
      `[user-id="${data.userIdA}"]`
    );
    if (boxUserRemove) {
      dataUsersAccept.removeChild(boxUserRemove);
    }
  }
});

// END SERVER_RETURN_ID_CANCEL_FRIEND

// SERVER_RETURN_USER_ONLINE
socket.on("SERVER_RETURN_USER_ONLINE", (userId) => {
  const dataUsersFriend = document.querySelector("[data-users-friend]");
  if (dataUsersFriend) {
    const boxUser = dataUsersFriend.querySelector(`[user-id="${userId}"]`);
    if (boxUser) {
      boxUser.querySelector("[status]").setAttribute("status", "online");
    }
  }
});

// END SERVER_RETURN_USER_ONLINE

// SERVER_RETURN_USER_OFFLINE
socket.on("SERVER_RETURN_USER_OFFLINE", (userId) => {
  const dataUsersFriend = document.querySelector("[data-users-friend]");
  if (dataUsersFriend) {
    const boxUser = dataUsersFriend.querySelector(`[user-id="${userId}"]`);
    if (boxUser) {
      boxUser.querySelector("[status]").setAttribute("status", "offline");
    }
  }
});

// END SERVER_RETURN_USER_OFFLINE

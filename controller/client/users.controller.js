const User = require("../../model/user.model");

const usersSocket = require("../../sockets/client/users.socket");

// [GET] /users/notFriend
module.exports.notFriend = async (req, res) => {
  // Socket
  usersSocket(res);
  // End Socket

  const userId = res.locals.user.id;
  const myUser = await User.findOne({
    _id: userId,
  });

  const requestFriends = myUser.requestFriends;
  const acceptFriends = myUser.acceptFriends;
  console.log(requestFriends);

  const users = await User.find({
    $and: [
      {
        _id: { $ne: userId },
      },
      {
        _id: { $nin: requestFriends },
      },
      {
        _id: { $nin: acceptFriends },
      },
    ],
    status: "active",
    deleted: false,
  }).select("avatar fullName");

  // console.log(users);

  res.render("client/pages/users/not-friend", {
    pageTitle: "Danh sách người dùng",
    users: users,
  });
};

// [GET] /users/request
module.exports.request = async (req, res) => {
  // Socket
  usersSocket(res);
  // End Socket

  const userId = res.locals.user.id;

  const myUser = await User.findOne({
    _id: userId,
  });

  const requestFriends = myUser.requestFriends;

  const users = await User.find({
    _id: { $in: requestFriends },
    status: "active",
    deleted: false,
  }).select("id avatar fullName");

  // console.log(users);

  res.render("client/pages/users/request", {
    pageTitle: "Lời mời đã gửi",
    users: users,
  });
};

const express = require("express");
const userMiddleware = require("../middlewares/userMiddleware");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const UserRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName gender";

UserRouter.get("/user/requests", userMiddleware, async (req, res) => {
  try {
    const requests = await ConnectionRequest.find({
      receiver: req.user._id,
      status: "interested"
    }).populate("sender", USER_SAFE_DATA);

    res.status(200).json({ message: "Success fully fetched", data: requests });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

UserRouter.get("/user/connections", userMiddleware, async (req, res) => {
  try {
    const loginUser = req.user;

    const connections = await ConnectionRequest.find({
      $or: [
        { sender: loginUser._id, status: "accepted" },
        { receiver: loginUser._id, status: "accepted" }
      ]
    })
      .populate("sender", USER_SAFE_DATA)
      .populate("receiver", USER_SAFE_DATA);

    const data = connections?.map((request) => {
      if (request.sender._id.toString() === loginUser._id.toString()) {
        return request.receiver;
      }
      return request.sender;
    });

    res.status(200).json({ message: "Success fully fetched", data });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

UserRouter.get("/user/feed", userMiddleware, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const myConnections = await ConnectionRequest.find({
      $or: [{ sender: loggedInUser._id }, { receiver: loggedInUser._id }]
    });

    const uniqueUserIds = new Set();

    myConnections.forEach((data) => {
      uniqueUserIds.add(data.sender);
      uniqueUserIds.add(data.receiver);
    });

    uniqueUserIds.add(loggedInUser._id);

    const hiddenUsers = Array.from(uniqueUserIds);

    const feed = await User.find({
      _id: { $nin: hiddenUsers }
    }).select("_id firstName lastName email gender profileURL skills");

    res.status(200).json({ message: "successful fetched!", data: feed });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = UserRouter;

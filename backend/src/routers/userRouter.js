const express = require("express");
const userMiddleware = require("../middlewares/userMiddleware");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const UserRouter = express.Router();

const USER_SAFE_DATA =
  "firstName lastName gender experience profileURL about skills updatedAt";

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    // Swap arr[i] with arr[j]
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

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

UserRouter.get("/user/outgoing_request", userMiddleware, async (req, res) => {
  try {
    const requests = await ConnectionRequest.find({
      sender: req.user._id,
      status: "interested"
    }).populate("receiver", USER_SAFE_DATA);

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

    res.status(200).json({ message: "Success fully fetched", data, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

UserRouter.get("/user/feed", userMiddleware, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const pageNumber = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 0;
    const skipNum = (pageNumber - 1) * limit;

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
    })
      .select("_id firstName lastName email gender profileURL skills")
      .skip(skipNum)
      .limit(limit);

    const randomizedArray = shuffleArray(feed);

    res
      .status(200)
      .json({ message: "successful fetched!", data: randomizedArray });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = UserRouter;

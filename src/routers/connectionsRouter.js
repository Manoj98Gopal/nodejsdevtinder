const express = require("express");
const userMiddleware = require("../middlewares/userMiddleware");
const mongoose = require("mongoose");
const User = require("../models/user");
const connectionRequest = require("../models/connectionRequest");

const ConnectionRouter = express.Router();

ConnectionRouter.post(
  "/request/send/:status/:receiverId",
  userMiddleware,
  async (req, res) => {
    try {
      const { status, receiverId } = req.params;

      if (!["ignored", "interested"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      if (!mongoose.Types.ObjectId.isValid(receiverId)) {
        return res.status(400).json({ message: "Invalid receiverId" });
      }

      const receiverData = await User.findById(receiverId).lean();

      if (!receiverData) {
        return res.status(404).json({ message: "Receiver not found" });
      }

      const senderId = req.user.id;

      if (senderId === receiverId) {
        return res
          .status(400)
          .json({ message: "Cannot send request to yourself" });
      }

      const existingRequest = await connectionRequest
        .findOne({
          $or: [
            { sender: senderId, receiver: receiverId },
            { sender: receiverId, receiver: senderId }
          ]
        })
        .lean();

      if (existingRequest) {
        return res
          .status(400)
          .json({ message: "Connection request already exists" });
      }

      const newRequest = new connectionRequest({
        sender: senderId,
        receiver: receiverId,
        status
      });

      await newRequest.save();

      res
        .status(200)
        .json({
          message: `${req.user.firstName} sent a connection request to ${receiverData.firstName}`
        });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

module.exports = ConnectionRouter;

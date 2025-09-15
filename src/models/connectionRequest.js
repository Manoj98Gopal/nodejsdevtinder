const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const connectionRequestSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, required: true },
    receiver: { type: Schema.Types.ObjectId, required: true },
    status: {
      type: String,
      enum: ["interested", "ignored", "accepted", "rejected"],
      required: true
    }
  },
  { timestamps: true }
);

connectionRequestSchema.index({ sender: 1, receiver: 1 });

module.exports = model("ConnectionRequest", connectionRequestSchema);

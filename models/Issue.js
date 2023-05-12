const mongoose = require("mongoose");

const issueSchema = mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    labels: [
      {
        type: String,
        enum: [
          "BUG",
          "UI IMPROVEMENT",
          "DOCUMENTATION",
          "ENHANCEMENT",
          "DUPLICATE",
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;

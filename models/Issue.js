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

// create indexing to search efficiently for title and description of issue
issueSchema.index({ title: "text", desc: "text" });
const Issue = mongoose.model("Issue", issueSchema);
module.exports = Issue;

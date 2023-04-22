import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    file: {
      type: String,
    },

    detail: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("FeedbackForm", feedbackSchema);

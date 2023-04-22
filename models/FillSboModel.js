import mongoose from "mongoose";

const fillSboSchema = new mongoose.Schema(
  {
    staffID: String,
    staffDepartment: String,
    staffName: String,
    plantLocation: String,

    visitor: {
      type: Boolean,
      default: false,
    },

    category: {
      type: String,
    },

    subCategory: {
      type: String,
    },

    departmentResponsible: {
      type: String,
    },

    headOfDepartment: {
      type: String,
    },

    videoURL: {
      type: String,
    },

    imageURL: {
      type: String,
    },

    audioURL: {
      type: String,
    },

    plantLocation: {
      type: String,
    },

    safeWorkPractice: {
      type: String,
    },

    title: {
      type: String,
    },

    details: {
      type: String,
    },

    recommendation: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SboForm", fillSboSchema);

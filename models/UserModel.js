import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      require: true,
      unique: true,
    },

    staffID: {
      type: Number,
      require: true,
      unique: true,
    },

    photo: String,

    contact: {
      type: String,
    },

    password: {
      type: String,
      require: [true, "please input your password"],
    },

    passwordConfirm: {
      type: String,
      require: [true, "please retype your password"],
    },

    plantLocation: {
      type: String,
      // require: true,
    },

    department: {
      type: String,
      // require: true,
    },

    role: {
      type: String,
      // require: true,
    },

    company: {
      type: String,
    },
  },
  { timestamps: true }
);

//stop password confirm from being saved
userSchema.pre("save", async function (next) {
  this.passwordConfirm = undefined;
  next();
});

export default mongoose.model("User", userSchema);

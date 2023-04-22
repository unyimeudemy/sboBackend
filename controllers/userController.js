import FeedbackModel from "../models/FeedbackModel.js";
import User from "../models/UserModel.js";

export const currentUserProfile = async (req, res, next) => {
  try {
    const { name, email, staffID, createdAt } = req.user;
    res.status(200).json({
      data: {
        name,
        email,
        staffID,
        createdAt,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
  next();
};

export const getStaffBySearch = async (req, res, next) => {
  try {
    let staff;
    const search = req.query.search;
    const check = +search + 0;

    if (check === +search) {
      console.log("searching by staffID ...");
      staff = await User.find({ staffID: search });
    } else {
      console.log("searching by staff's name ...");
      staff = await User.find({ name: search });
    }

    res.status(200).json({
      status: "success",
      length: staff.length,
      data: staff,
    });
  } catch (error) {
    console.log(error.message);
  }
  next();
};

export const getAllStaff = async (req, res, next) => {
  try {
    const query = req.query.q;
    const queryBolean = typeof +req.query.q;
    // console.log(/^[a-zA-Z]+$/.test(query));
    let allStaff;
    if (/^[a-zA-Z]+$/.test(query)) {
      allStaff = await User.find({
        name: { $regex: query, $options: "imxs" },
      });
    } else {
      allStaff = await User.find({
        staffID: query,
      });
    }

    res.status(200).json({
      status: "success",
      length: allStaff.length,
      data: allStaff,
    });
  } catch (error) {
    console.log(error);
  }

  next();
};

export const feedback = async (req, res, next) => {
  try {
    // const newSbo = new SboForm({ ...req.body, visitor: true });
    // await newSbo.save();

    const newFeedback = new FeedbackModel({ ...req.body });
    const feedback = await newFeedback.save();

    res.status(200).json({
      status: "success",
      data: feedback,
    });
  } catch (error) {
    console.log(errror.message);
  }
  next();
};

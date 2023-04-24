import SboForm from "../models/FillSboModel.js";
import User from "../models/UserModel.js";
import dateFormat, { masks } from "dateformat";

// import User from "../models/UserModel.js";

export const fillSboStaff = async (req, res, next) => {
  try {
    const newSbo = new SboForm({
      ...req.body,
      staffID: req.user.staffID,
      staffDepartment: req.user.department,
      staffName: req.user.name,
    });
    await newSbo.save();

    res.status(200).json({
      status: "success",
      data: newSbo,
    });
  } catch (error) {
    console.log(errror.message);
  }
  next();
};

export const fillSboVisitor = async (req, res, next) => {
  try {
    const newSbo = new SboForm({ ...req.body, visitor: true });
    await newSbo.save();

    res.status(200).json({
      status: "success",
      data: newSbo,
    });
  } catch (error) {
    console.log(error.message);
  }

  next();
};

export const getAllMySBO = async (req, res, next) => {
  try {
    const currentUserID = req.user.staffID;
    const mySBOs = await SboForm.find({ staffID: currentUserID });

    res.status(200).json({
      status: "success",
      length: mySBOs.length,
      data: mySBOs,
    });
  } catch (error) {
    console.log(error.message);
  }

  next();
};

export const getAllSBO = async (req, res, next) => {
  try {
    //getting individual date from query
    if (req.query.time !== undefined) {
      console.log("with time ");
      const reqQueryCopied = { ...req.query };
      delete reqQueryCopied.time;

      const dates = req.query.time;

      const dateRangeArr = dates.split("/");
      // const dateRangeArr = req.query.time.split("/");
      const startDateArr = dateRangeArr[0].split("-");
      const endDateArr = dateRangeArr[1].split("-");

      //getting each date string
      const startDateStr = `${startDateArr[0]} ${startDateArr[1]} ${startDateArr[2]}`;
      const endDateStr = `${endDateArr[0]} ${+endDateArr[1] + 1} ${
        endDateArr[2]
      }`;

      //converting to isodate format
      const startDateISOFormat = dateFormat(startDateStr, "isoDateTime");
      const endDateISOFormat = dateFormat(endDateStr, "isoDateTime");

      //getting all SBOs in specified time range
      const allSBOs = await SboForm.find({
        createdAt: {
          $gte: startDateISOFormat,
          $lte: endDateISOFormat,
        },
      }).find(reqQueryCopied);

      res.status(200).json({
        status: "success",
        length: allSBOs.length,
        data: allSBOs,
      });
      next();
    } else {
      const allSBOs = await SboForm.find(req.query);

      res.status(200).json({
        status: "success",
        length: allSBOs.length,
        data: allSBOs,
      });

      next();
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const restrictTo = async (req, res, next) => {
  try {
    const permitedRoles = ["HSE manager", "HSE supervisor", "HSE officer"];
    if (!permitedRoles.includes(req.user.role)) {
      res.status(403).json({
        status: "fail",
        data: "you not permited to perform this action",
      });
    } else {
    }
  } catch (error) {
    console.log(error.message);
  }
  next();
};

export const filteredSBOByDepartment = async (req, res, next) => {
  try {
    const department = req.query.department.toLowerCase();
    const departmentalSBOs = await SboForm.find({
      staffDepartment: department,
    });
    res.status(200).json({
      status: "success",
      length: departmentalSBOs.length,
      data: departmentalSBOs,
    });
  } catch (error) {
    console.log(error.message);
  }
  next();
};

export const filteredSBOByStaffNames = async (req, res, next) => {
  try {
    const searchQuery = req.query.staffName.split(" ");
    const regex = searchQuery.map(function (e) {
      return new RegExp(e, "i");
    });

    const filteredSBOsByName = await SboForm.find({ staffName: regex });

    res.status(200).json({
      status: "success",
      length: filteredSBOsByName.length,
      data: filteredSBOsByName,
    });
  } catch (error) {
    console.log(error.message);
  }
  next();
};

export const getAllSBOsByVisitors = async (req, res, next) => {
  try {
    const visitor = req.query.visitor;

    const getAllSBOsByVisitors = await SboForm.find({ visitor: visitor });

    res.status(200).json({
      status: "success",
      length: getAllSBOsByVisitors.length,
      data: getAllSBOsByVisitors,
    });
  } catch (error) {
    console.log(error.message);
  }
  next();
};

export const filteredSBOByTime = async (req, res, next) => {
  try {
    //getting individual date from query
    const dateRangeArr = req.query.time.split("/");
    const startDateArr = dateRangeArr[0].split("-");
    const endDateArr = dateRangeArr[1].split("-");

    //getting each date string
    const startDateStr = `${startDateArr[0]} ${startDateArr[1]} ${startDateArr[2]}`;
    const endDateStr = `${endDateArr[0]} ${+endDateArr[1] + 1} ${
      endDateArr[2]
    }`;

    //converting to isodate format
    const startDateISOFormat = dateFormat(startDateStr, "isoDateTime");
    const endDateISOFormat = dateFormat(endDateStr, "isoDateTime");

    //getting all SBOs in specified time range
    const SBOByTime = await SboForm.find({
      createdAt: {
        $gte: startDateISOFormat,
        $lte: endDateISOFormat,
      },
    });

    res.status(200).json({
      status: "success",
      length: SBOByTime.length,
      data: SBOByTime,
    });
  } catch (error) {
    console.log(error.message);
  }
  next();
};

export const filteredSBOByDetail = async (req, res, next) => {
  try {
    const searchQuery = req.query.searchQuery.split("-");

    const regex = searchQuery.map(function (e) {
      return new RegExp(e, "i");
    });

    const allSBOsWithSimilarDetails = await SboForm.find({
      details: { $in: regex },
    });

    res.status(200).json({
      status: "success",
      length: allSBOsWithSimilarDetails.length,
      data: allSBOsWithSimilarDetails,
    });
  } catch (error) {
    console.log(error.message);
  }
  next();
};

export const filteredSBOByPIR = async (req, res, next) => {
  //   try {
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  next();
};

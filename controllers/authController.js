import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createTokenAndSendResponse = (user, res, status) => {
  try {
    const token = jwt.sign({ id: user._id.toJSON() }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    const cookieOption = {
      httpOnly: true,
      expires: new Date(
        Date.now(process.env.COOKIE_EXPIRATION * 24 * 60 * 60 * 1000)
      ),
    };

    res.cookie("token", token, cookieOption);
    user.password = undefined;

    res.status(status).json({
      status: "success",
      token: token,
      data: user,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const signUp = async (req, res, next) => {
  try {
    let passwordConfirm = req.body.passwordConfirm;
    let password = req.body.password;
    let newUser;

    if (password === passwordConfirm) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      newUser = new User({ ...req.body, password: hash });
      await newUser.save();
    } else {
      newUser = "password did not match";
    }

    createTokenAndSendResponse(newUser, res, 201);
    next();
  } catch (error) {
    console.log(error.message);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // check if user has provided email and password
    if (!email || !password) {
      return res.status(403).json("please input email and password");
    }

    //check if email and password are valid
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        data: "email or password not correct",
      });
    }
    const passwordCheck = await bcrypt
      .compare(req.body.password, user.password)
      .then((res) => {
        console.log(res);
        return res;
      });

    if (!passwordCheck) {
      return res.status(404).json({
        data: "email or password not correct",
      });
    }

    // send response
    createTokenAndSendResponse(user, res, 200);
  } catch (error) {
    console.log(error);
  }
  next();
};

export const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(404).json({
        data: "you are not logged in",
      });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const userID = payload.id;
    const currentUser = await User.findById(userID);

    if (!currentUser) {
      return res.status(404).json({
        data: "user no longer exist",
      });
    }

    req.user = currentUser;
  } catch (error) {
    return res.status(401).json({
      data: error,
    });
  }
  next();
};

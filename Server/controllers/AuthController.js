import mongoose from "mongoose";
import StatusCodes from "../enums/statusCodes.js";
import Logging from "../library/Logging.js";
import BasicUser from "../models/BasicUser.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerBasicUser = async (req, res) => {
  const newBasicUser = new BasicUser({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
  });

  try {
    const savedBasicUser = await newBasicUser.save();
    return res.status(StatusCodes.CREATION_SUCCESS).json({ savedBasicUser });
  } catch (error) {
    Logging.error(error);
    res.status(StatusCodes.UNEXPECTED_ERROR).json({ error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).collation({
      locale: "en",
      strength: 2,
    });

    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Neteisingas prisijungimo paštas arba slaptažodis" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Neteisingas prisijungimo paštas arba slaptažodis" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ token, id: user._id, name: user.name });
  } catch (err) {
    Logging.error(err);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send("Įvyko netikėta klaida, bandykite vėliau");
  }
};

export default { registerBasicUser, login };

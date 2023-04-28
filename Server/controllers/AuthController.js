import StatusCodes from "../enums/statusCodes.js";
import Logging from "../library/Logging.js";
import BasicUser from "../models/BasicUser.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import BusinessUser from "../models/BusinessUser.js";
import ErrorMessages from "../enums/errorMessages.js";
import crypto from "crypto";

const registerUser = async (req, res) => {
  const { isBussinessRegistration, ...data } = req.body;

  try {
    isBussinessRegistration
      ? await registerBusinessUser(data)
      : await registerBasicur(data);

    return res
      .status(StatusCodes.CREATION_SUCCESS)
      .json({ message: "created" });
  } catch (error) {
    Logging.error(error);
    res.status(StatusCodes.UNEXPECTED_ERROR).json({ error });
  }
};

const registerBusinessUser = async (data) => {
  const newBusinessUser = new BusinessUser(data);
  await newBusinessUser.save();
};

const registerBasicur = async (data) => {
  const newBasicUser = new BasicUser(data);
  await newBasicUser.save();
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

    res.json({ token, id: user._id, userType: user.__t });
  } catch (err) {
    Logging.error(err);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send("Įvyko netikėta klaida, bandykite vėliau");
  }
};

export default { registerUser, login };

import StatusCodes from "../enums/statusCodes.js";
import Logging from "../library/Logging.js";
import BasicUser from "../models/BasicUser.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import BusinessUser from "../models/BusinessUser.js";
import ErrorMessages from "../enums/errorMessages.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

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

const sendPassowrdResetCode = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: ErrorMessages.USER_NOT_FOUND });

    const token = crypto.randomBytes(4).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;

    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USERNAME,
      subject: "Slaptažodžio atkurimas",
      text: `Jusų atkurimo kodas ${token}. Pateikite šį kodą norint pakeisti slaptažodį.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Reset password email sent" });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send("Įvyko netikėta klaida, bandykite vėliau");
  }
};

const changePassword = async (req, res) => {
  const { newPassword, email, code } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: ErrorMessages.USER_NOT_FOUND });

    if (
      code !== user.resetPasswordToken ||
      user.resetPasswordExpires < Date.now()
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: ErrorMessages.INVALID_TOKEN });
    }

    user.password = newPassword;
    await user.save();

    res.status(StatusCodes.OK).json({ message: "updated" });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send("Įvyko netikėta klaida, bandykite vėliau");
  }
};

export default { registerUser, login, sendPassowrdResetCode, changePassword };

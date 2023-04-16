import { TripQueryTypes } from "../../enums/enums.js";
import User from "../../models/User.js";

export const getDateFilter = (type) => {
  const today = new Date();

  if (type === TripQueryTypes.FUTURE) {
    return {
      date: { $gte: today.toISOString() },
    };
  } else if (type === TripQueryTypes.HISTORY) {
    return {
      date: { $lt: today.toISOString() },
    };
  } else {
    return {};
  }
};

export const getTripSearchRequestPopulation = (type) => {
  if (type === TripQueryTypes.FUTURE) {
    return {
      path: "tripSearchRequests",
      populate: {
        path: "user",
        model: "BasicUser",
        select: "name profilePicture",
      },
    };
  }

  return "";
};

export const findUserById = async (id, fieldsToPopulate = []) => {
  let query = User.findById(id);

  fieldsToPopulate.forEach((field) => {
    query = query.populate(field);
  });

  const user = await query.exec();
  if (!user) {
    throw new Error("User not found");
  }

  delete user.password;

  const userObject = user.toObject();

  if (userObject.profilePicture?.buffer) {
    userObject.profilePicture = {
      type: user.profilePicture.type,
      buffer: user.profilePicture.buffer.toString("base64"),
    };
  }

  return { user: userObject };
};

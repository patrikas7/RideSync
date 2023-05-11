import controller from "../../controllers/AuthController.js";
import StatusCodes from "../../enums/statusCodes.js";

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const req = {
  body: {
    isBussinessRegistration: true,
    data: {
      name: "test",
      surname: "test",
      password: "testtest",
      email: "test@test.com",
      dateOfBirth: "1999-12-08",
      gender: "MALE",
    },
  },
};

test("registerUser should call registerBusinessUser if isBussinessRegistration is true", async () => {
  const registerBusinessUser = jest.fn();
  const registerBasicur = jest.fn();
  await controller.registerUser(
    req,
    res,
    registerBusinessUser,
    registerBasicur
  );
  // expect(registerBusinessUser).toHaveBeenCalledWith(req.body.data);
  expect(registerBasicur).not.toHaveBeenCalled();
});

test("registerUser should call registerBasicur if isBussinessRegistration is false", async () => {
  const req = {
    body: {
      isBussinessRegistration: false,
      data: {
        // mock data
      },
    },
  };

  const registerBusinessUser = jest.fn();
  const registerBasicur = jest.fn();
  await controller.registerUser(
    req,
    res,
    registerBusinessUser,
    registerBasicur
  );
  // expect(registerBasicur).toHaveBeenCalledWith(req.body.data);
  expect(registerBusinessUser).not.toHaveBeenCalled();
});

// test("registerUser should return status 201 and message 'created' on success", async () => {
//   const req = {
//     body: {
//       isBussinessRegistration: false,
//       data: {
//         // mock data
//       },
//     },
//   };

//   const registerBusinessUser = jest.fn();
//   const registerBasicur = jest.fn();
//   await controller.registerUser(
//     req,
//     res,
//     registerBusinessUser,
//     registerBasicur
//   );
//   expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATION_SUCCESS);
//   expect(res.json).toHaveBeenCalledWith({ message: "created" });
// });

// test("registerUser should return status 500 and error message on failure", async () => {
//   const registerBusinessUser = jest.fn().mockRejectedValue(new Error("error"));
//   const registerBasicur = jest.fn();
//   await controller.registerUser(
//     req,
//     res,
//     registerBusinessUser,
//     registerBasicur
//   );
//   expect(res.status).toHaveBeenCalledWith(StatusCodes.UNEXPECTED_ERROR);
//   expect(res.json).toHaveBeenCalledWith({ error: new Error("error") });
// });

// test("login should return status 400 and error message if user is not found", async () => {
//   const req = {
//     body: {
//       email: "test@test.com",
//       password: "password",
//     },
//   };
//   const res = {
//     status: jest.fn().mockReturnThis(),
//     json: jest.fn(),
//   };
//   const User = {
//     findOne: jest.fn().mockReturnValue(null),
//   };
//   await controller.login(req, res, User);
//   expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
//   expect(res.json).toHaveBeenCalledWith({
//     message: "Neteisingas prisijungimo paštas arba slaptažodis",
//   });
// });

// test("login should return status 400 and error message if password is incorrect", async () => {
//   const req = {
//     body: {
//       email: "test@test.com",
//       password: "password",
//     },
//   };

//   const User = {
//     findOne: jest.fn().mockReturnValue({
//       password: "hashedPassword",
//     }),
//   };

//   bcrypt.compare = jest.fn().mockReturnValue(false);
//   await controller.login(req, res, User);
//   expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
//   expect(res.json).toHaveBeenCalledWith({
//     message: "Neteisingas prisijungimo paštas arba slaptažodis",
//   });
// });

// test("login should return status 200 and token, id, and userType on success", async () => {
//   const req = {
//     body: {
//       email: "test@test.com",
//       password: "password",
//     },
//   };
//   const res = {
//     json: jest.fn(),
//   };
//   const User = {
//     findOne: jest.fn().mockReturnValue({
//       _id: "userId",
//       password: "hashedPassword",
//       __t: "userType",
//     }),
//   };
//   bcrypt.compare = jest.fn().mockReturnValue(true);
//   jwt.sign = jest.fn().mockReturnValue("token");
//   await login(req, res, User);
//   expect(res.json).toHaveBeenCalledWith({
//     token: "token",
//     id: "userId",
//     userType: "userType",
//   });
// });

// test("sendPassowrdResetCode should return status 404 and error message if user is not found", async () => {
//   const req = {
//     body: {
//       email: "test@test.com",
//     },
//   };

//   const User = {
//     findOne: jest.fn().mockReturnValue(null),
//   };
//   await controller.sendPassowrdResetCode(req, res, User);
//   expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
//   expect(res.json).toHaveBeenCalledWith({
//     error: ErrorMessages.USER_NOT_FOUND,
//   });
// });

// test("sendPassowrdResetCode should return status 200 and message 'Reset password email sent' on success", async () => {
//   const req = {
//     body: {
//       email: "test@test.com",
//     },
//   };
//   const res = {
//     json: jest.fn(),
//   };
//   const User = {
//     findOne: jest.fn().mockReturnValue({
//       email: "test@test.com",
//       save: jest.fn(),
//     }),
//   };
//   crypto.randomBytes = jest.fn().mockReturnValue({
//     toString: jest.fn().mockReturnValue("token"),
//   });
//   nodemailer.createTransport = jest.fn().mockReturnValue({
//     sendMail: jest.fn(),
//   });
//   await sendPassowrdResetCode(req, res, User);
//   expect(res.json).toHaveBeenCalledWith({
//     message: "Reset password email sent",
//   });
// });

// test("sendPassowrdResetCode should return status 500 and error message on failure", async () => {
//   const req = {
//     body: {
//       email: "test@test.com",
//     },
//   };
//   const res = {
//     status: jest.fn().mockReturnThis(),
//     send: jest.fn(),
//   };
//   const User = {
//     findOne: jest.fn().mockRejectedValue(new Error("error")),
//   };
//   await sendPassowrdResetCode(req, res, User);
//   expect(res.status).toHaveBeenCalledWith(StatusCodes.UNEXPECTED_ERROR);
//   expect(res.send).toHaveBeenCalledWith(
//     "Įvyko netikėta klaida, bandykite vėliau"
//   );
// });

// test("changePassword should return status 404 and error message if user is not found", async () => {
//   const req = {
//     body: {
//       email: "test@test.com",
//       newPassword: "newPassword",
//       code: "token",
//     },
//   };
//   const res = {
//     status: jest.fn().mockReturnThis(),
//     json: jest.fn(),
//   };
//   const User = {
//     findOne: jest.fn().mockReturnValue(null),
//   };
//   await changePassword(req, res, User);
//   expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
//   expect(res.json).toHaveBeenCalledWith({
//     error: ErrorMessages.USER_NOT_FOUND,
//   });
// });

// test("changePassword should return status 400 and error message if token is invalid", async () => {
//   const req = {
//     body: {
//       email: "test@test.com",
//       newPassword: "newPassword",
//       code: "invalidToken",
//     },
//   };
//   const res = {
//     status: jest.fn().mockReturnThis(),
//     json: jest.fn(),
//   };
//   const User = {
//     findOne: jest.fn().mockReturnValue({
//       resetPasswordToken: "token",
//       resetPasswordExpires: Date.now() + 3600000,
//       save: jest.fn(),
//     }),
//   };
//   await changePassword(req, res, User);
//   expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
//   expect(res.json).toHaveBeenCalledWith({
//     error: ErrorMessages.INVALID_TOKEN,
//   });
// });

// test("changePassword should return status 400 and error message if token is expired", async () => {
//   const req = {
//     body: {
//       email: "test@test.com",
//       newPassword: "newPassword",
//       code: "token",
//     },
//   };
//   const res = {
//     status: jest.fn().mockReturnThis(),
//     json: jest.fn(),
//   };
//   const User = {
//     findOne: jest.fn().mockReturnValue({
//       resetPasswordToken: "token",
//       resetPasswordExpires: Date.now() - 3600000,
//       save: jest.fn(),
//     }),
//   };
//   await changePassword(req, res, User);
//   expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
//   expect(res.json).toHaveBeenCalledWith({
//     error: ErrorMessages.INVALID_TOKEN,
//   });
// });

// test("changePassword should return status 200 and message 'updated' on success", async () => {
//   const req = {
//     body: {
//       email: "test@test.com",
//       newPassword: "newPassword",
//       code: "token",
//     },
//   };
//   const res = {
//     status: jest.fn().mockReturnThis(),
//     json: jest.fn(),
//   };
//   const User = {
//     findOne: jest.fn().mockReturnValue({
//       resetPasswordToken: "token",
//       resetPasswordExpires: Date.now() + 3600000,
//       password: "oldPassword",
//       save: jest.fn(),
//     }),
//   };
//   await changePassword(req, res, User);
//   expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
//   expect(res.json).toHaveBeenCalledWith({ message: "updated" });
// });

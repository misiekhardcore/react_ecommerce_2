import express from "express";
import bcrypt from "bcryptjs";
import data from "../data.js";
import { generateToken } from "../utils.js";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user),
          });
        } else {
          res.status(401).send({
            info: { type: "error", message: "Invalid email or password" },
          }); 
        }
      }
    } catch (err) {
      res.status(401).send({
        info: { type: "error", message: "Invalid email or password" },
      });
    }
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    try {
      const createdUser = await user.save();
      if (createdUser) {
        res.send({
          _id: createdUser._id,
          name: createdUser.name,
          email: createdUser.email,
          isAdmin: createdUser.isAdmin,
          token: generateToken(createdUser),
        });
      }
    } catch (err) {
      res
        .status(401)
        .send({ info: { type: "error", message: "Email already taken" } });
    }
  })
);

export default userRouter;

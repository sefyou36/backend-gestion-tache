const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const User = require("../../models/userModel");

console.log(User);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));

const register = async (req, res) => {
  try {
    const { lastName, firstName, password, email } = req.body;
    // console.log(req.body);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      lastName,
      firstName,
      password: hashedPassword,
      email,
    });
    const result = await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
          return res.status(404).send({
            message: "Email not found"
          });
        }
        const passwordCheck = await bcrypt.compare(req.body.password, user.password);
        if (!passwordCheck) {
          return res.status(400).send({
            message: "Password doesn't match !!"
          });
        }
        const token = jwt.sign(
          {
            userId: user._id,
            userEmail: user.email
          },
          "RANDOM-TOKEN",
          { expiresIn: "24h" }
        );
        res.status(200).send({
          message: "Login Successful",
          email: user.email,
          token
        });
      } catch (error) {
        console.log('error', error);
        res.status(500).send({
          message: "Error when logging in!",
          error
        });
      }
};

const jwtMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Missing token" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
      req.userId = decoded.userId;
      next();
    });
  };
  

module.exports = {
  register,
  loginUser,
  jwtMiddleware
};

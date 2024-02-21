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

const loginUser = async (email, password) => {
  // Vérifier si l'utilisateur existe dans la base de données
  const user = await User.findOne({ email });
  if (!user) {
      throw new Error("Email not found");
  }

  // Vérifier si le mot de passe est correct
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
      throw new Error("Password incorrect");
  }

  // Générer un token JWT
  const token = jwt.sign({ userId: user._id, userEmail: user.email }, "YOUR_SECRET_KEY", { expiresIn: "24h" });

  return token;
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

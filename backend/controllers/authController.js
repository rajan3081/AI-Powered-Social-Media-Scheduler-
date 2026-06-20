const jwt = require("jsonwebtoken");

const User = require("../models/User");

const bcrypt = require("bcryptjs");

// ================= REGISTER USER =================

const registerUser = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // CHECK USER

    const userExists = await User.findOne({
      email
    });

    if (userExists) {

      return res.status(400).json({
        message: "User already exists"
      });

    }

    // HASH PASSWORD

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    // CREATE USER

    const user = await User.create({

      name,

      email,

      password: hashedPassword

    });

    res.status(201).json({

      message: "User Registered Successfully",

      user: {

        id: user._id,

        name: user.name,

        email: user.email

      }

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// ================= LOGIN USER =================

const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    // CHECK USER

    const user = await User.findOne({
      email
    });

    if (!user) {

      return res.status(400).json({
        message: "User not found"
      });

    }

    // CHECK PASSWORD

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid credentials"
      });

    }

    // GENERATE TOKEN

    const token = jwt.sign(

      {
        id: user._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );

    // RESPONSE

    res.status(200).json({

      message: "Login Successful",

      token,

      user: {

        id: user._id,

        name: user.name,

        email: user.email

      }

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const forgotPassword = async (req, res) => {

  try {

    const { email, newPassword } = req.body;

    const user = await User.findOne({
      email
    });

    if (!user) {

      return res.status(400).json({
        message: "User not found"
      });

    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      newPassword,
      salt
    );

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password Updated Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// ================= EXPORTS =================

module.exports = {

  registerUser,

  loginUser

};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword
};
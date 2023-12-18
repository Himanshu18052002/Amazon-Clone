const express = require("express");
const bodyParer = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto"); //for generating verification token
const nodemailer = require("nodemailer"); //mail verification
const cors = require("cors");
const jwt = require("jsonwebtoken"); // for login
const app = express();
const port = 8000;

//importing database model
const User = require("./models/user");
const Order = require("./models/order");

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParer.urlencoded({ extended: false }));
app.use(bodyParer.json());

mongoose
  .connect(
    "mongodb+srv://himanshudawande1805:himanshudawande1805@cluster0.lgaqlkg.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("everything works good connected succesfully");
  })
  .catch((err) => {
    console.log("error occured " + err);
  });

app.listen(port, () => {
  console.log("App listeneing on port " + port);
});

// endpoints

//sending verification mail to the email entered
const sendVerificationEmail = async (email, verificationToken) => {
  //create a nodemailer transport
  const transporter = nodemailer.createTransport({
    //configure the email service
    service: "gmail",
    auth: {
      user: "himanshudawande869@gmail.com",
      pass: "ebga jbjh pkrf nvhe",
    },
  });

  //composing the mail
  const mailOptions = {
    from: "amazon.com",
    to: email,
    subject: "Email Verification",
    text: `please click the link to verify your email : http://localhost:8000/verify/${verificationToken}`,
  };

  //sending the mail
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log("error while sending verification mail", err);
  }
};

//endpoint for registering the user
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered:", email); // Debugging statement
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create a new user
    const newUser = new User({ name, email, password });

    // Generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // Save the user to the database
    await newUser.save();

    // Debugging statement to verify data
    console.log("New User Registered:", newUser);

    // Send verification email to the user
    // Use your preferred email service or library to send the email
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(201).json({
      message:
        "Registration successful. Please check your email for verification.",
    });
  } catch (error) {
    console.log("Error during registration:", error); // Debugging statement
    res.status(500).json({ message: "Registration failed" });
  }
});

//endpoint for verifying token when the user is clicking the link on email
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    // Check if the user with the verification code exists
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).json({ message: "Invalid Verification token" });
    }

    // Toggle user verified to true
    user.verified = true;
    user.verificationToken = undefined;

    // Save the user document
    await user.save();

    res.status(200).json({ message: "Email Verification successfully" });
  } catch (err) {
    console.error("Verification failed for the user", err);
    res
      .status(500)
      .json({ message: "Verification failed", error: err.message });
  }
});

//Endpoint for login

// secret key for jsonwebtoken to login
const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //checking for the person with the entered email exists or not
    const user = await User.find({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid Email or Password" });
    }
    //generating Jsonwebtoken for the user
    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ message: "logged in succesfully", token });
  } catch (err) {
    console.log(err);
    res.status(501).json({ message: "Login Failed" });
  }
});

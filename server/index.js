import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import connectDB from "./db/connectDB.js";
import User from "./models/Users.js";
import Contact from "./models/Contacts.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/test", (req, res) => {
  console.log("test successfull");
  res.json("okkk");
});

app.post("/register", async (req, res) => {
  const { username, password, phone } = req.body;
  console.log(username, password, phone);
  const hashedPassword = await bcrypt.hash(
    password,
    process.env.SALT_ROUND | 0
  );
  try {
    const existingContact = await User.findOne({ tel: phone });
    if (existingContact) {
      return res.status(200).json({ exists: true });
    } else {
      try {
        const newUser = await new User({
          name: username,
          password: hashedPassword,
          tel: phone,
        });
        newUser.save();
        console.log("User registered!");
        res.status(200).json("Successfully registered!");
      } catch (error) {
        console.log(error);
        res.status(422).json("Registration unsuccessfull!");
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const {
      _id,
      name,
      password: hashedPassword,
    } = await User.findOne({ name: username }, { tel: 0 });
    const isUser = await bcrypt.compare(password, hashedPassword);
    if (isUser) {
      const token = jwt.sign(
        {
          name: name,
          _id: _id,
        },
        process.env.SECRET_ACCESS_TOKEN
      );
      const user = { _id: _id, name: name };
      res
        .cookie("token", token)
        .status(200)
        .json({ message: "Login successfull!", user });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(422).json("Registration unsuccessfull!");
  }
});

app.get("/userDetails", authenticateToken, (req, res) => {
  if (req.user) {
    console.log(req.user);
    res.json(req.user);
  }
});

app.post("/addContact", authenticateToken, (req, res) => {
  const { name, phone } = req.body;
  try {
    const newContact = new Contact({
      name: name,
      tel: phone,
      user: req.user._id,
    });
    newContact.save();
    res.status(200).json("Contact added successfully!");
  } catch (error) {
    console.log(error);
    res.status(422).json("Contact not added!");
  }
});

app.get("/contacts", authenticateToken, async (req, res) => {
  try {
    console.log(req.user._id + " is the user id");
    const contacts = await Contact.find({
      user: req.user._id,
    });
    res.status(200).json({ contacts });
  } catch (error) {
    console.log(error);
    res.status(422).json("Error fetching contacts!");
  }
});

app.get("/contacts/:tel", authenticateToken, async (req, res) => {
  const { tel } = req.params;
  console.log(tel);
  try {
    const contact = await User.findOne({ tel: tel });
    console.log(contact);
    res.status(200).json(contact);
  } catch (error) {
    console.log(error);
    res.status(422).json("Error fetching contact!");
  }
});

function authenticateToken(req, res, next) {
  const { token } = req.cookies;
  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, {}, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

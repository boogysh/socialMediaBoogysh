import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { s3ClientFunc } from "../aws_s3/s3.js";

// AWS S3
import {
  // S3Client, //imported as s3ClientFunc
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/* REGISTER USER */

export const register = async (req, res) => {
  //s3 section
  const { s3, bucketName } = s3ClientFunc();
  // if (req.file) {
  const imageName = "profiles/" + Date.now() + "-" + req.file.originalname;
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);
  req.file.buffer;

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };
  const command = new PutObjectCommand(params);
  await s3.send(command);

  console.log(command);

  //-------
  const getObjectParams = {
    Bucket: bucketName,
    Key: imageName,
  };

  const getCommand = new GetObjectCommand(getObjectParams);
  console.log(getCommand);
  const url = await getSignedUrl(s3, getCommand, { expireIn: 60 }); //60
  console.log(url);
  //---------
  const splittedUrl = url.split("?")[0];
  console.log(splittedUrl);
  // }

  //--------------------------------------------------

  try {
    const {
      firstName,
      lastName,
      email,
      password,
      friends,
      location,
      occupation,
    } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({ 
      firstName,
      lastName,
      email,
      password: passwordHash,
      url: splittedUrl,
      urlImgName: imageName,
      friends,
      location,
      occupation,
      // viewedProfile: Math.floor(Math.random() * 10000),
      viewedProfile: [],
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* DELETE  ACCOUNT */

export const deleteAccount = async (req, res) => {
  const { s3, bucketName } = s3ClientFunc();

  try {
    const { id } = req.params;
    const { userId } = req.body;

    const user = await User.findById(id);

    const paramsDelete = {
      Bucket: bucketName,
      Key: user.urlImgName,
    };
    const commandDelete = new DeleteObjectCommand(paramsDelete);

    const evenUser = userId === id;
    if (evenUser) {
      await s3.send(commandDelete);
      await User.deleteOne({ _id: id });
      res.status(200).json({ message: "User Account deleted successfully!" });
    } else {
      res.status(403).json({ message: "Not authorized!" });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

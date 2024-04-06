import "dotenv/config";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("connected to database....");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;

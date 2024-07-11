import mongoose from "mongoose";
import "dotenv/config";

const mongoDb = process.env.DEV_DB;

if (!mongoDb) {
  console.error(
    "MongoDB connection string is not defined in environment variables."
  );
  process.exit(1);
}

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDb);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.on("disconnected", () => console.log("Mongoose disconnected from DB"));
db.on("reconnected", () => console.log("Mongoose reconnected to DB"));

export default connectDB;

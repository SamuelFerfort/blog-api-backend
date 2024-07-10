import mongoose from "mongoose";

const mongoDb = process.env.DEV_DB;

if (!mongoDb) {
  console.error(
    "MongoDB connection string is not defined in environment variables."
  );
  process.exit(1);
}

mongoose
  .connect(mongoDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB connected successfully");
});

db.on("connected", () => {
  console.log("Mongoose connected to the database");
});

db.on("disconnected", () => {
  console.log("Mongoose connection is disconnected");
});

db.on("reconnected", () => {
  console.log("Mongoose reconnected to the database");
});

export default db;

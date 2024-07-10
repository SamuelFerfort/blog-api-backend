import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["author", "user"], default: "user" },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.virtual("fullName").get(function () {
  return `${this.first_name} ${this.last_name}`;
});

export default mongoose.model("User", UserSchema);

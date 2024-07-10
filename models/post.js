import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  tags: [{ type: String }],
});
export default mongoose.model("Post", CommentSchema);

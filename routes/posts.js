import express from "express";
const router = express.Router();
import { getAllPosts } from "../controllers/postsController.js";


router.get("/", getAllPosts);
/* router.get("/:id", getPostById);


router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
 */
export default router;

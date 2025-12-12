import { Router } from "express";
import {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
} from "../controllers/blogpost.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// PUBLIC ROUTES
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

// PROTECTED ROUTES
router.post("/", authMiddleware, createBlog);
router.put("/:id", authMiddleware, updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

export default router;

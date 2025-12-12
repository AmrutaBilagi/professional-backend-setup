import {Tweet } from "../models/tweets.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// CREATE BLOG
export const createBlog = asyncHandler(async (req, res) => {
    const { content } = req.body;

    if (!content) {
        throw new ApiError(400, "Content is required");
    }

    const blog = await Tweet.create({
        content,
        owner: req.user._id      // secured by authMiddleware
    });

    return res.status(201).json(
        new ApiResponse(201, blog, "Blog created successfully")
    );
});


// READ ALL BLOGS
export const getAllBlogs = asyncHandler(async (req, res) => {
    const blogs = await Tweet.find().populate("owner", "-password -refreshToken");

    return res.status(200).json(
        new ApiResponse(200, blogs, "All blogs fetched successfully")
    );
});


// READ SINGLE BLOG
export const getBlogById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const blog = await Tweet.findById(id).populate("owner", "-password -refreshToken");

    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    return res.status(200).json(
        new ApiResponse(200, blog, "Blog fetched successfully")
    );
});


// UPDATE BLOG
export const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    const blog = await Tweet.findById(id);

    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    if (blog.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized: You can update only your blog");
    }

    blog.content = content || blog.content;
    await blog.save();

    return res.status(200).json(
        new ApiResponse(200, blog, "Blog updated successfully")
    );
});


// DELETE BLOG
export const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const blog = await Tweet.findById(id);

    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    if (blog.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized: You can delete only your blog");
    }

    await blog.deleteOne();

    return res.status(200).json(
        new ApiResponse(200, null, "Blog deleted successfully")
    );
});

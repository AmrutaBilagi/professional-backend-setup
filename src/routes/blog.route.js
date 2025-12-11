import { Router } from "express";

const router=Router()

// Define your blog routes here
router.get("/", (req, res) => {
    res.send("Welcome to the Blog!");
});

export default router;
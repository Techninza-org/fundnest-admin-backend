const express = require("express");
const router = express.Router();
const videoController = require("../adminControllers/videoController");
const jwtTokenMiddleware = require("../adminMiddleware/jwtTokenMiddleware");

// Route to handle video upload
router.post("/upload", jwtTokenMiddleware, videoController.uploadVideo);

router.get("/get-uploads", videoController.getVideos);

router.get("/:id", videoController.getVideoById);

router.post("/create-courses", videoController.createCourses);

module.exports = router;

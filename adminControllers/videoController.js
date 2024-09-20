const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Video = require("../adminModels/Video");
const Courses = require("../adminModels/courses");

// Set up storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize Multer upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 }, // 100MB limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).fields([
  { name: "video", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
]);

// Check file type
function checkFileType(file, cb) {
  const filetypes = /mp4|mov|avi|mkv|jpeg|jpg|png/; // Support video & image formats
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Only videos and images are allowed!");
  }
}

// Create Courses API
exports.createCourses = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }

    // Check if files exist
    if (!req.files || !req.files["video"]) {
      return res.status(400).json({ msg: "No video file selected" });
    }

    // Extract the form data
    const { title, description, cost } = req.body;

    try {
      // Get video and thumbnail URLs
      const videoUrl = `/uploads/${req.files["video"][0].filename}`;
      const thumnailUrl = req.files["thumbnail"]
        ? `/uploads/${req.files["thumbnail"][0].filename}`
        : null; // Thumbnail optional

      // Create a new course
      const newCourse = new Courses({
        videoUrl,
        thumnailUrl,
        title,
        description,
        cost,
      });

      // Save the course to the database
      await newCourse.save();

      // Respond with the newly created course data
      res.status(201).json({
        msg: "Course created successfully",
        course: newCourse,
      });
    } catch (error) {
      res.status(500).json({ msg: "Error saving course", error });
    }
  });
};
// Handle video uploadconst path = require('path');

exports.uploadVideo = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }
    if (!req.file) {
      return res.status(400).json({ msg: "No file selected" });
    }

    const { title, description, cost, date } = req.body; // Extract title, description, and cost from request body

    // Get the original filename and extension
    const originalName = path.parse(req.file.originalname).name;
    const extension = path.extname(req.file.originalname);

    // Make the filename unique by appending the current timestamp
    const uniqueName = `${originalName}-${Date.now()}${extension}`;

    // Rename the uploaded file
    const fs = require("fs");
    const oldPath = req.file.path;
    const newPath = path.join(path.dirname(oldPath), uniqueName);

    fs.rename(oldPath, newPath, (renameErr) => {
      if (renameErr) {
        return res.status(500).json({ msg: "Failed to rename file" });
      }

      const url = `http://localhost:4000/uploads/${uniqueName}`;
      const newVideo = new Video({
        url,
        title: title || originalName, // Use provided title or fallback to original name
        description: description || "", // Optional description
        cost: cost || 0, // Optional cost, default to 0 if not provided
        date: date || new Date(), // Optional date, default to current date if not provided
      });

      newVideo
        .save()
        .then((video) => res.json({ fileName: uniqueName, url: video.url }))
        .catch((err) =>
          res.status(500).json({ msg: "Failed to save video URL in database" })
        );
    });
  });
};

// Get list of videos

exports.getVideos = async (req, res) => {
  try {
    // Fetch video details from the database
    const videos = await Video.find(); // Assuming the Video model has fields like url, title, etc.

    if (!videos || videos.length === 0) {
      return res.status(404).json({ msg: "No videos found" });
    }

    // Map over the videos and send URLs along with other details
    const videoData = videos.map((video) => ({
      url: video.url,
      title: video.title,
      description: video.description || "", // Include description if present
      cost: video.cost,
      date: video.date, // Include date if present
    }));

    return res.json(videos);
  } catch (err) {
    console.error("Error fetching videos:", err);
    return res.status(500).json({ msg: "Failed to fetch videos", error: err });
  }
};

exports.getVideoById = async (req, res) => {
  try {
    const videoId = req.params.id;
    // Find the video in the database by ID
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ msg: "Webinar not found" });
    }

    // Send the video details back to the client
    res.status(200).json({
      video, // Assuming `createdAt` is a field in your schema
    });
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

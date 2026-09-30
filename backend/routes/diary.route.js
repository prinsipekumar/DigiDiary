import express from "express";
import Entry from "../models/Entry.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// get diary

router.get("/", protectedRoute, async (req, res) => {
  try {
    const entry = await Entry.find({ createdBy: req.user._id });
    res.json(entry);
  } catch (error) {
    console.log("Error in getting entries: ", error);
    res.status(500).json({ message: "Server error" });
  }
});

// create an entry

router.post("/", protectedRoute, async (req, res) => {
  const { title, description } = req.body;

  try {
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title as well as Description required" });
    }
    const entry = await Entry.create({
      title,
      description,
      createdBy: req.user._id,
    });
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// get an entry

router.get("/:id", protectedRoute, async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// update an entry

router.put("/:id", protectedRoute, async (req, res) => {
  const { title, description } = req.body;
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    if (entry.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    entry.title = title || entry.title;
    entry.description = description || entry.description;

    const updatedEntry = await entry.save();
    res.json(updatedEntry);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// delete an entry

router.delete("/:id", protectedRoute, async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    if (entry.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await entry.deleteOne();
    res.json({ message: "Entry deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

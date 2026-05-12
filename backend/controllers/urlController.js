import { nanoid } from "nanoid";
import Url from "../models/Url.js";

// Create shortened URL
export const createShortUrl = async (req, res) => {
  try {
    const { original_url } = req.body;

    if (!original_url) {
      return res.status(400).json({ error: "Original URL is required" });
    }

  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all URLs
export const getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find().sort({ created_at: -1 });
    res.json(urls);
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).json({ error: "Server error" });
  }
};
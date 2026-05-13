import { nanoid } from "nanoid";
import Url from "../models/Url.js";

// Create shortened URL
export const createShortUrl = async (req, res) => {
  try {
    const { original_url } = req.body;

    if (!original_url) {
      return res.status(400).json({ error: "Original URL is required" });
    }
 // Add protocol if not present
    let validUrl = original_url;

    if (
      !original_url.startsWith("http://") &&
      !original_url.startsWith("https://")
    ) {
      validUrl = "https://" + original_url;
    }

    // Check if URL already exists
    let existingUrl = await Url.findOne({
      original_url: validUrl,
    });

    if (existingUrl) {
      return res.json({
        original_url: existingUrl.original_url,
        short_code: existingUrl.short_code,
        short_url: `${req.protocol}://${req.get("host")}/${existingUrl.short_code}`,
        created_at: existingUrl.created_at,
      });
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
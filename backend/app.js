import express from "express";
import  dbConnection  from "./database/dbConnection.js";
import urlRoutes from "./routes/urlRoutes.js";
import Url from "./models/Url.js";
import cors from "cors";

//“ config Load my secret variables from this file so I can use process.env.”
import { config } from "dotenv";


config({ path: "./.env" });//calling again in main file bcz load it globally its recommended
const app = express();

// ES6 module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS configuration for frontend connection
const corsOptions = {
  origin: ["http://localhost:5173"], // frontend URL
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use("/api", apiRoutes);
app.use(cors(corsOptions));
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "URL Shortener API",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      shorten: "/api/shorten",
      urls: "/api/urls",
      redirect: "/:shortcode",
    },
    status: "running",
  });
});
// Health check route (must come before /:shortcode)
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "URL Shortener API is running",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || "development",
  });
});

// Redirect route - GET /:shortcode (must come after specific routes)
app.get("/:shortcode", async (req, res) => {
  try {
    const { shortcode } = req.params;

    // Skip health and other system routes
    if (
      shortcode === "health" ||
      shortcode === "api" ||
      shortcode.startsWith("_")
    ) {
      return res.status(404).json({ error: "Route not found" });
    }

    // Find URL by short code
    const url = await Url.findOne({ short_code: shortcode });

    if (!url) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Increment visit count
    url.visits += 1;
    await url.save();

    // Redirect to original URL
    res.redirect(url.original_url);
  } catch (error) {
    console.error("Error redirecting:", error);
    res.status(500).json({ error: "Server error" });
  }
});

  dbConnection();
export default app;
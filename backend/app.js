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

  dbConnection();
export default app;
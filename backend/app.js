import express from "express";
import  dbConnection  from "./database/dbConnection.js";
import apiRoutes from "./routes/api.js";
import Url from "./models/Url.js";

//“ config Load my secret variables from this file so I can use process.env.”
import { config } from "dotenv";


config({ path: "./.env" });//calling again in main file bcz load it globally its recommended
const app = express();

app.use("/api", apiRoutes);

app.use(express.json());
  dbConnection();
export default app;
import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: true,
  },
  short_code: {
    type: String,
    required: true,
    unique: true,
  },
  visits: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Url = mongoose.model("Url", urlSchema);

export default Url;

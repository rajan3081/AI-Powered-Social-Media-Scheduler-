require("dotenv").config();
const express = require("express");

const router = express.Router();

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

console.log(process.env.OPENAI_API_KEY);
const aiRoutes = require("./routes/aiRoutes");
const startScheduler = require("./scheduler/scheduler");



const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const postRoutes = require("./routes/postRoutes");

const uploadRoutes = require("./routes/uploadRoutes");

const app = express();




connectDB();

startScheduler();

app.use("/api/ai", aiRoutes);

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/posts", postRoutes);

app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
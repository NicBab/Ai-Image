import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
const PORT = process.env.PORT || 3000;

import connectDB from "./mongodb/connect.js";
import PostRoutes from "./routes/postRoutes.js";
import DalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use('/api/v1/post', PostRoutes)
app.use('/api/v1/dalle', DalleRoutes)

app.get("/", async (rq, res) => {
  res.send("Hello from dallE");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.log(error)
  }
};
startServer();

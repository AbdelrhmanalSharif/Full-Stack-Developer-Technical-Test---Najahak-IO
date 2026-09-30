import express from "express";
import cors from "cors";
import "dotenv/config";
import requestRoutes from "./routes/requests";

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/requests", requestRoutes);

app.get("/", (_req, res) => {
  res.json({
    message: "Client Requests API is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

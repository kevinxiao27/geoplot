import express, { Express } from "express";
import cachesRouter from "./routes/caches";
import connectDB from "./db";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({ path: "./config/config.env" });
connectDB();
const app: Express = express();
app.use(express.json());
app.use(cors());

app.use("/api/geocaches", cachesRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Listening on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`
  );
});

export default app;

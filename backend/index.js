import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api", userRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized!");
  })
  .catch((err) => {
    console.error("Error synchronizing database: ", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

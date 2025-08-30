import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/config/db.js";
import app from "./src/app.js";

connectDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port : ${PORT}`);
});
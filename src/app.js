import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";

import enquiryRoutes from "./routes/enquiryRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";


const app = express();

// <===Middlewares===>
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [process.env.FRONTEND_URL ,
  "https://befirst-hr-consultancy.vercel.app/",
  "http://localhost:3000",
  ],
  credentials: true
}));
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(compression());

// <===Routes===>
app.use("/api/v1", enquiryRoutes);

// <===Root Route===>
app.get("/", (req, res) => {
  res.send("API is running...");
});


// <===Middlewares===>
app.use(notFound);   
app.use(errorHandler); 

export default app;

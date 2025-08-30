
import express from "express";
import { submitEnquiry } from "../controllers/enquirytController.js";

const router = express.Router();

router.post("/enquiry", submitEnquiry);

export default router;

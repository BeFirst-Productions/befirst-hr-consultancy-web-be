
import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    notes: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);

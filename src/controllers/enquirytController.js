import Enquiry from "../models/Enquiry.js";
import transporter from "../config/email.js";
import { enquiryEmailTemplate } from "../utils/emialTemplates.js";

export const submitEnquiry = async (req, res, next) => {
  try {
    const { name, lastname, email, subject, notes } = req.body;

    // ✅ Server-side validation
    if (!name || !lastname || !email || !subject || !notes) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Save to DB
    const enquiry = new Enquiry({ name, lastname, email, subject, notes });
    await enquiry.save();

    // ✅ Send Email to Admin
    const mailOptions = {
      from: `"Website Enquiry" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Enquiry from ${name} ${lastname}`,
      html:enquiryEmailTemplate({ name, lastname, email, subject, notes }),
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Enquiry submitted successfully" });
  } catch (error) {
    next(error); 
  }
};

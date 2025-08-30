import Enquiry from "../models/Enquiry.js";
import transporter from "../config/email.js";
import { enquiryEmailTemplate } from "../utils/emialTemplates.js";

export const submitEnquiry = async (req, res, next) => {
  try {
    const { name, lastname, email, subject, notes } = req.body;


    // ✅ Server-side validation
    if (!name || !lastname || !email || !subject || !notes) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required" 
      });
    }

    // Additional validation for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        message: "Please provide a valid email address" 
      });
    }

    // ✅ Save to DB
    console.log("Saving to database...");
    const enquiry = new Enquiry({ 
      name: name.trim(), 
      lastname: lastname.trim(), 
      email: email.trim(), 
      subject: subject.trim(), 
      notes: notes.trim() 
    });
    
    const savedEnquiry = await enquiry.save();
    console.log("Enquiry saved successfully:", savedEnquiry._id);

    // ✅ Send Email to Admin
    try {
      console.log("Sending email...");
      const mailOptions = {
        from: `"Website Enquiry" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Enquiry from ${name} ${lastname}`,
        html: enquiryEmailTemplate({ name, lastname, email, subject, notes }),
      };

      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Don't fail the entire request if email fails
      // Log the error but continue with success response
    }

    res.status(200).json({ 
      success: true,
      message: "Enquiry submitted successfully",
      data: {
        id: savedEnquiry._id,
        name: savedEnquiry.name,
        lastname: savedEnquiry.lastname,
        email: savedEnquiry.email
      }
    });

  } catch (error) {
    console.error("Controller error:", error);
    
    // Check if it's a validation error
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors
      });
    }

    // Check if it's a duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate entry detected"
      });
    }

    next(error); 
  }
};

// Not Found Handler
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Global Error Handler
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  console.error("Global error handler:", {
    message: err.message,
    stack: err.stack,
    statusCode
  });

  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong, please try again later.",
    // Only show stack in development
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
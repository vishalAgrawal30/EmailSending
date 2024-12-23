const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Configure Multer for file uploads
const upload = multer({
    dest: "uploads/",
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5 MB
  });
  

app.post("/send-email", upload.single("document"), async (req, res) => {
  const { name, email, subject, message } = req.body;
  const file = req.file; // The uploaded file
  async function sendEmail(req, res) {
    
  try {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'va8687577@gmail.com',
          pass: 'Your App password',
        },
      });

    const mailOptions = {
      from: email,
      to: "va8687577@gmail.com", // Replace with the company's email
      subject: `Contact Form Submission: ${subject}`,
      text: `You have a new contact form submission from ${name} (${email}):\n\n${message}`,
      attachments: file
        ? [
            {
              filename: file.originalname, // Use original file name
              path: file.path,             // Path to uploaded file
            },
          ]
        : [],
    };

    await transporter.sendMail(mailOptions);

    // Clean up the uploaded file if needed
    if (file) {
      const fs = require("fs");
      fs.unlinkSync(file.path); // Delete the uploaded file after sending
    }

    res.status(200).send({ message: "Email sent successfully with attachment!" });

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ message: "Failed to send email" });
  }
}});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

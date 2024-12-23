import React, { useState } from "react";
import axios from "axios";
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert("File size should not exceed 5MB");
      setFile(null);
      e.target.value = null; // Reset the file input
    } else if (file && !["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
      alert("Only PDF, JPEG, or PNG files are allowed.");
      setFile(null);
      e.target.value = null;
    } else {
      setFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(""); // Clear previous status

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("subject", formData.subject);
    data.append("message", formData.message);
    if (file) {
      data.append("document", file);
    }

    try {
      const response = await axios.post("http://localhost:5000/send-email", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setStatus("Email sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setFile(null);
      } else {
        setStatus("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-us-container">
      <h2>Contact Us</h2>
      {status && (
        <p className={`status-message ${status.includes("success") ? "success" : "error"}`}>
          {status}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="document">Attach Document:</label>
          <input
            type="file"
            id="document"
            name="document"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ContactUs;

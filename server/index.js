const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const enquiriesFilePath = path.join(__dirname, "enquiries.json");

app.get("/", (req, res) => {
  res.send("Kidrove enquiry API is running");
});

app.post("/api/enquiry", (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and phone number are required.",
    });
  }

  const enquiry = {
    name,
    email,
    phone,
    timestamp: new Date().toISOString(),
  };

  let enquiries = [];

  if (fs.existsSync(enquiriesFilePath)) {
    const fileData = fs.readFileSync(enquiriesFilePath, "utf-8");
    enquiries = fileData ? JSON.parse(fileData) : [];
  }

  enquiries.push(enquiry);

  fs.writeFileSync(enquiriesFilePath, JSON.stringify(enquiries, null, 2));

  console.log("New enquiry saved:", enquiry);

  return res.status(201).json({
    success: true,
    message: "Enquiry submitted successfully.",
    data: enquiry,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});